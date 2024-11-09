import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import mysql.connector
# query = "INSERT INTO gilbut.restaurant (addr1, title, firstimage, detail) VALUES (%s, %s, %s, %s);"
query = "INSERT INTO gilbut.course (title, firstimage, detail) VALUES (%s, %s, %s);"

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="admin",
  database="gilbut"
)

options = webdriver.ChromeOptions()
options.headless = True

browser = webdriver.Chrome(options=options)  # "./chromedriver.exe"
url = "https://api.visitkorea.or.kr/#/"
wait = WebDriverWait(browser, 10)
browser.get(url); # browser.back(); -> 뒤로가기
browser.maximize_window()

elem = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#wrap > section > article.art1 > div > div.art1-layout > div.layout > ul > li:nth-child(4) > a')))
time.sleep(1)
elem.click() # li:nth-child(1) => 관광지 클릭
time.sleep(1)

soup = BeautifulSoup(browser.page_source, "html.parser")
ul = soup.find("ul", class_="gallery-list")
liList = ul.findChildren("li", recursive=False)
print(len(liList))

for i in range(0, 10):
    li = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f'#link_{i}'))) # i번째 컨텐츠 요소
    time.sleep(1)
    li.click() # 첫번째 컨텐츠 클릭
    time.sleep(1)
    
    soup = BeautifulSoup(browser.page_source, "html.parser")
    div = soup.find("div", class_="big-img")
    img = div.findChild()
    print(img.get("src")) # 이미지 값
    firstimage = img.get("src")

    title = soup.find("p", class_="app-title mo-hide")
    print(title.get_text()) # title 값
    title = title.get_text()

    # addr_td = ''
    # td_elements = soup.find_all("td")
    # for td in td_elements:
    #     if td.get_text(strip=True) == "주소":
    #         # print("찾은 요소:", td)
    #         addr_td = td
    #         break

    # td1 = addr_td.find_next_sibling()
    # td2 = td1.findChild()
    # print(td2.get_text()) # 주소 값
    # addr1 = td2.get_text()

    detail = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#wrap > section > div.content.inner.page-searchDetail.mb-mt0 > div.content-box.cb-type1.mb-mt50 > div.bot > ul > li > p > div')))
    print(detail.text) # 컨텐츠 값
    detail = detail.text

    args = (title, firstimage, detail) # course 테이블 쿼리
    # args = (addr1, title, firstimage, detail) # course 외 테이블
    mycursor = mydb.cursor()
    mycursor.execute(query, args)
    mydb.commit()
    time.sleep(1)
    
    browser.back()
    time.sleep(1)

browser.quit()