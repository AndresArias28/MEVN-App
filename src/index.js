const express = require('express');//IMPORTAR MODULO EXPRESS
const morgan = require('morgan');//MOSTRAR EN EL SERVIDOR LAS PETICIONES RECIBIDAS DEL NAVEGADOR
const mongoose = require('mongoose');//FACILITAR LA CONECCION A MONGO DB

app = express();//INICIALIZAR 

//CONECCION A LA BD
mongoose.connect('mongodb://localhost:27017/mevn-database')
    .then(db => console.log('conectado  a la BD'))
    .catch(err=>console.log(err));

//SETTING
app.set('appNombre', 'SApp Server');//ASIGANARLE NOMBRE
app.set('port', process.env.PORT || 3000);//crear puerto para escuchar

//MIDDLEWARE
app.use(morgan('dev'));//PARAMETRO dev MUESTRA UN MENSAJE CORTO POR CONSOLA
app.use(express.json());//procesar peticiones en formato json que entienda el navegador

//ROUTES
app.use('/api/tasks', require('./routes/tasks'));//definir la ubicacion del archivo 

//STATIC FILES
app.use(express.static(__dirname + '/public'));//DEFINIR UBICACION DE LA RUTA.  __dirname CONTIENE LA RUTA INICIAL src

//SERVER  LISTENING
app.listen(app.get('port'),  () => {//CALLBACK, RETORNAR UNA FUNCION CUANDO TERMINA UN PROCESO
    console.log('servidor funcionando');
    console.log('nombre del server: ', app.get('appNombre'));
});