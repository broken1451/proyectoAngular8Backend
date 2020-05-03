var express = require('express');
var bcrypt = require('bcryptjs');
var middleware = require('../middleware/autenticacion');
var app = express();
var Usuario = require('../models/usuario');

// obtener too slos usuario
app.get('/', (req, res, next) => {
  Usuario.find({}, 'nombre email img').exec((err, usuarios) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error cargando usuarios',
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Get usuarios',
      usuarios: usuarios,
    });
  });
});



// crear un nuevo usuario
// app.post('/', middleware.verificaToken ,(req, res) => {
app.post('/' ,(req, res) => {
  var body = req.body;
  var usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    img: body.img,
  });

  usuario.save((err, usuarioCreado) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Error al crear usuarios',
        errors: err,
      });
    }
    usuarioCreado.password = ':)'
    res.status(201).json({
      ok: true,
      mensaje: 'usuario creado',
      usuarioCreado: usuarioCreado,
      // usuarioToken: usuarioToken
    });
  });
});

// Actualizar un nuevo usuario
app.put('/:id', (req, res) => {
  var id = req.params.id;
  var body = req.body;

  Usuario.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuarios',
        errors: err,
      });
    }

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: `El usuario con el id ${id} no existe`,
        errors: { message: 'No existe  un usuario con ese ID' },
      });
    }

    usuario.nombre = body.nombre;
    usuario.email = body.email;

    usuario.save((err, usuarioId) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar usuario',
          errors: err,
        });
      }

      usuarioId.password = ':)';
      res.status(201).json({
        ok: true,
        mensaje: 'usuario actualizado',
        usuarioActualizado: usuarioId,
      });
    });
  });
});

// Eliminar un usuario
app.delete('/:id', (req, res) => {
  var id = req.params.id;

  Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al borrar usuario',
        errors: err,
      });
    }

    if (!usuarioBorrado) {
      return res.status(500).json({
        ok: false,
        mensaje: 'No existe el usuario con ese id',
        errors: { message: 'no existe ese usuario con ese id', errors: err },
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: 'usuario borrado',
      usuarioBorrado: usuarioBorrado,
    });
  });
});

module.exports = app;
