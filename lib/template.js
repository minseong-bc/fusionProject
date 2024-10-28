module.exports = {
    HTML:function(title, body){
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
                <a href="/page/login"><span class="login-text">로그인</span></a>
                <a href="/page/map"><span class="map-text">교통정보</span></a>
                <span class="mytrip-text"><a href="/page/calendar">내 일정</a></span>
              </div>
            </div>
          </div>
          
          <div class="menu"> <!-- height : 10%; -->
            <span class="category">
              <a href="/page/region">
              <i class="fa-solid fa-map-marker-alt"></i>
            </a>
              <a href="/page/region">지역별 여행지</a>
            </span>
            <span class="category">
              <a href="/?id=rec">
              <i class="fa-solid fa-star"></i>
            </a>
              <a href="/?id=rec">여행지추천</a>
            </span>
            <span class="category">
              <a href="/page/festival">
              <i class="fa-solid fa-info-circle"></i>
            </a>
              <a href="/page/festival">축제/공연/행사</a>
            </span>
            <span class="category">
              <a href="Article.html">
              <i class="fa-solid fa-newspaper"></i>
            </a>
              <a href="Article.html">여행기사</a>
            </span>
            <span class="category">
              <a href="/page/map">
              <i class="fa-solid fa-map"></i>
            </a>
              <a href="/page/map">여행지도</a>
            </span>
          </div>
          <hr>
          ${body}
      </body>
      </html>
      `;
    },
    register:function(title, body){
      return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link href="register.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        ${body}
    </body>
    </html>
      `;
    },
    login:function(title, body){
     return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Hancom+Ulju+Bangudae+Petroglyph&display=swap" rel="stylesheet">
        <link href="login.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        ${body}
    </body>
    </html>
     `;
    }
  }