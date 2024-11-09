// pm2 start main.js --watch --ignore-watch="data/*" --no-daemon
const fs = require('fs');
const template = require('./lib/template.js');
const sanitizeHtml = require('sanitize-html');
const path = require('path');
const qs = require('querystring');
const express = require('express');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
var compression = require('compression');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));

const mysql = require('mysql2');
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
  pool.query(`SELECT * FROM gilbut.tour UNION SELECT * FROM gilbut.hotel;`, (err, topics, fields) => { 
    if (err) {
      console.log(err);
    }
    var main = template.content(topics, 'main');
    // var second = template.content(topics, 'second');
    var second = 'second';
    var body = template.main(main, second);
           
    var html = template.HTML(title, body);
    response.send(html);
  });  
});

app.get('/page/:pageId', (request, response) => { //세부 페이지 (지역, 축제, 식당) 
  var pageId = path.parse(request.params.pageId).base;
  pool.query(`SELECT * FROM gilbut.${pageId} `, (err, topics, fields) => {
    if (err) {
      console.log(err);
    } 
    var detail = template.detail(topics);        
    var html = template.HTML(pageId ,detail);
    response.send(html);
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
  pool.query(`SELECT * FROM gilbut.tour UNION SELECT * FROM gilbut.hotel;`, (err, topics, fields) => { 
    var mainBody = template.main(topics);        
    var html = template.HTML(title, mainBody, id);
    response.send(html);
  });  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});