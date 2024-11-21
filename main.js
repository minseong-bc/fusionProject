// pm2 start main.js --watch --no-daemon
const fs = require('fs');
const template = require('./lib/template.js');
const sanitizeHtml = require('sanitize-html');
const path = require('path');
const qs = require('querystring');
const url = require('url');
const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
var compression = require('compression');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));

const mysql = require('mysql2');
const { table } = require('console');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'gilbut',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
 
app.get('/', (request, response) => { // 메인 페이지
  var title = '길벗 홈페이지';
  var pagename = "요즘 뜨는 여행코스";
  pool.query(`SELECT 'course' as sourse, Id, title, firstimage, detail FROM gilbut.course UNION SELECT 'hotel' as sourse, Id, title, firstimage, detail FROM gilbut.hotel;`, (err, topics, fields) => { 
    if (err) {
      console.log(err);
    }
    var table = topics[0].sourse
    var content = template.content(topics, 'main');
    var page = template.page(content, pagename, table);
    var second = template.content(topics, 'second');
    var body = template.main(page, second);
           
    var html = template.HTML(title, body);
    response.send(html);
  });  
});

app.get('/page/:pageId', (request, response) => { //세부 페이지 (지역, 축제, 식당) 
  var pageId = path.parse(request.params.pageId).base; // 테이블 이름 가져오기
  if (pageId === 'region') {
    var pagename = "여행지";
  }
  if (pageId === 'shopping') {
    var pagename = "전통시장/쇼핑몰";
  }
  if (pageId === 'event') {
    var pagename = "축제/공연/행사";
  }
  if (pageId === 'restaurant') {
    var pagename = "맛집";
  }
  pool.query(`SELECT '${pageId}' as sourse, Id, addr1, title, firstimage, detail FROM gilbut.${pageId} `, (err, topics, fields) => {
    if (err) {
      console.log(err);
    } 
    var table = topics[0].sourse
    var content = template.content(topics, 'main');
    var page = template.page(content, pagename, table);

    var html = template.HTML(pagename, page);
    response.send(html);
  });  
});

app.get('/page/:pageId/:Id', (request, response) => { 
  var pageId = path.parse(request.params.pageId).base;
  var Id = path.parse(request.params.Id).base;
  pool.query(`SELECT * FROM gilbut.${pageId} `, (err, topics) => {
    if (err) {
      throw err;
    }
    pool.query(`SELECT * FROM gilbut.${pageId} WHERE Id = ?`, [Id], (err2, topic) => {
      if (err2) {
        throw err2;
      }
      var detail = template.detail(topic);
      var html = template.HTML(pageId, detail);
      response.send(html);
    });
  });
});

app.get('/register', (request, response) => { // 회원가입 페이지
  var title = 'register';
  fs.readFile(`data/${title}`, 'utf8', (err, body) => {
    // var sanitizeBody = sanitizeHtml(body,{
    //   allowedTags: sanitizeHtml.defaults.allowedTags.concat(['form', 'input', 'button']),
    //   allowedAttributes: {
    //     '*': ['id', 'class', 'type', 'name', 'placeholder', 'value', 'onclick', 'maxlength']
    //   } 새니타이즈가 뭐가 어때서... 어째서...
    // });
    var register = body;       
    var html = template.register(title, register);
    response.send(html);
  });
});

app.post('/register', (request, response) => { // 회원가입 처리 라우팅
  var post = request.body;
  var id = post.id;
  var name = post.name;
  var password = post.password;
  var phone = post.phone;
  pool.query(`INSERT INTO gilbut.user VALUES (?, ?, ?, ?); `,[id, name, password, phone], (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    console.log("register success!");
  }); 
  response.redirect('/login');
});

app.get('/login', (request, response) => { // 로그인 페이지
  var title = 'login';
  fs.readFile(`data/${title}`, 'utf8', (err, body) => {
    /*
    var sanitizeBody = sanitizeHtml(body,{
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['form', 'input', 'button']),
      allowedAttributes: {
        '*': ['id', 'class', 'type', 'name', 'placeholder', 'value', 'onclick'],
      }
    });
    */
    var login = body;  
    var html = template.login(title, login);
    response.send(html);
  });
});

app.post('/login', (request, response) => { // 로그인 처리 라우팅
  var post = request.body;
  var id = post.id;
  var password = post.password;
  
  pool.query(`SELECT * FROM db_test.user WHERE id = ? and password = ?; `,[id, password], (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    console.log(rows[0].name + "님 환영합니다!");
  }); 
  response.redirect('/');
});

app.post('/', (request, response) => { // 메인 페이지
  var post = request.body;
  var id = post.id;
  var title = 'main';
  pool.query(`SELECT 'course' as sourse, Id, title, firstimage, detail FROM gilbut.course UNION SELECT 'hotel' as sourse, Id, title, firstimage, detail FROM gilbut.hotel;`, (err, topics, fields) => { 
    var mainBody = template.main(topics);        
    var html = template.HTML(title, mainBody, id);
    response.send(html);
  });  
});

app.post('/search', (request, response) => {
  var post = request.body;
  var value = post.value;
  var pagename = "'" + value + "' 검색 결과";
  pool.query(`
    SELECT 'region' as sourse, Id, title, firstimage, detail FROM gilbut.region WHERE addr1 like '%${value}%' or detail like '%${value}%' 
    UNION 
    SELECT 'shopping' as sourse, Id, title, firstimage, detail FROM gilbut.shopping where addr1 like '%${value}%' or detail like '%${value}%'
    UNION 
    SELECT 'event' as sourse, Id, title, firstimage, detail FROM gilbut.event where addr1 like '%${value}%' or detail like '%${value}%'
    UNION 
    SELECT 'restaurant' as sourse, Id, title, firstimage, detail FROM gilbut.restaurant where addr1 like '%${value}%' or detail like '%${value}%';`, (err, topics, fields) => { 
    if (err) {
      console.log(err);
    }
    var table = topics[0].sourse
    var content = template.content(topics, 'main');
    var page = template.page(content, pagename, table);
    var html = template.HTML(pagename, page);
    
    response.send(html);      
  });
})

app.get('/page/:pageId/filter/:filter', (request, response ) => {
  var pageId = path.parse(request.params.pageId).base;
  var filter = path.parse(request.params.filter).base;
  if (pageId === 'region') {
    var pagename = "여행지";
  }
  if (pageId === 'shopping') {
    var pagename = "전통시장/쇼핑몰";
  }
  if (pageId === 'event') {
    var pagename = "축제/공연/행사";
  }
  if (pageId === 'restaurant') {
    var pagename = "맛집";
  }
  pool.query(`SELECT '${pageId}' as sourse, Id, addr1, title, firstimage, detail FROM gilbut.${pageId} `, (err, topics) => {
    if (err) {
      throw err;
    }
    pool.query(`SELECT '${pageId}' as sourse, Id, addr1, title, firstimage, detail FROM gilbut.${pageId} WHERE addr1 like '%${filter}%'`, (err2, topic) => {
      if (err2) {
        throw err2;
      }
      pagename = pagename + "    #" + filter;
      if (topic.length === 0) {
        var info = "<div class=\"info\"><h1>선택한 지역에 대한 여행정보가 없습니다.</h1></div>";
        console.log(info);
        var page = template.page(info, pagename, pageId);
        var html = template.HTML(pagename, page);
        response.send(html);
      } else {
        var table = topics[0].sourse
        var content = template.content(topic, 'main');
        var page = template.page(content, pagename, table);
        var html = template.HTML(pagename, page);
        response.send(html);
      }
    });
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});