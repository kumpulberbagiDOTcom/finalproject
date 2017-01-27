var express = require('express');
var router = express.Router();
const models = require('../models')
const passwordHash = require('password-hash')

router.get('/', function(req, res, next) {
    models.Product.findAll().then(function(data) {
        res.render('index',{
            getData: data,
            statusloginregister: req.session.statusloginregister || "Login/Register"
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
            getDes: `${data.description}`,
            level: req.session.nameuser || "Admin"
        });
    });
});

router.post('/updatedata', function(req, res, next) {
    models.Product.findById(req.body.id).then(function(data) {
        data.update({
            name: req.body.name,
            imageUrl: req.body.imageurl,
            description: req.body.description,
            updatedAt: new Date()
        }).then(function() {
            console.log("Saving Update Data");
            res.redirect('/update')
        })
    })
})


router.get('/update', function(req, res, next) {
    var nameuser = req.session.nameuser
    if (req.session.statuslogin != true) {
        res.redirect('/login')
    } else {
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
                getDes: description,
                level: req.session.nameuser || "Admin"
            });
        })
    }
});


router.post('/login', function(req, res, next) {
    var email = req.body.email
    var password = req.body.password
    models.User.findOne({
        where: {
            email: email
        }
    }).then(function(getData) {
        if (getData) {
            if (getData.email == email && passwordHash.verify(password, getData.password) == true) {
                req.session.statuslogin = true
                req.session.statusloginregister = "Logout"
                req.session.nameuser = `${getData.name}`
                res.redirect('/adminpanel')
            } else {
                res.render('login', {
                    status: "The email or password is incorrect"
                })
            }
        } else {
            res.render('login', {
                status: "The email or password is incorrect"
            })
        }

    })
})


router.post('/register', function(req, res, next) {
    models.User.findOne({
        email: req.body.name
    }).then(function(result) {
        if (result) {
            res.render('register', {
                statusregister: "Emaal Sudah Terdaftar"
            })
        } else {
            models.User.create({
                name: req.body.name,
                email: req.body.email,
                password: passwordHash.generate(req.body.password)
            }).then(function() {
                console.log("Saving New User");
                res.redirect('/login')
            })
        }
    })
})

router.post('/adminpanel', function(req, res, next) {
    if (req.session.statuslogin != true) {
        res.redirect('/')
    } else {
        models.Product.create({
            imageUrl: req.body.imageurl,
            name: req.body.name,
            description: req.body.description
        }).then(function() {
            console.log("Saving New Product");
            res.redirect('/adminpanel')
        })
    }
})

router.post('/contact', function(req, res, next) {
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
    if (req.session.statuslogin != true) {
        res.redirect('/login')
    } else {
        res.render('adminpanel', {
            level: req.session.nameuser || "Admin"
        });
    }
});



router.get('/login', function(req, res, next) {
    res.render('login', {
        status: ""
    });
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        statusregister: ""
    });
});

router.get('/about', function(req, res, next) {
    res.render('about', {
        statusloginregister: req.session.statusloginregister || "Login/Register"
    });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy()
    res.redirect('/login');
});

router.get('/contact', function(req, res, next) {
    res.render('contact', {
        statusloginregister: req.session.statusloginregister || "Login/Register"
    });
});


module.exports = router;
