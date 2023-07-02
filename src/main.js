import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueSplide from '@splidejs/vue-splide';

createApp(App).use(store).use(router).use(VueSplide).mount('#app');
