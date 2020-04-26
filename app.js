var express = require('express');


var app = express();





app.listen(3000, () => {
    // cambiar color la palabra online
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s', 'online');
});   