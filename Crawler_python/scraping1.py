#data resource is lianjiawang
import requests
import parsel
import csv


for page in range(1, 24):

    print(f'\n==========正在爬取第{page}页数据==========')
    url = f'https://bj.fang.lianjia.com/loupan/pg{page}/'
    headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.188'}

    response = requests.get(url=url, headers=headers)
    html_data = response.text

    #css选择器提取数据
    selector = parsel.Selector(html_data)
    li = selector.css('.resblock-desc-wrapper')

    for lis in li:
        name = lis.css('.resblock-name a::text').get()

        area = lis.css('.resblock-location span::text').getall()
        area = '-'.join(area)
        adress = lis.css('.resblock-location a::text').get()
        
        infor1 = lis.css('.resblock-room span::text').get()
        infor2 = lis.css('.resblock-area span::text').get()

        price1 = lis.css('.main-price span::text').getall()
        price1 = '-'.join(price1)
        price2 = lis.css('.second::text').get()

        print(name, area, adress, infor1, infor2, price1, price2, sep='******')

        #数据保存
        with open('lianjia.csv', mode='a', encoding='utf-8', newline='') as f:
            csv_write = csv.writer(f)
            csv_write.writerow([name, area, adress, infor1, infor2, price1, price2])




