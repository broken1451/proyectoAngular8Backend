var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED

exports.verificaToken = function (req,res,next) {
       // paramatro opcional para leer el token por la url
       var token = req.query.token;
       var reqQueryToken = req.query;
       console.log('token: ', token);
       console.log('reqQueryToken req.query: ', reqQueryToken);
       
       // jwt.verify('token que recibe de la peticion', semillas, callback(err,decoded-informacion del usuario q se coloco en el payload ) )
       jwt.verify(token, SEED, (err, decoded) => {
           // Enviar token opcional por la url 
               //localhost:3000/usuario?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvQmRMb2dpbiI6eyJyb2xlIjoiQURNSU5fUk9MRSIsIl9pZCI6IjVkOTEyNTQ3YWZhZTI1MTgyOGM5M2JiNSIsIm5vbWJyZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjopIiwiX192IjowfSwiaWF0IjoxNTY5OTQyMjQyLCJleHAiOjE1Njk5NTY2NDJ9.g9sLtl82cI0qhfxsXGsGNqsN6TNtWQLNYhqYguF9Q4A
           console.log('decoded: ', decoded);
               if (err) {
                   return res.status(401).json({
                       ok: false,
                       mensaje: "Error TOKEN no valido",
                       // errors: err
                       errors: { message: 'Error TOKEN no valido' }
                   });
               }
            // req.usuario = decoded.usuario// informacion del usuario disponible en cualquier peticion 
            usuarioToken = decoded.usuario// informacion del usuario disponible en cualquier peticion 
            next(); // continua con las siguientes funciones si no hay error 
            // res.status(200).json({
            //     ok: true,
            //     decoded:decoded
            // });

           });

  }
    //=============================================================================================
    // Verificar token con un midleware(siempre se ejecutan de primero)
    //=============================================================================================
  
