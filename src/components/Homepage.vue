<template>
  <div class="container">
      <!-- "Welcome" page header -->
      <div style="padding-bottom:25px; padding-top:25px">
        <h1>Welcome</h1>
      </div>
      <center>
        <b-button-toolbar style="padding-top:25px;padding-left:350px;padding-right:350px">
          <!-- Manage Clients Button -->
          <b-button-group style="padding-right:15px">
            <b-button variant="outline-dark"><b-icon icon="person" font-scale="5" @click="onClickManageClients()"></b-icon> <br> <strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>Clients</strong></b-button>
          </b-button-group>
          <!-- Manage Test Packages -->
          <b-button-group>
            <b-button variant="outline-dark"><b-icon icon="ui-checks" font-scale="5" @click="onClickManageTestPackages()"></b-icon> <br> <strong>&nbsp;&nbsp;&nbsp;Manage Test&nbsp;&nbsp;&nbsp;<br> Packages</strong></b-button>  
          </b-button-group>
        </b-button-toolbar>
      </center>
  </div>
</template>

<script>


export default {
    name: 'Homepage',
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
        onClickManageClients() {
            this.$router.push({ path: '/clients' });
        },
        onClickManageTestPackages() {
            this.$router.push({ path: '/testpackages' });
        },
    }
}


</script>