var express = require('express');
var moongose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();


// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
 });

// Body Parses configuracion
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());



// importanr rutas
var usuarioRoutes = require('./routes/usuario');
var materiaRoutes = require('./routes/materia');
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
app.use('/materia', materiaRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


app.listen(3000, () => {
    // cambiar color la palabra online
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s', 'online');
});   