const express = require('express');//importar
const Task = require('../models/Tasks');
const router = express.Router(); //Declarar objeto que tiene las rutas

//DEFINIR RUTAS
router.get('/', async (req,res) => {//OBTENER LAS TAREAS ALMACENADAS
    const tareas = await Task.find(); //cuando termine la consulta a la _BD asiganlo a la constante tareas
     res.json(tareas);//mostrar modelo al navegador
});

router.get('/:id', async (req, res) =>{//RETORNAR LA TAREA SEGUN EL ID
    const Mitarea = await Task.findById(req.params.id);//espero que busque en la BD el id 
    res.json(Mitarea);
});

router.post('/', async(req,res)=>{//GUARDAR TAREAS 
   const tareaObj = new Task(req.body);//INSTANCIAR OBJETO y fijar ID luego  PASO EL CUERPO DE LA PETICION
   await tareaObj.save();//ESPERA QUE GUARDE EN LA BD Y LUEGO  CONTINUA CON la respuesta(requiere algo de tiempo mientras guarda en la BD)

res.json({//MOSTRAR DATOS EN CONSOLA
       Estado: 'Tarea guardada'
   });
});

router.put('/:id', async (req,res)=>{//ACTUALIZAR TAREA - LE PASA LA RUTA Y EL ID
    await Task.findByIdAndUpdate(req.params.id, req.body) //encontrar y actualizar le envio el Id(req.params) y la informacion(req.body)        
   // console.log(req.params, req.body)//TRAER LOS PARAMETROS DE LA PETICION(ID)
    res.json({
        Estado : 'Tarea ACtullizada'
    });
});

router.delete('/:id', async(req,res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({
        Estado: 'Tarea Eliminada'
    });
});

//exportart el objeto router
module.exports = router;



