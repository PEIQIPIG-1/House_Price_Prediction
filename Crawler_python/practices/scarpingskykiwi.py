from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://estate.skykiwi.com/property-listing.html?t=TRADE&c=Auckland&")


if input("1"): 
    driver.quit()