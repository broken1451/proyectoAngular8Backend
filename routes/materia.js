var express = require("express");
// var mdwareAutenticacion = require('../middlewares/autenticacion');

var app = express();

// Importar modelos
var Materia = require("../models/materia");
var Usuario = require("../models/usuario");

//=============================================================================================
// Metodo Obtener todos las materias
//=============================================================================================
app.get("/", (req, res) => {
  var body = req.body;
  Materia.find({}, (err, materias) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando materias",
        errors: err,
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: "Materias",
      materias: materias,
    });
  }).populate("usuario", "nombre email");
});

// ==========================================
// Obtener materia por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  // console.log('req.params: ', req.params)
  Materia.findById(id, (err, materiaID) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar materia",
        errors: err,
      });
    }
    if (!materiaID) {
      return res.status(400).json({
        ok: false,
        mensaje: "La materia con el id " + id + " no existe",
        errors: { message: "No existe la materia con ese ID" },
      });
    }
    res.status(200).json({
      ok: true,
      id: id,
      materiaID: materiaID,
    });
  }).populate("usuario", "nombre email");
});

//=============================================================================================
// Metodo de Crear/Ingresar una materia a la bd
//=============================================================================================
app.post("/", (req, res) => {
  var body = req.body;
  var usuario = Usuario._id;

  var materia = new Materia({
    nombre: body.nombre,
    // usuario: Usuario._id
    // usuario: Usuario._id
    usuario: body.usuario, //id del usuario
    // usuario: req.usuario._id
  });

  materia.save((err, materiaGuardada) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error crear materia",
        errors: err,
      });
    }
    res.status(201).json({
      ok: true,
      mensaje: "Materia creada",
      // body: body,
      materiaGuardada: materiaGuardada
    });
  });
});

//=============================================================================================
// Metodo de actualizar una materia  en la bd
//=============================================================================================
app.put("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;
  // console.log(body)

  Materia.findById(id, (err, materiaId) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error Materia no encontrada",
        errors: err,
      });
    }

    if (!materiaId) {
      return res.status(400).json({
        ok: false,
        mensaje: "La materia con el " + id + "no existe",
        // errors: err
        errors: { message: "No existe un Hospital con ese ID" },
      });
    }

    materiaId.nombre = body.nombre;
    materiaId.usuario = body.usuario;

    materiaId.save((err, materiaActualizada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar materia",
          errors: { message: "error al actualizar materia con ese ID" },
        });
      }
      res.status(200).json({
        ok: true,
        materiaActualizada: materiaActualizada,
        // usuarioToken: req.usuarioBdLogin
      });
    });
  });
});

//=============================================================================================
// Metodo de borrar una materia en la bd
//=============================================================================================
app.delete("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;
  Materia.findByIdAndRemove(id, (err, materiaBorrada) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar materia",
        errors: err,
      });
    }

    if (!materiaBorrada) {
      return res.status(400).json({
        ok: false,
        mensaje: "La materia con el " + id + "no existe",
        // errors: err
        errors: { message: "No existe la materia con ese ID" },
      });
    }
    res.status(200).json({
      ok: true,
      id: id,
      materiaBorrada: materiaBorrada,
      // body: body
    });
  });
});

module.exports = app;
