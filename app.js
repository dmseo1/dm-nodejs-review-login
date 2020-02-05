var express = require('express');
//var bodyParser = require('body-parser');
var path = require('path');
//require('html');
require('dotenv').config();

var app = express();

//세팅
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs'); //뷰를 보는 엔진으로 ejs를 채택.
app.engine('html', require('ejs').renderFile);  //html은 ejs로 렌더해주겠다

console.log(path.join(__dirname, 'views'));

//미들웨어 등록; 본 프로그램과 별개로 돌아가는 프로그램 

// app.use('/', (request, response) => {
//     console.log(request);
//     response.send("Hello World")
// });

//get method를 활용해서 쓸 수도 있다
app.get('/', (request, response) => {
    console.log(request);
    response.send("Hello World")
});

app.get('/test', (req, res) => {
    res.render('test.ejs');
});

app.use(express.urlencoded({extended:false}));  //url 인코딩하여 인식할 수 있게 만들어 줌

app.use('/', require('./router/home'));

//포트 설정
var port = 8080;

//서버 실행 및 대기
app.listen(port, () => {
    console.log(`서버가 시작되었습니다: http://localhost:${port}`)
});

//ecmascript 6 문법
//import express from 'express';
//오류; 시스템이 아직 이 문법을 받아들이지 못하고 있음
//하지만 새로운 문법을 해석하여 기존 javascript 코드로 바꾸어줄 번역기가 있으면 된다.
// => ecmascript6 등의 새로운 문법을 사용하기 위해 babel이 필요하다

