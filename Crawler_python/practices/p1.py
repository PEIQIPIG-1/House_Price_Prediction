from selenium import webdriver

from selenium.webdriver.common.by import By

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.baidu.com/")


wait = WebDriverWait(driver, 10)
kw = wait.until(EC.visibility_of_element_located((By.ID, "kw")))
kw.send_keys("Apple Store")

su = driver.find_element(By.CSS_SELECTOR, "#su")
su.click()

if input("1"): 
    driver.quit()