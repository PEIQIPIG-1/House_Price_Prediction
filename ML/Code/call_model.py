# Load model and scaler
import joblib
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


model = joblib.load('model/xgb_std.pickle')
scaler = joblib.load('scaler/scaler_std.pickle')




existing_data = pd.read_csv("data/clean_data.csv")

existing_data.drop(['Address', 'price(1000$)'], axis=1, inplace=True)





for num in range(4098):

    original_data = existing_data.iloc[num].copy()
    history_features = pd.DataFrame(columns=existing_data.columns)
    predict_features = pd.DataFrame(columns=existing_data.columns)

    for i in range(3):
        temp = original_data.copy()
        temp['Month'] = i + 5
        history_features = pd.concat([history_features, pd.DataFrame([temp])], ignore_index=True)

    for i in range(3):
        temp = original_data.copy()
        temp['Month'] = i + 8
        predict_features = pd.concat([predict_features, pd.DataFrame([temp])], ignore_index=True)

    history_features = scaler.transform(history_features)
    predict_features = scaler.transform(predict_features)

    history_prices = model.predict(history_features)


    predicted_prices = model.predict(predict_features)

    predicted_prices = np.insert(predicted_prices, 0, history_prices[-1])





    months = ['May','June', 'July', 'August', 'Sepetember', 'October']  
                

    plt.figure(figsize=(10, 6))

    plt.plot(months[:3], history_prices, marker='o', label='Historical Prices', color='blue')


    plt.plot(months[2:], predicted_prices, marker='o', linestyle='--', label='Predicted Prices', color='red')


    plt.title('House Price Prediction')
    plt.xlabel('Month')
    plt.ylabel('Price(1000$)')
    plt.legend()
    plt.grid(True)

    plt.tight_layout()

    plt.savefig("pictures/" + str(num) + ".png")
    plt.close()




