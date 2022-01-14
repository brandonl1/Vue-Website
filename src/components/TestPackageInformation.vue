<!-- Displays information about Test Package -->
<template>
  <div class="container">
      <!-- "Test Package Information" page header -->
      <div style="padding-bottom:25px; padding-top:25px">
        <h1>Test Package Information</h1>
      </div>
      <div style="color=red">{{ errorMessage }}</div>
      <div>
        <b-card>
          <b-card-text>
              <strong>Test Package Name:</strong> {{ testPackageName }} <br>
              <strong>Number of Tests:</strong> {{ testPackageTests.length }}
          </b-card-text>
        </b-card>
      </div>
      <div style="padding-top:25px">
          <h5>Tests in this Test Package</h5>
      </div>
      <md-table v-model="testPackageTests">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="email">{{ item.testName }}</md-table-cell>
          <md-table-cell md-label="Test Type" md-sort-by="name">{{ item.testType }}</md-table-cell>
          <md-table-cell md-label="Destination IP Address" md-sort-by="phoneNumber">{{ item.proxyIP }}</md-table-cell>
        </md-table-row>
      </md-table>
  </div>
</template>

<script>
export default {
    name: 'TestPackageInformation',
    components: {
    },
    data() {
        return {
            errorMessage: "",
            testPackageId: "",
            testPackageName: "",
            testPackageTests: [],
        }
    },
    mounted () {
        // Get the Test Package ID from the route.
        const testPackageIdFromRoute = this.$route.params.testpackageid;
        // If there aren't any Clients, call getClients() in case the user went directly to this
        // link and the list of Clients has not been retrieved yet.
        if (this.$store.state.testPackages.length == 0) {
            this.$store.dispatch('getTestPackages');
        }
        
        // Get the Client by ID from the list of Clients stored in state.
        const results = this.$store.state.testPackages.filter( function(testPackage) {
            if (testPackage.testPackageId == testPackageIdFromRoute) {
                return testPackage;
            }
        });

        // Get the Client's information to display from the results above.
        // If there were no results, display an error.
        if (results && results.length > 0) {
            this.testPackageId = results[0].testPackageId;
            this.testPackageName = results[0].packageName;
            this.testPackageTests = results[0].testSettings;
        } else {
            this.errorMessage = "Error: Test Package does not exist."
        }
        // will also call a method to make a GET request to get the Test Package results for the Client.
    },
    props: {
    },
    methods: {
    }
}
</script>