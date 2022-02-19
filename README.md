# UrlShortener
# 專案描述
此專案是針對2022 Dcard Web Backend Intern的申請作業，題目描述：
- 設計出兩支API
    1. 給定一個Url以及其到期時間做Post請求並得到短網址
    2. 根據給定的短網址可以Redirect到其原始的Url
- 無套件以及資料庫、快取存儲的限制
- 需要對錯誤的情況做一定的限制
- 不需要考慮使用者權限
- 需要考慮性能問題
# 專案講解
## API說明
- 取得短網址
    - POST
    - [http://localhost/api/v1/urls](http://localhost/api/v1/urls)
    - Request Body
        ```json
        {
        	"url":"http://google.com",
        	"expireAt":"2022"
        }
        ```  
    - Response  
        ```json
        {
        	"id":<整數>,
        	"url":"http://localhost:80/id"
        }
        ```     
- 根據短網址導入到原網址
    - GET
    - http://localhost/<url_id>
## 使用的工具
使用Nodejs語言的Express框架來開發本次作業所要實現的RESTfulAPI，使用MySql作為後端資料庫的選擇，為了讓使用者可以加速查詢，使用Redis來建設快取伺服器。
## 透過Docker-Compose運行專案
因程式語言版本更迭，各樣的安裝環境不斷變動，每個人使用的計算機也不同，因此本專案欲使得測試人員可以更方便的部屬專案，採用了Docker-Compose的方式來快速建置環境，利用本專案的docker-compose.yaml即可一次啟動Express-Backend、Mysql、Redis，須確保計算機有安裝Docker，Linux需安裝docker-compose，MacOs以及Windows需安裝Docker Desktop。
### 使用說明
1. 將專案Clone下來到任意資料夾
    ```bash
    git clone https://github.com/DandinPower/UrlShortener.git
    ```
2. 進入目標資料夾    
    ```bash
    cd UrlShortener/
    ```    
3. 在背景運行docker-compose
    ```bash
    #-d 為背景運行，如果不加則可以觀察到不同容器的logs
    docker-compose up -d
    ```
### 容器說明
- 需避免各Container的外部Port與原有服務衝突
1. mysql
    - 外部Port為3307
    - 預先插入了兩筆資料來使得開發過程能執行單元測試
2. redis
    - 外部Port為6780
3. backend
    - 外部Port為80
## 針對題目的解法思路
### 為何同時使用RDBMS及Cache ?
- 由於本專案有新增及讀取兩種屬性的API，而我認為RDBMS在資料的存儲上第一有架構上的優勢，以及更加的可靠，因此存放原始網址的部分都會透過Mysql來實作
- 使用Cache是因為其實在實務的過程上，如果透過Mysql很容易再請求多的時候受到效能瓶頸，這個時候透過Redis來實現快取就會是很好的方法，當有使用者查詢過後就會在Redis建立起紀錄使得下一個使用者在下次存取短網址時就不需要重新向Mysql查詢
### 錯誤限制
- 除了在Mysql有基本的資料型態限制以外，在資料輸入進來時透過Middleware檢查到錯誤並且提早報錯使其不會進入資料庫浪費效能
### 如何新增URL ?
- 檢查完資料正確後就將其存進Mysql中
### 如何Redirect短網址 ?
- 當使用者欲傳入的短網址沒有記錄在Redis中，就透過查詢Mysql來將結果回傳給使用者並且將結果紀錄在Redis中
- 當使用者欲傳入的短網址在Redis中即可直接回傳其結果，速度將會有顯著的提升
## 使用到的程式架構及套件說明
1. 開發環境
    - 使用mocha、chai、nyc 來執行Unit Test以及計算coverage
    - 使用nodemon來hotreload開發
2. 實務環境
    - 使用express來使用後端框架
    - 使用mysql、mysql2、redis來連結資料庫與nodejs
    - 使用cors處理跨域問題
    - 使用express-rate-limit來限制同一IP的請求行為
    - 使用dotenv來使用環境變數
