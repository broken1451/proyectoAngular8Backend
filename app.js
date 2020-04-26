var express = require('express');
var moongose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

// Body Parses configuracion
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());



// importanr rutas
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');



// conexion a la bd
moongose.connect('mongodb://localhost:27017/SistemaEstudiantes',{ useUnifiedTopology: true, useNewUrlParser: true } , (err, res) => {
    if (err) {
        console.log('Err: ', err);
        throw  err;
        // return  err;
    } else { 
        console.log('Base de datos:  online');
        // console.log('Res: ', res);
    }
});



// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


app.listen(3000, () => {
    // cambiar color la palabra online
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s', 'online');
});   