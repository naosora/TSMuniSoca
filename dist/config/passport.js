var LocalStrategy = require("passport-local").Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ", [id], function (err, rows) {
            done(err, rows[0]);
        });
    });
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        var dni = req.body.dni;
        var nombres = req.body.nombres;
        var apellidos = req.body.apellidos;
        var direccion = req.body.direccion;
        var fechanacimiento = req.body.fechanacimiento;
        var ruc = req.body.ruc;
        var regciudadano = {
            dni: dni,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            fechanacimiento: fechanacimiento,
            ruc: ruc
        };
        connection.query("SELECT * FROM users WHERE username = ? ", [username], function (err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'El usuario ya existe'));
            }
            else {
                var newUserMysql = {
                    username: username,
                    password: bcrypt.hashSync(password, null, null)
                };
                var insertQuery = "INSERT INTO users (username, password,rol,dni,fullname) values (?, ?,?,?,?)";
                var rol = "usuario-ciudadano";
                var fullname = nombres + apellidos;
                connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, rol, dni, fullname], function (err, rows) {
                    var resresgitrado = connection.query('INSERT INTO ciudadanos SET ? ', regciudadano);
                    var id = rows.insertId;
                    var npmusuario = {
                        id: id,
                        username: username,
                        password: password
                    };
                    console.log('Registrado');
                    //  newUserMysql.id = rows.insertId;
                    // return done(null, newUserMysql);
                    return done(null, npmusuario);
                });
            }
        });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = ? ", [username], function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'Usuario no Encontrado'));
            }
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Su contraseña es Incorrecta'));
            return done(null, rows[0]);
        });
    }));
    passport.use('local-loginempleado', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        connection.query("SELECT * FROM users WHERE username = ? ", [username], function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'Usuario no Encontrado'));
            }
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'Su contraseña es Incorrecta'));
            return done(null, rows[0]);
        });
    }));
};
