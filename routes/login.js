var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED
var app = express();
var Usuario = require("../models/usuario");


app.post('/', (req,res)=>{

    var body = req.body;
    Usuario.findOne({email:body.email},(err,usuarioLogin)=>{

        if (err) {
            return res.status(500).json({
              ok: false,
              mensaje: "Error al buscar usuario",
              errors: err,
            });
          }

        if (!usuarioLogin) {
            return res.status(500).json({
                ok: false,
                mensaje: "Credenciales incorrectas",
                errors: err,
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioLogin.password)) {
            return res.status(500).json({
                ok: false,
                mensaje: "Credenciales incorrectas",
                errors: err,
            });
        }

        // Crear un token
        usuarioLogin.password = ':)'
        var token  = jwt.sign({usuario:usuarioLogin}, SEED, {expiresIn:14400} )
        res.status(201).json({
            ok: true,
            mensaje: "Login Funciona",
            usuarioLogin:usuarioLogin,
            token: token,
            id:usuarioLogin._id

        });
    })



});




module.exports = app;



