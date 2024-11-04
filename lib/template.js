module.exports = {
    HTML:function(title, body){
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
        <link href="/public/style/register.css" rel="stylesheet" type="text/css"/>
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
    },
    main:function(topics){
      return `
        <p class="main-title">MZ가 추천하는 여행지</p>
      
        <br>
        <div class="swiper-container swiper-mz-recommendation">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[0].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[0].title}</p>
                        <p class="content-info">${topics[0].detail}</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[1].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[1].title}</p>
                        <p class="content-info">${topics[1].detail}</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[2].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[2].title}</p>
                        <p class="content-info">${topics[2].detail}</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[3].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[3].title}</p>
                        <p class="content-info">${topics[3].detail}.</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[4].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[4].title}</p>
                        <p class="content-info">${topics[4].detail}</p>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="${topics[5].firstimage}" width="300px" height="200px" class="slide">
                        <p class="content-title">${topics[5].title}</p>
                        <p class="content-info">${topics[5].detail}</p>
                    </div>
                </div>
            </div>
            <div class="swiper-button-next mz-next"></div>
            <div class="swiper-button-prev mz-prev"></div>
        </div>
        <div class="gray-section">
          <p class="seasonal-title">계절별 추천 여행지</p>
          <br>
          <div class="swiper-container swiper-seasonal-recommendation">
              <div class="swiper-wrapper">
                  <div class="swiper-slide">
                      <div class="slide-content">
                          <img src="images/ss1.jpg" width="300px" height="200px" class="slide">
                          <p class="content-title">경주 벚꽃길</p>
                          <p class="content-info">경주는 봄철 벚꽃이 만개하여 유명한 도시로, 역사적인 유적과 자연이 어우러진 경주의 벚꽃길은 환상적인 풍경을 자아냅니다.</p>
                      </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide-content">
                        <img src="images/ss2.jpg" width="300px" height="200px" class="slide">
                        <p class="content-title">부산 해운대 해수욕장</p>
                        <p class="content-info">여름철 부산 해운대는 해수욕과 다양한 해양 스포츠를 즐길 수 있는 곳으로, MZ 세대에게 인기가 많습니다.</p>
                    </div>
                </div>
                <div class="swiper-slide">
                  <div class="slide-content">
                      <img src="images/ss3.jpg" width="300px" height="200px" class="slide">
                      <p class="content-title">설악산 단풍</p>
                      <p class="content-info">가을이면 단풍이 절경을 이루는 설악산은 등산객과 여행객 모두에게 사랑받는 가을 여행지입니다.</p>
                  </div>
              </div>
              <div class="swiper-slide">
                <div class="slide-content">
                    <img src="images/ss4.jpg" width="300px" height="200px" class="slide">
                    <p class="content-title">남이섬</p>
                    <p class="content-info">가을의 남이섬은 은행나무와 단풍이 물들어 경치가 아름답고, 배를 타고 섬으로 들어가는 경험이 독특합니다.</p>
                </div>
            </div>
            <div class="swiper-slide">
              <div class="slide-content">
                  <img src="images/ss5.jpg" width="300px" height="200px" class="slide">
                  <p class="content-title">인제 자작나무 숲</p>
                  <p class="content-info">겨울에 눈 덮인 자작나무 숲은 마치 동화 속 한 장면 같은 분위기를 자아내며, 힐링 여행지로 제격입니다.</p>
              </div>
          </div>
              </div>
              <div class="swiper-button-next seasonal-next"></div>
              <div class="swiper-button-prev seasonal-prev"></div>
            </div>
          </div>
      </div>
    
    </div>
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="script/swiper.js"></script>
    `;
    }
  }