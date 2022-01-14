<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <!-- F5 logo -->
      <b-navbar-brand style="padding-left:25px">
      <img src="../assets/f5-logo-rgb.png" class="d-inline-block align-top" alt="F5 Logo" width="32" height="32">
        F5 Networks
      </b-navbar-brand>
      
      <!-- Link to Homepage -->
      <b-nav-item><b-icon icon="house" style="padding-right:2px"></b-icon><router-link to="/" style="color:darkgray">Home</router-link></b-nav-item>

      <!-- Link to Manage Clients Page -->
      <b-nav-item><router-link to="/clients" style="color:darkgray">Manage Clients</router-link></b-nav-item>
      <!-- Link to Manage Test Package Page -->
      <b-nav-item><router-link to="/testpackages" style="color:darkgray">Manage Test Packages</router-link></b-nav-item>
      <!-- Link to Client Login Page -->
      <b-nav-item><router-link to="/login" style="color:darkgray">Login</router-link></b-nav-item>
      <!-- Link to Enroll Clients Page -->
      <b-nav-item><router-link to="/register" style="color:darkgray">Register</router-link></b-nav-item>

    </b-navbar-nav>
    
    <!-- Dropdown for Account -->
    <b-navbar-nav>
      <b-nav-item-dropdown text="Account" right>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-navbar>
</template>

<script>


export default {
    name: 'SiteHeader',
    components: {

    },
    data() {
        return {
        }
    },
    mounted () {

    },
    props: {

    },
    methods: {

    }
}


</script>