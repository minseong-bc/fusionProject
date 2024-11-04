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
  var title = 'main';
  pool.query(`SELECT * FROM gilbut.tour;`, (err, topics, fields) => { 
    var mainBody = template.main(topics);        
    var html = template.HTML(title, mainBody);
    response.send(html);
  });  
});

app.get('/page/:pageId', (request, response) => { //세부 페이지 (지역, 축제, 식당) (회원가입 로그인 페이지 추가~~~~)
  var filiterId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filiterId}`, 'utf8', (err, body) => { 
      var sanitizedTitle = sanitizeHtml(filiterId);
      var sanitizeBody = sanitizeHtml(body);      
      var html = template.HTML(sanitizedTitle, sanitizeBody);
      response.send(html);
    });
});

app.get('/register', (request, response) => { // 회원가입 페이지
  var title = 'register';
  fs.readFile(`data/${title}`, 'utf8', (err, body) => {
    var sanitizeBody = sanitizeHtml(body,{
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['form', 'input', 'button']),
      allowedAttributes: {
        '*': ['id', 'class', 'type', 'name', 'placeholder', 'value', 'onclick', 'maxlength']
      }
    });       
    var html = template.register(title, sanitizeBody);
    response.send(html);
  });
});

app.post('/signup', (request, response) => { // 회원가입 처리 라우팅
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
    var sanitizeBody = sanitizeHtml(body,{
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['form', 'input', 'button']),
      allowedAttributes: {
        '*': ['id', 'class', 'type', 'name', 'placeholder', 'value', 'onclick'],
      }
    });       
    var html = template.login(title, sanitizeBody);
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
  var title = 'main';
    fs.readFile(`data/${title}`, 'utf8', (err, body) => {
      var sanitizeBody = sanitizeHtml(body);       
      var html = template.HTML(title, sanitizeBody);
      response.send(html);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});