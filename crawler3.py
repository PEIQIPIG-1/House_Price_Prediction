from bs4 import BeautifulSoup
import requests

# 发送HTTP请求获取网页内容
url = 'http://www.housescheck.com/'  # 你要爬取的网页URL
response = requests.get(url)
html = response.text

# 使用Beautiful Soup解析HTML
soup = BeautifulSoup(html, 'html.parser')

# 查找所有class为"house-info"的div元素
house_info_divs = soup.find_all('div', class_='house-info')

# 遍历并打印每个匹配的div元素的内容
for div in house_info_divs:
    print(div.text.strip())  # 使用strip()方法去除文本前后的空白字符