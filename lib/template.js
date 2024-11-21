module.exports = {
    HTML:function(title, body, id="로그인"){
      return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="/style/style.css" rel="stylesheet" type="text/css"/>
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
      
            <form class="search-box" action="/search" method="post">
              <input class="search-txt" type="text" name="value" placeholder="검색어를 입력하세요.">
              <button class="search-btn" type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
      
            <div class="nav-icons">
              <a href="/login">
                <div class="nav-login">
                  <i class="fa-solid fa-user fa-2x"></i>
                </div>
              </a>
              
              <div class="nav-map">
                <a href="/page/map"><i class="fa-solid fa-bus fa-2x"></i></a>
              </div>
      
              <div class="nav-mytrip">
                <i class="fa-regular fa-calendar-days fa-2x"></i>
              </div>
      
              <div class="nav-text">
                <a href="/login"><span class="login-text">${id}</span></a>
                <a href="/page/map"><span class="map-text">교통정보</span></a>
                <span class="mytrip-text"><a href="/calendar">내 일정</a></span>
              </div>
            </div>
          </div>
          
          <div class="menu"> <!-- height : 10%; -->
            <span class="category">
              <a href="/page/region">
              <i class="fa-solid fa-map-marker-alt"></i>
            </a>
              <a href="/page/region">여행지</a>
            </span>
            <span class="category">
              <a href="/page/shopping">
              <i class="fa-solid fa-star"></i>
            </a>
              <a href="/page/shopping">전통시장/쇼핑몰</a>
            </span>
            <span class="category">
              <a href="/page/event">
              <i class="fa-solid fa-info-circle"></i>
            </a>
              <a href="/page/event">축제/공연/행사</a>
            </span>
            <span class="category">
              <a href="/page/restaurant">
              <i class="fa-solid fa-newspaper"></i>
            </a>
              <a href="/page/restaurant">맛집</a>
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
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
        <script src="http://localhost:3000/script/swiper.js"></script>
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
        <link href="/style/register.css" rel="stylesheet" type="text/css"/>
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
        <link href="/style/login.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        ${body}
    </body>
    </html>
     `;
    },
    main:function(main, second){
      return `
        <p class="main-title">요즘 뜨는 여행코스</p>
        ${main}
        <div class="gray-section">
          <p class="seasonal-title">올해 호캉스는 여기서!</p>
          <br>

          <div class="swiper-container swiper-seasonal-recommendation">
            ${second}
            <div class="swiper-button-next seasonal-next"></div>
            <div class="swiper-button-prev seasonal-prev"></div>
          </div>
        </div>
      </div>
    `;
    },
    detail:function(topics){
      if (topics[0].addr1 === undefined) {
        topics[0].addr1 = "";
      }
      return `
      <div class="container">
        <div class="top-row">
            <div class="contentimg">
                <img src="${topics[0].firstimage}">
            </div>
            <div class="content-details">
                <div class="contenttitle">${topics[0].title}</div>
                <div class="contentaddress">${topics[0].addr1}</div>
            </div>
        </div>
        <div class="description">
            ${topics[0].detail}
        </div>
    </div>

      `;
    },
    content:function(contents, sequence='main'){
      if (sequence === 'main')  {
        var list = '<div class="swiper-wrapper">';
        var i = 0;
        while(i < contents.length && i < 10){
          list = list + `
            <div class="swiper-slide">
              <div class="slide-content">
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><img src="${contents[i].firstimage}" width="300px" height="200px" class="slide"></a>
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><p class="content-title">${contents[i].title}</p></a>
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><p class="content-info">${contents[i].detail}</p></a>
              </div>
            </div>
          `;
          i = i + 1;
        }
        list = list+'</div>';
        return list;
      } else if (sequence === 'second') {
        var list = '<div class="swiper-wrapper">';
        var i = 10;
        while(i < 20){
          list = list + `
            <div class="swiper-slide">
              <div class="slide-content">
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><img src="${contents[i].firstimage}" width="300px" height="200px" class="slide"></a>
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><p class="content-title">${contents[i].title}</p></a>
                <a href=/page/${contents[i].sourse}/${contents[i].Id}><p class="content-info">${contents[i].detail}</p></a>
              </div>
            </div>
          `;
          i = i + 1;
        }
        list = list+'</div>';
        return list;
      }
    },
    page:function(content, pagename) {
      return `
        <p class="main-title">${pagename}</p>
        
          <ul class="filter">
            <li><a href="/page/region/filter/서울">서울</a></li>
            <li><a href="/page/region/filter/경기">경기</a></li>
            <li><a href="/page/region/filter/인천">인천</a></li>
            <li><a href="/page/region/filter/강원">강원</a></li>
            <li><a href="/page/region/filter/충남">충남</a></li>
            <li><a href="/page/region/filter/충북">충북</a></li>
            <li><a href="/page/region/filter/전남">전남</a></li>
            <li><a href="/page/region/filter/전북">전북</a></li>
            <li><a href="/page/region/filter/경남">경남</a></li>
            <li><a href="/page/region/filter/경북">경북</a></li>
            <li><a href="/page/region/filter/제주">제주</a></li>
          </ul>
        
        <br>
        <div class="swiper-container swiper-mz-recommendation">
          ${content}
          <div class="swiper-button-next mz-next"></div>
          <div class="swiper-button-prev mz-prev"></div>
        </div>
      `;
    }
  }