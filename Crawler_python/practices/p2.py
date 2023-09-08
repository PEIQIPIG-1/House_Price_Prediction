from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://www.baidu.com/")

more = driver.find_element(By.LINK_TEXT, "更多")
#将鼠标移动到更多按钮
ActionChains(driver).move_to_element(more).perform()

if input("1"):
    driver.quit()