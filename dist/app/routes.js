"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
module.exports = function (app, passport) {
    app.get('/', noLoggedIn, function (req, res) {
        res.render('./index.ejs');
        // ;
    });
    app.get('/login', noLoggedIn, function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', noLoggedIn, passport.authenticate('local-login', {
        successRedirect: '/principal',
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        }
        else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });
    app.get('/signup', noLoggedIn, function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', noLoggedIn, passport.authenticate('local-signup', {
        successRedirect: '/principal',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });
    app.get('/logout', isLoggedIn, function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/principal', isLoggedIn, function (req, res) {
        res.render('principal.ejs', { message: req.flash('principal') });
    });
    app.get('/menuempleado', isLoggedIn, function (req, res) {
        res.render('menuempleado.ejs', { message: req.flash('menuempleado') });
    });
    app.get('/loginempleado', noLoggedIn, function (req, res) {
        res.render('loginempleado.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/loginempleado', noLoggedIn, passport.authenticate('local-loginempleado', {
        successRedirect: '/menuempleado',
        failureRedirect: '/loginempleado',
        failureFlash: true
    }), function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 * 60 * 3;
        }
        else {
            req.session.cookie.expires = false;
        }
        res.redirect('/');
    });
    // app.get('/pagos', function (req, res) {
    //     res.render('pagos.ejs', { message: req.flash('loginMessage') });
    // });
    app.get('/list', function (req, res, next) {
        req.getConnection(function (error, conn) {
            conn.query('SELECT * FROM pagoscaja', function (err, rows, fields) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err);
                    res.render('pagos.ejs', {
                        data: ''
                    });
                }
                else {
                    // render to views/country/list.ejs template file
                    res.render('pagos.ejs', {
                        data: rows
                    });
                }
            });
        });
    });
    app.get('/registrodetramite', isLoggedIn, function (req, res) {
        res.render('registrodetramite.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/asignarevaluaciones', isLoggedIn, function (req, res) {
        res.render('asignarevaluaciones.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/realizartramite', isLoggedIn, function (req, res) {
        res.render('realizartramite.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/menudocumentos', isLoggedIn, function (req, res) {
        res.render('menudocumentos.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/declaracion', isLoggedIn, function (req, res) {
        res.render('declaracion.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/realizarpago', isLoggedIn, function (req, res) {
        res.render('realizarpago.ejs', { message: req.flash('loginMessage') });
    });
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        req.isLogged = true;
        return next();
    }
    res.redirect('/');
}
function noLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
