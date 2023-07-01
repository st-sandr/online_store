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
    localCart(state) {
      localStorage.setItem('localCart', JSON.stringify(state.cart));
      return state.cart;
    },
  },
  mutations: {
    setProductToState: (state, products) => {
      state.products = products;
    },
    addToCart: (state, product) => {
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
    removeFromCart: (state, index) => {
      state.cart.splice(index, 1);
    },
    increment: (state, index) => {
      state.cart[index].quantity++;
    },
    decrement: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--;
      } else state.cart.splice(index, 1);
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
