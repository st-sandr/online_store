import { createRouter, createWebHashHistory } from 'vue-router';
import vCatalog from '@/components/v-catalog.vue';
import vCart from '@/components/v-cart.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/catalog',
      name: 'catalog',
      component: vCatalog,
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true,
    },
  ],
});
