import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm



data_path = './ML/data/clean_data.csv'
data = pd.read_csv(data_path)

price_min = data['price(1000$)'].min()
price_max = data['price(1000$)'].max()


fig, ax = plt.subplots(figsize=(6, 1))
fig.subplots_adjust(bottom=0.5)


cmap = cm.viridis


cb1 = plt.colorbar(cm.ScalarMappable(cmap=cmap, norm=plt.Normalize(vmin=price_min, vmax=price_max)), orientation='horizontal', cax=ax)


cb1.set_label('House Price ($1,000)')
plt.title("Color Legend")


plt.savefig("color_legend.png", dpi=300, bbox_inches='tight')
plt.show()







