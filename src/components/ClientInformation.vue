<!-- Placeholder for future Client Information page -->
<template>
  <div class="container">
      <div>This will display information for Client #{{ $route.params.clientid }}.</div>
  </div>
</template>

<script>


export default {
    name: 'ClientInformation',
    components: {

    },
    data() {
        return {
            curSearch: "",
            clientId: "",
            clientName: "",
            clientPhoneNumber: "",
            clientEmail: "",
        }
    },
    mounted () {
        // will get the Client by ID from the list of Clients stored in state.
        // will also call a method to make a GET request to get the Test Package results for the Client.
    },
    props: {

    },
    methods: {

    }
}


</script>