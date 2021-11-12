const {VueLoaderPlugin} = require('vue-loader');
//EXPORTAR UN OBJETO
 module.exports ={
     entry: './src/app/index.js',//define la ubicacion del archivo a convertir
     output: {
         path: __dirname + '/src/public/js',//ubicacion del archivo convertido
         filename: 'bundle.js'//nombre archivo convertido
     },
     module:{
         rules: [//propiedad
             {//regla 1: traducir codigo moderno a JS
                 test: /\.js$/, //testear todos los archivos que terminan  .js
                 exclude:/node_modules/,//ingnorar los modulos de nodeJS
                 use:{
                     loader: 'babel-loader'//a traves de este loader traduce el codigo moderno de JS
                 }
             },
             {//regla 2 traducir vue a JS
                test: /\.vue$/,
                loader: 'vue-loader'
             }
         ]
     },
     plugins: [
         new VueLoaderPlugin()//USAR PLUGIN DE VUELOADERPLUGIN
     ]
 };
