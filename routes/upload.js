var express = require("express");
const fileUpload = require("express-fileupload");
// File System
var fileSystem = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Materia = require('../models/materia');
var Estudiante = require('../models/estudiante');


app.use(fileUpload());

app.put("/:tipoImagen/:id", (req, res, next) => {
  
  // tipoImagen = usuarios, estudiante, materia
  var tipoImagen = req.params.tipoImagen;
  var id = req.params.id;
  console.log(id)
  console.log(tipoImagen)

  // tipoImagen de archivos de coleccion usuario o estudiantes
  var tipoImagenesValidos = ['usuario', 'estudiante'];
  if (tipoImagenesValidos.indexOf(tipoImagen) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: "tipo de coleccion no valida",
      errors: { message: "tipo de coleccion no valida solo son permitidad usuario o estudiante" },
    });
  }

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: "No selecciono nada",
      errors: { message: "Debe de seleccionar una imagen" },
    });
  }

  // Obtener nombre del archivo
  var nombreArchivo = req.files.imagen; //imagen es el nombre que esta en el postman
  var nombreArchivoSeparado = nombreArchivo.name.split('.'); // separar en un arreglo el archivo para tener su extension
  // var extensionArchivo = nombreArchivoSeparado[ultimapocicion.length - 1]; // obtener la extension del archivo
  var extensionArchivo = nombreArchivoSeparado[nombreArchivoSeparado.length - 1]; // obtener la extension del archivo

  // Extensiones permitidas
  var extensionesValida = ['png','jpg','gif','jpeg'];
  if (extensionesValida.indexOf(extensionArchivo) < 0) { // Si manda un -1 o cualquier otro valor menor a cero manda error
    return res.status(400).json({
      ok: false,
      mensaje: "Extension no valida",
      errors: {
        message:
          "La extesion agregada no es permitida solo se admiten estas extensiones: " +  extensionesValida.join(", "),
      },
    });
  }

 // Nombre de archivo personalizado
    // idusuario-nroramdom.png nombre de la imagen
    // var numeroRamdom = Math.random();
    // var nombreArchivo = `${ id }-${Math.random()}j
    // var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;
  var nombreImagenPersonalizado = `${id}-${new Date().getMilliseconds()}.${extensionArchivo}`;

  // Mover el archivo  del temporal a un path en especifico
  var path = `./uploads/${tipoImagen}/${nombreImagenPersonalizado}`;
  nombreArchivo.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
          ok: false,
          mensaje: "Error al mover archivo",
          errors: err
      });
    }

    
    subirImagenPorTipo(tipoImagen, id, nombreImagenPersonalizado, res);

    // res.status(200).json({
    //   ok: true,
    //   mensaje: "Archivo movido",
    //   extensionArchivo: extensionArchivo
    // });
  });
 
});


function subirImagenPorTipo(tipoImagen, id, nombreImagenPersonalizado, res) {
          if(tipoImagen == 'usuario'){
            Usuario.findById(id, (err, usuario) => {
              if (err) {
                return  res.status(500).json({
                    ok: false,
                    mensaje: "Error al subir Imagen",
                    errors: err
                });
            }

            if (!usuario) {
                return  res.status(500).json({
                      ok: false,
                      mensaje: "Error el usuario con ese id no existe",
                      errors: err
                  });
              }
            
            var pathViejo = './uploads/usuario/' + usuario.img; // pathViejo de la imagen si el usuario ya tiene una guardada 
              if (fileSystem.existsSync(pathViejo)) {  // si existe elimina la imagen anterior
                fileSystem.unlink(pathViejo,(err) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: "Error en path",
                            errors: err
                        });
                    }
                });
            }

            usuario.img = nombreImagenPersonalizado;
            usuario.save((err, usuarioActualizado) => {
              if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al subir imagen de usuario",
                    errors: err
                });
            }
            usuarioActualizado.password = ':)';
            return res.status(200).json({
                ok: true,
                mensaje: "Imagen de usuario actualizada ",
                usuarioActualizado: usuarioActualizado
              });
          });


        });
      }

  if(tipoImagen == 'estudiante'){
    Estudiante.findById(id, (err, estudiante) => {
      if (err) {
        return  res.status(500).json({
            ok: false,
            mensaje: "Error al subir Imagen",
            errors: err
        });
    }

    if (!estudiante) {
        return  res.status(500).json({
              ok: false,
              mensaje: "Error el estudiante con ese id no existe",
              errors: err
          });
      }
    
    var pathViejo = './uploads/estudiante/' + estudiante.img; // pathViejo de la imagen si el usuario ya tiene una guardada 
      if (fileSystem.existsSync(pathViejo)) {  // si existe elimina la imagen anterior
        fileSystem.unlink(pathViejo,(err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error en path",
                    errors: err
                });
            }
        });
    }

    estudiante.img = nombreImagenPersonalizado;
    estudiante.save((err, estudianteActualizado) => {
      if (err) {
        return res.status(400).json({
            ok: false,
            mensaje: "Error al subir imagen de usuario",
            errors: err
        });
    }
    estudianteActualizado.password = ':)';
    return res.status(200).json({
        ok: true,
        mensaje: "Imagen de estudiante actualizada ",
        estudianteActualizado: estudianteActualizado
      });
  });


});
  }

}

// Exportar Modulo
module.exports = app;
