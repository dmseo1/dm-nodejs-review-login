var router = require('express').Router();
var mysql = require('mysql');
require('dotenv').config();

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
});




router.get('/home', (req, res) => {
    var sql = 'SELECT * FROM articles';
    db.query(sql, (err, result) => {
        //쿼리 결과를 콜백 함수로 받는다.
        if(!err) {
            console.log(`총 ${result.length}개의 책이 조회됨.`);
            console.log(result);
            res.render('home', {
                dataArray : result
            });
        } else {
            console.log(err);
        }
    });
});


router.get('/login', (req, res) => {
    res.render('login.ejs')
});

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if(username && password) {
        var sql = `SELECT * FROM users WHERE username='${username}'`;
        db.query(sql, (err, result) => {
            
            if(!err) {
                console.log(result);
                if(result.length > 0) {
                    if(result[0]['password'] == password) {
                        // res.redirect('/welcome', {
                        //     username : username
                        // });
                        // res.render('welcome', {
                        //     username : username
                        // });
                        res.redirect("home");
                    } else {
                        res.render('login', {
                            idchk : 0,
                            pwchk : 1
                        })
                    }
                    
                } else {
                    res.render('login', {
                        idchk : 1,
                        pwchk : 0
                    })
                }
            }

            
            
            // res.send('/welcome', {
            //     username : username
            // });
            // if(!err) {
            //     if(result.length > 0) {
            //         console.log(`총 ${result.length}개의 계정이 조회됨.`);
            //         console.log(result);
            //         console.log(result[0]['password'])
            //     } else {
            //         res.send("아이디가 존재하지 않음")
            //     }
            // } else {
            //     res.send("쿼리 에러")
            // }
        })
    } else {
        res.send("Please fill in the username and password");
    }
})

router.post('/auth', (req, res) => {
    res.send("환영합니다")
})

router.get('/welcome', (req, res) => {
    res.send("환영합니다")
})

router.post('/welcome', (req, res) => {
    res.send("환영합니다")
})

module.exports = router;