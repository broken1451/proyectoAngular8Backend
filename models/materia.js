var mongoose =	require('mongoose');

var Schema =	mongoose.Schema;

var materiaSchema = new Schema({
	nombre: {	type: String,	required: [true, 'El	nombre	es	necesario']	},
	img: {	type: String, required: false },
	usuario: {	type: Schema.Types.ObjectId, ref: 'Usuario' }
    },	
    { collection: 'materias' 
});

module.exports = mongoose.model('materia',	materiaSchema);