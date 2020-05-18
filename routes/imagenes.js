var express = require('express');
var app = express();

// Modulo de nodeJs para crear path validos y correctos
const path = require('path'); 

// File System
var fileSystem = require('fs');

app.get('/:tipoImagen/:imagen', (req, res, next)=>{

    var tipoImagen = req.params.tipoImagen;
    var imagen = req.params.imagen;
    console.log('tipoImagen: ',tipoImagen );
    console.log('imagen: ', imagen);

    // Creacion del path  __dirname(toda la ruta donde se encuentra en este momento), `referencia a donde se encuentra la imagen`
    var pathImagen = path.resolve(__dirname,`../uploads/${tipoImagen}/${imagen}`); // Resolver el path para que siempre quede correcto, tipoImagen = usuarios / estudiantes, imagen = nombre de imagen
    console.log('pathImagen: ', pathImagen);
    if (fileSystem.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        var pathNoImage = path.resolve(__dirname,`../assets/no-img.jpg`);
        console.log('pathNoImage: ', pathNoImage);
        res.sendFile(pathNoImage);
    }
})

module.exports = app;