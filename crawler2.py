from bs4 import BeautifulSoup
import requests
import csv

# 发送HTTP请求获取网页内容
url = 'http://www.housescheck.com/'
response = requests.get(url)
html = response.text

# 使用Beautiful Soup解析HTML
soup = BeautifulSoup(html, 'html.parser')

# 查找所有class为"house-info"的div元素
house_info_divs = soup.find_all('div', class_='house-info')

# 遍历并打印每个匹配的div元素的内容
# for div in house_info_divs:
#     div_text = div.find_all("div")
#     if len(div_text) >= 2:
#         Date = div_text[0].text.strip()
#         Price = div_text[1].text.strip()
#         Bedrooms = div_text[2].text.strip()
#         Bathrooms = div_text[4].text.strip()
#         Sqft_living = div_text[5].text.strip()
#         Sqft_lot = div_text[6].text.strip()
#         Floors = div_text[7].text.strip()
#         Waterfront = div_text[8].text.strip()
#         View = div_text[9].text.strip()
#         Condition = div_text[10].text.strip()
#         Sqft_above = div_text[11].text.strip()
#         Sqft_basement = div_text[12].text.strip()
#         Year_built = div_text[13].text.strip()
#         Year_renovated = div_text[14].text.strip()
#         Street = div_text[15].text.strip()
#         City = div_text[16].text.strip()
#         Statezip = div_text[17].text.strip()
#         Country = div_text[18].text.strip()
#     print(Date, Price, Bedrooms, Bathrooms, Sqft_living, Sqft_lot, Floors, Waterfront,
#                      View, Condition, Sqft_above, Sqft_basement, Year_built, Year_renovated, Street, City, Statezip, Country, sep="***") 

#     with open('usa.csv', mode='a', encoding='utf-8', newline='') as f:
#         csv_write = csv.writer(f)
#         csv_write.writerow([Date, Price, Bedrooms, Bathrooms, Sqft_living, Sqft_lot, Floors, Waterfront,
#                      View, Condition, Sqft_above, Sqft_basement, Year_built, Year_renovated, Street, City, Statezip, Country])

for div in house_info_divs:
    print(div.text.strip())  # 使用strip()方法去除文本前后的空白字符
