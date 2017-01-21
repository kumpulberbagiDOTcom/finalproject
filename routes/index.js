var express = require('express');
var router = express.Router();
const models = require('../models')
/* GET home page. */

// models.User.findById(2).then(function(getData) {
//     router.get('/', function(req, res, next) {
//         res.render('index', {
//             title: getData.name
//         });
//     });
// })


router.post('/login', function(req, res, next) {
    var email = req.body.email
    var password = req.body.password
    console.log(email);
    console.log(password);
    models.User.findAll().then(function(data) {
        data.forEach(function(getData) {
            if (getData.email == email && getData.password == password) {
                res.redirect('/adminpanel')
            } else {
              console.log("Email Salah");
            }
        })
    })
})


router.post('/register', function(req, res, next) {
    // create a new user
    models.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(function() {
        console.log("Saving New User");
        res.redirect('/login')
    })
})

router.post('/contact', function(req, res, next) {
    // create a new user
    models.Feedback.create({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    }).then(function() {
        console.log("Saving New Feedback");
        res.redirect('/contact')
    })
})


router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/adminpanel', function(req, res, next) {
    res.render('adminpanel');
});

router.get('/update', function(req, res, next) {
    res.render('update');
});


router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/about', function(req, res, next) {
    res.render('about');
});
router.get('/contact', function(req, res, next) {
    res.render('contact');
});






module.exports = router;
