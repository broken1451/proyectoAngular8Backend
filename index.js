var express = require('express');
var moongose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config(); // VARIABLES DE ENTORNO
var cors = require('cors')
var app = express();

console.log(process.env);
// Cors
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     next();
//  });
app.use(cors());

// Body Parses configuracion
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());



// importanr rutas
var usuarioRoutes = require('./routes/usuario');
var materiaRoutes = require('./routes/materia');
var estudianteRoutes = require('./routes/estudiante');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');



// conexion a la bd
// moongose.connect('mongodb://localhost:27017/SistemaEstudiantes',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } , (err, res) => {
moongose.connect(process.env.DBCONECCION,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true } , (err, res) => {
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
app.use('/estudiante', estudianteRoutes);
app.use('/login', loginRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);          
app.use('/', appRoutes);


// app.listen(3000, () => { 
app.listen(process.env.PORT, () => {
    // cambiar color la palabra online
    console.log(`Express server corriendo en el puerto ${process.env.PORT}`, 'online');
    // console.log('Express server corriendo en el puerto 3000: \x1b[32m%s', 'online');
});   