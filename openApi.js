const BASE_URL = "http://apis.data.go.kr/B551011/KorService1";
const key = "Bgp26hbNKA1f%2BbfNu7YTthmnws002CO2H38vhYUqrqIUoCYI%2BsGqhRL0y%2FNiDMPoXZFXq%2F%2B9Cm0F3HHRXV9Ebw%3D%3D";
const rows = 450;
const contentType = 12;
/**
 * 관광지 : 12
 * 문화시설 : 14
 * 행사/공연/축제 : 15
 * 여행코스 : 25
 * 레포츠 : 28
 * 숙박 : 32
 * 쇼핑 : 38
 * 음식점 : 39
 */
const areacode = 2;
/**
 * 서울 : 1
 * 인천 : 2
 * 대전 : 3
 * 대구 : 4
 * 광주 : 5
 * 부산 : 6
 * 울산 : 7
 * 세종 : 8
 * 경기도 : 31
 * 강원도 : 32
 * 충청북도 : 33
 * 충청남도 : 34
 * 전라북도 : 35
 * 전라남도 : 36
 * 경상북도 : 37
 * 경상남도 : 38
 * 제주도 : 39
 */
const url = `${BASE_URL}/areaBasedList1?numOfRows=${rows}&pageNo=1&MobileOS=ETC&MobileApp=APP&_type=JSON&listYN=Y&arrange=D&contentTypeId=${contentType}&areaCode=${areacode}&serviceKey=${key}`;
const mysql = require('mysql2');
const table_name = 'db_test.tour'; // tour 테이블
// console.log(url);

const titleArray = [];
// const resultArray = [];
async function fetchData() {
    const response = await fetch(url, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    let res = '';
    for (let i = 0; i < data.response.body.items.item.length; i++) {
        res = data.response.body.items.item[i];
        if (res.firstimage !== '') {
            titleArray.push(res);
        }
        // titleArray.push(res);
        // console.log(titleArray[i].firstimage, titleArray[i].title);
    }
    return titleArray;
}
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'db_test',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// fetchData();
fetchData().then(resultArray => {
    for (let i = 0; i < resultArray.length; i++) {
        var title = resultArray[i].title;
        var addr1 = resultArray[i].addr1;
        var firstimage = resultArray[i].firstimage;
        var areacode = resultArray[i].areacode;
        pool.query(`INSERT INTO ${table_name} (title, addr1, firstimage, areacode) VALUES ("${title}", "${addr1}", "${firstimage}", "${areacode}"); `, (err, rows, fields) => {
            if (err) {
              console.log(err);
            }
        });
    }
    console.log(`${resultArray.length} data insert success!`);
    // console.log(resultArray.length);
});