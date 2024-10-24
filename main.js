var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

function templateHTML(title, body){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="style.css" rel="stylesheet" type="text/css"/>
      <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
      <script src="https://kit.fontawesome.com/366187f9eb.js"  crossorigin="anonymous"></script> <!--아이콘 가져오는 태그-->
      <title>${title}</title>
  </head>
  <body>
    <!-- 페이지 공통 부분 -->
    <div class="Entire">
      <!-- 페이지 공통 부분 -->
      <div class="nav"> <!-- height : 15%; -->
        <div class="title-container">
          <span class="maintitle" style="color: #FFFFFF"><a href="/">길벗</a></span>
          <span class="mainsmalltitle" style="color: black;"><a href="/">길을 함께 가는 동무, 같은 길을 가는 사람</a></span>
        </div>
  
        <form class="search-box" action="" method="get">
          <input class="search-txt" type="text" name="" placeholder="검색어를 입력하세요.">
          <button class="search-btn" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
  
        <div class="nav-icons">
  
          <a href="login.html">
            <div class="nav-login">
              <i class="fa-solid fa-user fa-2x"></i>
            </div>
          </a>
          
          <div class="nav-map">
            <a href="MapPage.html"><i class="fa-solid fa-bus fa-2x"></i></a>
          </div>
  
          <div class="nav-mytrip">
            <i class="fa-regular fa-calendar-days fa-2x"></i>
          </div>
  
          <div class="nav-text">
            <a href="/?id=login"><span class="login-text">로그인</span></a>
            <a href="/?id=map"><span class="map-text">교통정보</span></a>
            <span class="mytrip-text"><a href="/?id=calendar">내 일정</a></span>
          </div>
        </div>
      </div>
      
      <div class="menu"> <!-- height : 10%; -->
        <span class="category">
          <a href="/?id=region">
          <i class="fa-solid fa-map-marker-alt"></i>
        </a>
          <a href="/?id=region">지역별 여행지</a>
        </span>
        <span class="category">
          <a href="/?id=rec">
          <i class="fa-solid fa-star"></i>
        </a>
          <a href="/?id=rec">여행지추천</a>
        </span>
        <span class="category">
          <a href="/?id=festival">
          <i class="fa-solid fa-info-circle"></i>
        </a>
          <a href="/?id=festival">여행정보</a>
        </span>
        <span class="category">
          <a href="Article.html">
          <i class="fa-solid fa-newspaper"></i>
        </a>
          <a href="Article.html">여행기사</a>
        </span>
        <span class="category">
          <a href="?id=map">
          <i class="fa-solid fa-map"></i>
        </a>
          <a href="?id=map">여행지도</a>
        </span>
      </div>
      <hr>
      ${body}
  </body>
  </html>
  `;
}
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){ // 메인 페이지 라면 => 메인페이지 출력
        var title = 'main';
        fs.readFile(`data/${title}`, 'utf8', (err, body) => {
          var template = templateHTML(title, body);
          response.writeHead(200);
          response.end(template);
        });
      } else { // 그 외 페이지 출력
        var title = queryData.id;
        fs.readFile(`data/${title}`, 'utf8', (err, body) => { //1차 페이지 (지역, 축제, 식당)
          var template = templateHTML(title, body);
          response.writeHead(200);
          response.end(template);
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);