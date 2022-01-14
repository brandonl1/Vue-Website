import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Store for our application's state.
export default new Vuex.Store({
  state: {
    clients: [],
    testPackages: [],
  },
  mutations: {
    setClients (state, clients) {
      state.clients = clients;
    },
    setTestPackages (state, testPackages) {
      state.testPackages = testPackages;
    }
  },
  actions: {
      getClients({ commit }) {
        
        // get the Clients from the Admin API and set the state for Clients
        axios.get("http://localhost:7992/v1/api/admin/clients").then((results) =>
          { commit('setClients', results.data.clients);});
      },
      getTestPackages ({ commit }) {
        // get the Test Packages from the Admin API and set the state for Test Packages
        // TODO: Make this no longer hard-coded once login is set-up.
        /*axios.get("http://localhost:7992/v1/api/admin/320227ee-381b-40d0-a14a-e21775fb3c91/configs/tests").then((results) =>
          { commit('setTestPackages', results.data.tests);});*/

        const test1 = { testId: 1, testName: "test 1", testType: "ping", proxyIP: "8.8.8.8"};
        const test2 = { testId: 2, testName: "test 2", testType: "traceroute", proxyIP: "8.8.8.8"};
        const testPackage1 = { testPackageId: "1", packageName: "Test Package 1", testSettings: [test1, test2] };

        const test3 = { testId: 3, testName: "test 1", testType: "ping", proxyIP: "123.123.123.123"};
        const test4 = { testId: 4, testName: "test 2", testType: "traceroute", proxyIP: "142.251.33.110"};
        const test5 = { testId: 5, testName: "test 3", testType: "traceroute", proxyIP: "8.8.8.8"};
        const testPackage2 = { testPackageId: "2", packageName: "Test Package 2", testSettings: [test3, test4, test5] };

        commit('setTestPackages', [testPackage1, testPackage2]);

      },
      postTestPackage( commit, { packageName, testSettings }) {

        // TODO: Make this no longer hard-coded once login is set-up.
        const data = { customerID: "320227ee-381b-40d0-a14a-e21775fb3c91", packageName, testSettings };

        return new Promise((resolve, reject) => {
          fetch("http://localhost:7992/v1/api/admin/configs/tests", {
          method: "POST",
          body: JSON.stringify(data),
          }).then((response) => { 
            console.log("response from API:", response); 
            console.log("response status:", response.status);
            resolve(response.status); 
          }).catch((error) => {
            console.error('ERROR:', error); 
            reject(error);
          });
        });
      },

  }
});