from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.dangdang.com/")

wait = WebDriverWait(driver, 10)
key = wait.until(EC.visibility_of_element_located((By.ID, "key_S")))
key.send_keys("科幻")   

search = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".search .button")))
search.click()

for i in range(2):
    shoplist = driver.find_elements(By.CSS_SELECTOR, ".shoplist li")
    for li in shoplist:
        print(li.find_element(By.CSS_SELECTOR, "a").get_attribute("title"))
        print(li.find_element(By.CSS_SELECTOR, ".search_now_price").text)

        #获取下一页按钮
    next = driver.find_element(By.LINK_TEXT, "下一页")
    next.click()



if input("1"): 
    driver.quit()