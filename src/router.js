import { createRouter, createWebHashHistory } from 'vue-router';
import vCatalog from '@/components/v-catalog.vue';
import vCart from '@/components/v-cart.vue';
import vProductPage from '@/components/v-product-page.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/catalog',
      name: 'catalog',
      component: vCatalog,
    },
    {
      path: '/catalog/product',
      name: 'product',
      component: vProductPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true,
    },
  ],
});
