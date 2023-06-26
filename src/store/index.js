import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    products: [],
    sortedProducts: [],
    cart: [],
  },
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    SORTED_PRODUCTS(state) {
      return state.sortedProducts;
    },
    CART(state) {
      return state.cart;
    },
  },
  mutations: {
    SET_PRODUCT_TO_STATE: (state, products) => {
      state.products = products;
    },
    SET_CART: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.forEach(function (item) {
          if (item.article === product.article) {
            isProductExists = true;
            item.quantity++;
          }
        });
        if (!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1);
    },
    INCREMENT: (state, index) => {
      state.cart[index].quantity++;
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      } else state.cart.splice(index, 1);
    },
    CATEGORIES_SORT: (state, option) => {
      state.sortedProducts = [];
      state.products.map((item) => {
        if (item.category === option.name) {
          state.sortedProducts.push(item);
        }
      });
    },
  },
  actions: {
    GET_PRODUCTS_FROM_API({ commit }) {
      axios
        .get('http://localhost:3000/products')
        .then((response) => commit('SET_PRODUCT_TO_STATE', response.data))
        .catch((error) => console.log(error));
    },
    ADD_TO_CART({ commit }, product) {
      commit('SET_CART', product);
    },
    DELETE_FROM_CART({ commit }, index) {
      commit('REMOVE_FROM_CART', index);
    },
    INCREMENT_CART_ITEM({ commit }, index) {
      commit('INCREMENT', index);
    },
    DECREMENT_CART_ITEM({ commit }, index) {
      commit('DECREMENT', index);
    },
    SORT_BY_CATEGORIES({ commit }, option) {
      commit('CATEGORIES_SORT', option);
    },
  },
  modules: {},
});
