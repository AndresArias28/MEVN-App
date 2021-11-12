import Vue from 'vue';
import App from './components/App.vue';

new Vue({
    render: h => h(App)//funciones  render y le envio el componente a renderizar
}).$mount('#app');