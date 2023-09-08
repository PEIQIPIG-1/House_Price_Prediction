import requests

url = 'https://www.trademe.co.nz/a/property/residential/sale/auckland'
headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69'}

response = requests.get(url=url, headers=headers)
html_data = response.text
print(html_data)