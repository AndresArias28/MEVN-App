<template>
  <div>
     <h1>  Gestión de Tareas </h1>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">Inicio</a>
    </nav>
    <div class="conteiner">
      <div class="row pt-5">
        <div class="col-md-5"> 
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="agregarTarea">
                <!--  evitar que al dar click en blanco se bugue -->
                <div class="form-group">
                  <!--  v-model, para capturar los datos del navegador y manejarlos en el script  -->
                  <input
                    type="text"
                    v-model="tarea.titulo"
                    placeholder="Agrega una task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    v-model="tarea.descripcion"
                    placeholder="Describe la tarea"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
                <!--PERMITE DESPLEGAR UN BOTON SEGUN LA CONDICION EVALUADA -->
                <template v-if="editado === false">
                  <button class="btn btn-primary btn-block">Enviar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Actualizar</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <!-- -->
          <table class="table table-dark">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-active" v-for="tarea of tareas" :key="tarea.id">
                <td>{{ tarea.titulo }}</td>
                <td colspan="2" class="table-active"> {{ tarea.descripcion }}</td>
                <td>
                  <button @click="eliminarTarea(tarea._id)" class="btn btn-danger">
                    Eliminar
                  </button>

                  <button @click="actualizarTarea(tarea._id)" class="btn btn-secondary">
                    Actualizar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function Tarea(titulo, descripcion) {
  this.titulo = titulo;
  this.descripcion = descripcion;
}

export default {
  data() {
    return {
      tarea: new Tarea(),
      tareas: [],
      editado: false,
      tareaEditar:''
    };
  },
  created() {
    //Metodo que se ejecuta momento de cargar la app
    this.obtenerTareas();
  },
  methods: {
    obtenerTareas() {
      fetch("api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tareas = data;
          console.log(this.tareas);
        });
    },

    agregarTarea() {
      if (this.editado === false) {
        //Metodo fetch API para transaccionar datos de forma asincrona
        fetch("/api/tasks", {
          //definir la ruta donde se muestran los datos
          method: "POST", //metodo post
          body: JSON.stringify(this.tarea), //se parsea el objeto Json s String para ver el contenido de la tarea
          headers: {
            //definir cabecera a enviar
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then((res) => res.json()) //parcear la respuesta de String  a objeto json
          .then((data) => this.obtenerTareas());
        this.tarea = new Tarea(); //limpiar datos en el navegador
      }
      else{
         fetch("/api/tasks/" + this.tareaEditar,{
           method: 'PUT',
           body: JSON.stringify(this.tarea),//ENVIAR DATOS A ACTUALIZAR
           headers: {
             Accept: "application/json",
            "Content-type": "application/json"
            }
         })
          .then(res => res.json()) 
          .then(data => {
            this.obtenerTareas();
            this.editado = false;
          });

      }
    
    },

    eliminarTarea(id) {
      fetch("/api/tasks/" + id, {
        //definir la ruta donde se muestran los datos y le envio el id(DEFINIR PETICION)
        method: "DELETE", //metodo post
        headers: {
          //definir cabecera a enviar
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.obtenerTareas();//volver a obtener(actualizar tareas)
        })
    },

    actualizarTarea(id) {
      fetch("/api/tasks/" + id)
        .then((res) => res.json())
        .then((data) => {
          this.tarea = new Tarea(data.titulo, data.descripcion);
          this.tareaEditar = data._id;//ALMACENAR EL ID DE LA TAREA A ACTUALIZAR
          this.editado = true;
        });
    }
  }
};
</script>
