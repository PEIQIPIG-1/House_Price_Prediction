import gmplot
import pandas as pd
import matplotlib.cm as cm
import matplotlib.pyplot as plt

data = pd.read_csv('./ML/data/clean_data.csv')  # Example path

gmap_api_key = "AIzaSyBleQ2vJhLXd8jFOsy0rDdt4itnQrvbiXQ"

center_lat = data['Latitude'].mean()
center_lon = data['Longitude'].mean()

gmap = gmplot.GoogleMapPlotter(center_lat, center_lon, zoom=10, apikey=gmap_api_key)


norm = plt.Normalize(data['price(1000$)'].min(), data['price(1000$)'].max())
colors = [cm.viridis(norm(price)) for price in data['price(1000$)']]
colors = ['#%02x%02x%02x' % (int(r*255), int(g*255), int(b*255)) for r, g, b, _ in colors]


gmap.scatter(data['Latitude'].tolist(), data['Longitude'].tolist(), c=colors, s=data['sqm_living'].tolist(), marker=False)


gmap.draw("my_map.html")


