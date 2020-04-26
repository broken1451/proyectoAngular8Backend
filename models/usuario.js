var moongose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');

var Schema = moongose.Schema;

var usuarioSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "La clave es necesario"],
  },
  img: {
    type: String,
    required: false,
  }
});

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe ser unico'})

module.exports =  moongose.model('Usuario', usuarioSchema);
