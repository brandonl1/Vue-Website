<template>
  <div id="app" class="container">
    <!-- Render the header on every page -->
    <SiteHeader/>

    <!-- Render the router view based on the current url -->
    <router-view></router-view>
  </div>
</template>

<script>

import VueRouter from 'vue-router';
import ManageClients from './components/ManageClients.vue';
import ClientInformation from './components/ClientInformation.vue';
import SiteHeader from './components/SiteHeader.vue';
import Homepage from './components/Homepage.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ManageTestPackages from './components/ManageTestPackages.vue';
import CreateTestPackage from './components/CreateTestPackage.vue';
import TestPackageInformation from './components/TestPackageInformation.vue';
import TestList from './components/TestList.vue';

// Router to determine which component gets loaded based on the current url
const router = new VueRouter({
  base: __dirname,
  routes: [
    { path: '/', component: Homepage },
    { path: '/clients', component: ManageClients },
    { path: '/clients/:clientid', component: ClientInformation },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/testpackages', component: ManageTestPackages },
    { path: '/createtestpackage', component: CreateTestPackage },
    { path: '/testpackages/:testpackageid', component: TestPackageInformation },
    { path: '/TestList', component: TestList },

  ],
});

export default {
  router,
  name: 'App',
  components: {
    SiteHeader,
  }
};
</script>

<style>
</style>
