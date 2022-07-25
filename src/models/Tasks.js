//CREAR EL MODELO o la esctructura de como se veran los datos

const mongoose = require('mongoose');
const { Schema } = mongoose;//Escoger una parte de la libreria.

//CREAR EL ESQUEMA(TABLA TAREA)
const Task = new Schema({
    titulo: String,
    descripcion: String 
});

//DEFINIR EL MODELO Y EXPORTARLO PARA PODER UTILIZARLO EN OTRA PARTE
module.exports = mongoose.model('Task', Task);