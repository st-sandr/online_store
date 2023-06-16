import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
  },
  mutations: {
    SET_PRODUCT_TO_STATE: (state, products) => {
      state.products = products;
    },
  },
  actions: {
    GET_PRODUCTS_FROM_API({ commit }) {
      axios
        .get('http://localhost:3000/products')
        .then((response) => commit('SET_PRODUCT_TO_STATE', response.data))
        .catch((error) => console.log(error));
    },
  },
  modules: {},
});
