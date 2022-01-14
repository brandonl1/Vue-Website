 
<template>
    <div class="container">
        <h3 class="p-3 text-center">Customer Test List</h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Customer Username</th>
                    <th>Associated Test Package</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{user.CustomerID}}</td>
                    <td>{{user.CustomerName}}</td>
                    <td>{{user.Test}}</td>
                </tr>
            </tbody>
        </table>
        
    </div>    
</template>

<script>
import { MdTable } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue';
Vue.use(MdTable);
export default {
     name: 'ManageTestPackages',
    components: {
    },

    data() {
        return {
            users: [
                
                { CustomerID: 'e119dc46-0dc6-423c-a6d9-03cc02ed360b', CustomerName: 'Bluy', Test: 'Test Package 2'},
                { CustomerID: 'bd406c65-9bfd-422a-a120-c1d32121ef91', CustomerName: 'Thomas Glouner', Test: 'Test Package 1' },
                { CustomerID: 'bd406c65-9bfd-422a-a120-c1d32121ef91', CustomerName: 'Gabbagool', Test: 'Test Package 1' },
                { CustomerID: '63502310-44a1-4f0c-827a-1dbc09248d68', CustomerName: 'Josh', Test: 'Test Package 2'}
                
               /*
                {CustomerID: '', CustomerName: '', Test: ''},
                */

            ]
        }
    },


    mounted() {
         // Get the client ID from the route.
        const customerIDRoute = this.$route.params.customerId;

        //get customers if no list of customers or no customers existing
         if (this.$authlocal.state.customers.length == 0) {
            this.$authlocal.dispatch('getCustomers');
         }

        
        // return customer UUID, from stored customers 
        //borrowed from Maya's "ClientInformation.vue"
         const resultID = this.$authlocal.state.customers(function(customer)
         {
             if(customer.CustomerID == customerIDRoute){
                 return customer;
             }
         });
         
         //return customer information in results table
         if (resultID && result.length > 0)
         {
             this.CustomerID = resultID[0].CustomerID;
             this.CustomerName = resultID[0].CustomerName;
             this.Test = resultID[0].Test;
             
         }



    },

    methods: {
       
        },

};
</script>