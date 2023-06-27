<template>
  <div class="v-catalog">
    <v-filters-menu
      class="v-catalog__filters"
      @change_category="changePage(1)"
    />
    <div class="v-catalog__wrapper">
      <div class="v-catalog__wrapper__list">
        <v-catalog-item
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
import { mapActions, mapGetters } from 'vuex';
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vFiltersMenu,
    paginate: Paginate,
  },
  props: {},
  data() {
    return {
      pagination_items_per_page: 9,
      page: 1,
      paginated_product: [],
    };
  },
  methods: {
    ...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    changePage(page_nam) {
      this.page = page_nam;
      this.pagination_offset =
        this.pagination_items_per_page * page_nam -
        this.pagination_items_per_page;

      this.paginated_product = JSON.parse(
        JSON.stringify(this.filteredProducts)
      ).splice(this.pagination_offset, this.pagination_items_per_page);
      window.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapGetters(['PRODUCTS', 'CART', 'SORTED_PRODUCTS']),
    filteredProducts() {
      if (this.SORTED_PRODUCTS.length) {
        return this.SORTED_PRODUCTS;
      } else {
        return this.PRODUCTS;
      }
    },
    paginatedProducts() {
      if (this.paginated_product.length) {
        return this.paginated_product;
      } else {
        this.paginated_product = JSON.parse(
          JSON.stringify(this.filteredProducts)
        ).splice(0, this.pagination_items_per_page);

        return this.paginated_product;
      }
    },
    pageCounts() {
      return Math.ceil(
        this.filteredProducts.length / this.pagination_items_per_page
      );
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
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
