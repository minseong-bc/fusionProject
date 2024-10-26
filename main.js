var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var qs = require('querystring');
var template = require('./lib/template.js');
var sanitizeHtml = require('sanitize-html');
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'db_test',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if(pathname === '/'){
      if(queryData.id === undefined){ // 메인 페이지 라면 => 메인페이지 출력
        var title = 'main';
        fs.readFile(`data/${title}`, 'utf8', (err, body) => {
          var sanitizeBody = sanitizeHtml(body);       
          var html = template.HTML(title, sanitizeBody);
          response.writeHead(200);
          response.end(html);
        });
      } else { // 그 외 페이지 출력
        // var filiterId = path.parse(queryData.id).base; !! sanitizeHtml로 대체 !!
        var sanitizedTitle = sanitizeHtml(path.parse(queryData.id).base);
        fs.readFile(`data/${sanitizedTitle}`, 'utf8', (err, body) => { //1차 페이지 (지역, 축제, 식당)
          var sanitizeBody = sanitizeHtml(body);      
          var html = template.HTML(sanitizedTitle, sanitizeBody);
          response.writeHead(200);
          response.end(html);
        });
      }
    } else if(pathname === '/register'){ // 회원가입 페이지
      var title = 'register';
        var html = template.HTML(title, `
          <form action="http://localhost:3000/signup" method = "POST">
            <input class="inputbox" id="id" name="id" type="text" placeholder="아이디를 입력해 주세요."/>
            <input class="inputbox" id="name" name="name" type="text" placeholder="이름을 입력해 주세요."/>
            <input class="inputbox" id="password1" name="password1" type="password" placeholder="비밀번호를 입력해 주세요."/>
            <input class="phoneNum" id="phone1" name="phone1" type="text" maxlength="13" placeholder="전화번호 13자리를 입력해 주세요." />
            <button type="submit" id="signup_button" onclick="signup()" >가입하기</button>
        </form>
        `);
        response.writeHead(200);
        response.end(html);
      } else if(pathname === '/signup'){ // 회원가입 처리 
        var body = '';
        request.on('data', function(data){ // post 방식으로 데이터를 받을 때
          body = body + data;
        });
        request.on('end', function(){ // 데이터를 다 받았을 때
          var post = qs.parse(body);
          var id = post.id;
          var name = post.name;
          var password1 = post.password1;
          var phone1 = post.phone1;
          /* 데이터베이스에 저장하는 코드가 와야함 */ 
          // 리다이렉션 로그인 페이지로
          // console.log(post);
          response.writeHead(302, {Location: '/login'}); // 로그인 페이지로 리다이렉션(302)
          response.end();
        }); 
      } else if(pathname === '/login'){ // 로그인 페이지
        var title = 'login';
        var html = template.HTML(title, `
          // 폼태그 
          `);
          response.writeHead(200);
          response.end(html);
      }
    else {
      response.writeHead(404);
      response.end('Not found');
    }

});
app.listen(3000);