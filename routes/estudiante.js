var express = require("express");

var app = express();

// Importar modelos
var Usuario = require("../models/usuario");
var Materia = require("../models/materia");
var Estudiante = require("../models/estudiante");

//=============================================================================================
// Metodo Obtener todos los Estudiantes
//=============================================================================================
app.get("/", (req, res) => {
  var body = req.body;
  Estudiante.find({}, (err, estudiantes) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando estudiantes",
        errors: err,
      });
    }
    res.status(200).json({
      ok: true,
      mensaje: "estudiantes",
      estudiantes: estudiantes,
    });
  }).populate("materia", "nombre")
    .populate("usuario", "nombre email");
});

// ==========================================
// Obtener estudiante por ID
// ==========================================
app.get("/:id", (req, res) => {
  var id = req.params.id;
  Estudiante.findById(id, (err, estudianteID) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al buscar estudiante",
        errors: err,
      });
    }
    if (!estudianteID) {
      return res.status(400).json({
        ok: false,
        mensaje: "El estudiante con el id " + id + " no existe",
        errors: { message: "No existe el estudiante con ese ID" },
      });
    }
    res.status(200).json({
        ok: true,
        id: id,
        estudianteID: estudianteID,
      });
  }).populate("materia", "nombre")
    .populate("usuario", "nombre email");
});

//=============================================================================================
// Metodo de Crear/Ingresar una estudiante a la bd
//=============================================================================================
app.post("/", (req, res) => {
  var body = req.body;

  var usuario = Usuario._id;
  var materia = Materia._id;
  console.log({ usuario, materia });

  var estudiante = new Estudiante({
    nombre: body.nombre,
    usuario: body.usuario, //id del usuario
    materia: body.materia, //id de la materia
  });
  console.log({ usuario, materia, estudiante });

  estudiante.save((err, estudianteGuardado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error crear estudiante",
        errors: err,
      });
    }
    res.status(201).json({
      ok: true,
      mensaje: "estudiante creado",
      // body: body,
      estudianteGuardado: estudianteGuardado,
    });
  });
});

//=============================================================================================
// Metodo de actualizar un estudiante en la bd
//=============================================================================================
app.put("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;
  Estudiante.findById(id, (err, estudianteID) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error estudiante no encontrado",
        errors: err,
      });
    }
    if (!estudianteID) {
      return res.status(400).json({
        ok: false,
        mensaje: "El estudiante con el " + id + "no existe",
        // errors: err
        errors: { message: "No existe un estudiante con ese ID" },
      });
    }
    estudianteID.nombre = body.nombre;
    estudianteID.usuario = body.usuario;
    estudianteID.materia = body.materia;
    estudianteID.save((err, estudianteActualizado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: "Error al actualizar estudiante",
          errors: { message: "error al actualizar estudiante con ese ID" },
        });
      }
      res.status(200).json({
        ok: true,
        estudianteActualizado: estudianteActualizado,
        // usuarioToken: req.usuarioBdLogin
      });
    });
  });
});

//=============================================================================================
// Metodo de borrar un estudiante  en la bd
//=============================================================================================
app.delete("/:id", (req, res) => {
  var id = req.params.id;
  var body = req.body;

  Estudiante.findByIdAndRemove(id, (err, estudianteBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error al borrar estudiante",
        errors: err,
      });
    }
    if (!estudianteBorrado) {
      return res.status(400).json({
        ok: false,
        mensaje: "El estudiante con el " + id + "no existe",
        // errors: err
        errors: { message: "No existe el estudiante con ese ID" },
      });
    }
    res.status(200).json({
      ok: true,
      id: id,
      estudianteBorrado: estudianteBorrado,
      // body: body
    });
  });
});

module.exports = app;
