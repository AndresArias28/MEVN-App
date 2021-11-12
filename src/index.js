const express = require('express');//importar
const morgan = require('morgan');
const mongoose = require('mongoose');

app = express();//INICIALIZAR 

//CONECCION A LA BD
mongoose.connect('mongodb://localhost:27017/mevn-database')
    .then(db => console.log('conectado  a la BD'))
    .catch(err=>console.log(err));


//SETTING
//crear puerto para escuchar
app.set('appNombre', 'SApp Server');//ASIGANARLE NOMBRE
app.set('port', process.env.PORT || 3000);

//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());//procesar peticiones en formato json que entienda el navegador

//ROUTES
app.use('/api/tasks', require('./routes/tasks'));//definir la ubicacion del archivo 

//STATIC FILES
app.use(express.static(__dirname + '/public'));

//SERVER  LISTENING
app.listen(app.get('port'),  () => {//CALLBACK, RETORNAR UNA FUNCION CUANDO TERMINA UN PROCESO
    console.log('servidor funcionando');
    console.log('nombre del server: ', app.get('appNombre'));
});