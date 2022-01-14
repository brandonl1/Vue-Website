import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Store for our application's state.
export default new Vuex.Store({
  state: {
    customers: [],
  },
  mutations: {
      setCustomers (state, customers) {
      state.customers = customers;
    }
  },
  actions: {
      getCustomers({ commit }) {
        
        // get the Customers from the Admin API and set the state for Customers
        axios.get("http://localhost:7992/v1/api/admin/customers").then((results) =>
          { commit('setCustomers', results.data.customers);});
      }
  }
});