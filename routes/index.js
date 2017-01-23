var express = require('express');
var router = express.Router();
const models = require('../models')
/* GET home page. */

// router.get('/', function(req, res, next) {
//     models.User.findById(2).then(function(getData) {
//         res.render('index', {
//             title: getData.name
//         });
//     });
// })


router.get('/', function(req, res, next) {
    models.Product.findAll().then(function(data) {
        var name = [];
        var des = [];
        var img = [];
        var datalength = data.length
        for (var i = 0; i < data.length; i++) {
            name.push(`${data[i].name}`)
            des.push(`${data[i].description}`)
            img.push(`${data[i].imageUrl}`)
        }
        res.render('index', {
            getdatalength: datalength,
            getImg: img,
            getName: name,
            getDec: des
        });
    });
});



router.get('/delete/:getid', function(req, res) {
    models.Product.findById(req.params.getid).then(function(data) {
        data.destroy()
    }).then(function() {
        res.redirect('/update')
    })
});

router.get('/updatedata/:getid', function(req, res) {
    models.Product.findById(req.params.getid).then(function(data) {
        res.render('updatedata', {
            getId: `${data.id}`,
            getName: `${data.name}`,
            getImageUrl: `${data.imageUrl}`,
            getDes: `${data.description}`
        });
    });
});

router.post('/updatedata', function(req, res, next) {
    models.Product.findById(req.body.id).then(function(data) {
        data.update({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.desc,
            updatedAt: new Date()
        }).then(function() {
            console.log("Saving Update Data");
            res.redirect('/update')
        })
    })
})


router.get('/update', function(req, res, next) {
    models.Product.findAll().then(function(data) {
        var id = []
        var name = []
        var imageurl = []
        var description = []
        var datalength = data.length
        for (var i = 0; i < data.length; i++) {
            id.push(`${data[i].id}`)
            name.push(`${data[i].name}`)
            imageurl.push(`${data[i].imageUrl}`)
            description.push(`${data[i].description}`)
        }
        res.render('update', {
            getdatalength: datalength,
            getId: id,
            getName: name,
            getImageUrl: imageurl,
            getDes: description
        });
    })
});


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

router.post('/adminpanel', function(req, res, next) {
    // create a new user
    models.Product.create({
        imageUrl: req.body.imageurl,
        name: req.body.name,
        description: req.body.description
    }).then(function() {
        console.log("Saving New Product");
        res.redirect('/adminpanel')
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


router.get('/adminpanel', function(req, res, next) {
    res.render('adminpanel');
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
