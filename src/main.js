import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueSplide from '@splidejs/vue-splide';
import components from '@/components/UI/index';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store);
app.use(router);
app.use(VueSplide);
app.mount('#app');
app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true,
});
