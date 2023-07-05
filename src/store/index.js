import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    sortedProducts: [],
    categories: [],
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
  },
  mutations: {
    setProductToState: (state, products) => {
      state.products = products;
    },
    setCategoriesToState: (state, products) => {
      const arr = [];
      arr.push('Все');
      arr.push(products[0].category);

      products.forEach((item) => {
        let acc = products[0];
        if (item.category !== acc.category) {
          arr.push(item.category);
          acc = item;
        }
      });
      state.categories = [...new Set(arr)];
    },
    sortByCategories: (state, option) => {
      state.sortedProducts = [];
      state.products.map((item) => {
        if (item.category === option) {
          state.sortedProducts.push(item);
        }
      });
    },
  },
  actions: {
    getProductsFromApi({ commit }) {
      axios
        .get('http://localhost:3000/products')
        .then((response) => {
          commit('setProductToState', response.data);
          commit('setCategoriesToState', response.data);
        })
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
