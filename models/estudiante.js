var mongoose =	require('mongoose');
var Schema =	mongoose.Schema;
var estudianteSchema =	new Schema({
	nombre: { type: String,	required: [ true, 'El	nombre	es	necesario']	},
	img: { type: String,	required: false },
	usuario: { type: Schema.Types.ObjectId,	ref: 'Usuario',	required: false },
	materia: {	
        type: Schema.Types.ObjectId, 
        ref: 'materia', 
        required: [ true, 'El id de la materia es un campo obligatorio'] 
    }
},{ collection: 'estudiantes' });

module.exports = mongoose.model('estudiante', estudianteSchema);