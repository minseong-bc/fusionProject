// Get the client
const mysql = require('mysql2');
const id = '2233005';
const table = 'db_test.tour';

var title = '가락';
var addr1 = '서울';
var firstimage = 'http';
var areacode = '1';

// Create the connection to database
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

pool.query(`INSERT INTO ${table} (title, addr1, firstimage, areacode) VALUES ("${title}", "${addr1}", "${firstimage}", "${areacode}"); `, (err, rows, fields) => {
  if (err) {
    console.log(err);
    }
  console.log("success!");
});
// A simple SELECT query
// connection.query(
//   ' SELECT * FROM `stu`; ',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// Using placeholders
// connection.query(
//   'SELECT name FROM `stu` WHERE `studentId` = ? AND `password` = ?',
//   ['2233005', 1234],
//   function (err, results) {
//     console.log(results);
//   }
// );