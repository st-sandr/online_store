import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    sortedProducts: [],
    cart: [],
  },
  getters: {
    product: (state) => (article) => {
      return state.products.find((item) => item.article === article);
    },
    products(state) {
      return state.products;
    },
    sortedProducts(state) {
      return state.sortedProducts;
    },
    cart(state) {
      return state.cart;
    },
  },
  mutations: {
    setProductToState: (state, products) => {
      state.products = products;
    },
    sortByCategories: (state, option) => {
      state.sortedProducts = [];
      state.products.map((item) => {
        if (item.category === option.name) {
          state.sortedProducts.push(item);
        }
      });
    },
  },
  actions: {
    getProductsFromApi({ commit }) {
      axios
        .get('http://localhost:3000/products')
        .then((response) => commit('setProductToState', response.data))
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
