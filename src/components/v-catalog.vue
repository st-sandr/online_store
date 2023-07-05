<template>
  <div class="v-catalog">
    <v-filters-menu class="v-catalog__filters" />
    <div class="v-catalog__wrapper">
      <div class="v-catalog__wrapper__list">
        <v-catalog-item
          @productClick="productClick"
          v-for="product in paginatedProducts"
          :key="product.article"
          :product="product"
          @addToCart="addToCart"
        />
      </div>
      <paginate
        v-model="page"
        :page-count="pageCounts"
        :page-range="3"
        :margin-pages="2"
        :click-handler="changePage"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
      />
    </div>
  </div>
</template>

<script setup>
import vCatalogItem from './v-catalog-item.vue';
import vFiltersMenu from './v-filters-menu.vue';
import Paginate from 'vuejs-paginate-next';
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useToast } from 'vue-toastification';

const store = useStore();
const router = useRouter();
const paginated_product = ref([]);
const page = ref(1);
const items_per_page = 9;
const cart = useStorage('cart', []);
const toast = useToast();

const getProducts = () => store.dispatch('getProductsFromApi');

const addToCart = (product) => {
  if (!product['quantity']) {
    product['quantity'] = 1;
  }
  if (cart.value.length) {
    let isProductExists = false;
    cart.value.forEach(function (item) {
      if (item.article === product.article) {
        isProductExists = true;
        toast('Товар уже в корзине', {
          position: 'top-right',
          timeout: 2000,
          draggablePercent: 0.6,
          hideProgressBar: true,
          closeButton: 'button',
        });
      }
    });
    if (!isProductExists) {
      cart.value.push(product);
      localStorage.setItem('cart', JSON.stringify(cart.value));
      toast.success('Товар добавлен!', {
        position: 'top-right',
        timeout: 2000,
        draggablePercent: 0.6,
        hideProgressBar: true,
        closeButton: 'button',
      });
    }
  } else {
    cart.value.push(product);
    localStorage.setItem('cart', JSON.stringify(cart.value));
    toast.success('Товар добавлен!', {
      position: 'top-right',
      timeout: 2000,
      draggablePercent: 0.6,
      hideProgressBar: true,
      closeButton: 'button',
    });
  }
};

const productClick = (article) =>
  router.push({ name: 'product', query: { product: article } });

const changePage = (page_nam) => {
  page.value = page_nam;
  let pagination_offset = items_per_page * page_nam - items_per_page;

  paginated_product.value = JSON.parse(
    JSON.stringify(filteredProducts.value)
  ).splice(pagination_offset, items_per_page);
  window.scrollTo(0, 0);
};

const products = computed(() => store.getters.products);

const sortedProducts = computed(() => store.getters.sortedProducts);

const pageCounts = computed(() => {
  return Math.ceil(filteredProducts.value.length / items_per_page);
});

const paginatedProducts = computed(() => {
  if (paginated_product.value.length) {
    return paginated_product.value;
  } else {
    paginated_product.value = JSON.parse(
      JSON.stringify(filteredProducts.value)
    ).splice(0, items_per_page);
    return paginated_product.value;
  }
});

const filteredProducts = computed(() => {
  if (sortedProducts.value.length) {
    return sortedProducts.value;
  } else {
    return products.value;
  }
});

onMounted(() => getProducts());

watch(sortedProducts, () => changePage(1));
</script>

<style lang="scss">
@import '/src/assets/styles/components/v-catalog.scss';
</style>
