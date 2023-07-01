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

<script>
import vCatalogItem from './v-catalog-item.vue';
import vFiltersMenu from './v-filters-menu.vue';
import Paginate from 'vuejs-paginate-next';
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vFiltersMenu,
    paginate: Paginate,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const paginated_product = ref([]);
    const page = ref(1);
    const items_per_page = 9;

    const getProducts = () => store.dispatch('getProductsFromApi');

    const addToCart = (product) => store.commit('addToCart', product);

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

    return {
      page,
      paginatedProducts,
      pageCounts,
      addToCart,
      changePage,
      productClick,
    };
  },
};
</script>

<style lang="scss">
.v-catalog {
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 75%;
    align-items: center;
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      column-gap: 5%;
    }
  }
  &__filters {
    width: 20%;
  }
}

.pagination {
  display: flex;
  margin: $margin;
  list-style-type: none;
  align-items: flex-end;
}

.page-item {
  padding: $padding 0;
  border-radius: $radius;
  &:hover {
    background-color: $is_hover;
  }
  &:active {
    background-color: $is_activ;
  }
}
.page-link {
  padding: $padding;
  cursor: pointer;
}
@media (max-width: 599px) {
  .v-catalog {
    flex-direction: column;
    align-items: center;
  }
}
</style>
