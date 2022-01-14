<template>
  <div class="container">
    <!-- "Manage Clients" page header -->
    <div style="padding-bottom:50px; padding-top:25px">
        <h1>Manage Clients</h1>
    </div>
    <div style="padding-bottom:25px">
        <b-row>
            <b-col>
                <!-- Search bar -->
                <b-input-group>
                    <!-- Activates search method when input in search bar changes -->
                    <b-form-input placeholder="Search..." @input="searchClients()" v-model="curSearch"></b-form-input>
                    <b-input-group-append>
                        <!-- search button, mostly aesthetic, but also activates search method when clicked -->
                        <b-button variant="outline-secondary" @click="searchClients()">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
            <b-col>
                <!-- Enroll new Client button, will redirect user to New Client page in the future -->
                <b-button variant="success" v-b-popover.hover.top="'This will redirect the user to the Enroll Clients page.'" title="Note" @click="goEnroll()">
                    <b-icon icon="plus-circle"></b-icon>
                    Enroll New Client
                </b-button>
            </b-col>
        </b-row>
    </div>
    <div>
        <!-- Client table, renders the filteredClients (Clients that meet current search criteria) -->
        <md-table v-model="filteredClients">
            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Name" md-sort-by="name"><router-link :to="`/clients/${item.clientId}`" class="nav-link">{{ item.clientName }}</router-link></md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.emailAddress }}</md-table-cell>
                <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
                <md-table-cell md-label="Last Time Test Package Run" md-sort-by="lastTimeTestPackageRun">{{item.lastTestPackageRunTime && item.lastTestPackageRunTime != '' ? item.lastTestPackageRunTime : '-'}}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
  </div>
</template>

<script>
import { MdTable } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue';
Vue.use(MdTable);

export default {
    name: 'ManageClients',
    components: {
    },
    data() {
        return {
            curSearch: "",
        }
    },
    computed: {
        filteredClients() {
            return this.searchClients();
        }
    },
    mounted () {
      var internal = this;

      // when the component mounts, query which Clients are associated with the Customer (user).
      this.$store.dispatch('getClients');

    },
    props: {
        searchVal: String
    },
    methods: {
        searchClients() {
            var internal = this;

            // make search lowercase so that it isn't case sensitive
            const searchString = internal.curSearch.toLowerCase();

            // If any part of the Client's name, email, or phone number match the search string, show them as a search result
            const results = this.$store.state.clients.filter( function(client) {
                if (client.clientName.toLowerCase().includes(searchString) || client.emailAddress.toLowerCase().includes(searchString) || client.phoneNumber.toLowerCase().includes(searchString)) {
                    return client;
                }
            });
            return results;
        },

        goEnroll() {
            this.$router.push({ path: '/register' });
        },
    }
}


</script>

<style>
</style>
