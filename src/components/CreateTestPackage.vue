<!-- Component page for Test Package creation -->
<template>
  <div class="container">
    
    <!-- "Create New Test Package" page header -->
    <div style="padding-bottom:25px; padding-top:25px">
        <h1>Create New Test Package</h1>
    </div>

        <!-- Form Components -->
        <b-col cols="8">
            <!-- Test Package Name -->
            <div class="form-group" style="padding-bottom:10px">
                <label>Test Package Name</label>
                <b-form-input id="test-package-name-input" type="text" class="form-control form-control-md" v-model="testPackageName" aria-describedby="test-package-name-feedback" :state="testPackageNameValid" @input="validateTestPackageName()"/>
                <b-form-invalid-feedback id="test-package-name-feedback">{{ testPackageNameFeedback }}</b-form-invalid-feedback>
            </div>
        </b-col>

        <!-- Define Tests for Test Package -->
        <b-col cols="8">
            <div>
                <h4>Define Tests for Test Package</h4>
            </div>
            <b-card>
                <!-- Test Type form select -->
                <div class="form-group">
                    <label>Test Type</label>
                    <b-form-select id="test-type-select" v-model="selectedTestType" :options="testTypeOptions" :state="testTypeValid" @change="validateTestType()"></b-form-select>
                </div>
                <!-- Test Name input -->
                <div class="form-group">
                    <label>Test Name</label>
                    <b-form-input id="test-name-input" type="text" class="form-control form-control-md" v-model="testName" aria-describedby="test-name-feedback" :state="testNameValid" @input="validateTestName()"/>
                    <b-form-invalid-feedback id="test-name-feedback">{{ testNameFeedback }}</b-form-invalid-feedback>
                </div>
                <!-- Destination IP input -->
                <div class="form-group">
                    <label>Destination IP Address</label>
                    <b-form-input id="ip-address-input" type="text" class="form-control form-control-md" v-model="ipAddress" aria-describedby="ip-address-feedback" :state="ipAddressValid" @input="validateIpAddress"/>
                    <b-form-invalid-feedback id="ip-address-feedback">{{ ipAddressFeedback }}</b-form-invalid-feedback>
                </div>
                <div id="test-error-message" style="color:red">{{ defineTestErrorMessage }}</div>
                <b-button-toolbar style="padding-top:5px">
                    <!-- Add Button -->
                    <b-button-group>
                        <b-button id="add-button" variant="outline-success" size="sm" @click="onAddButtonClick()">
                            <b-icon icon="plus-circle"></b-icon>
                            Add
                        </b-button>
                    </b-button-group>
                    <!-- Clear Button -->
                    <b-button-group class="mx-1" size="sm">
                        <b-button id="clear-button" variant="outline-danger" @click="onClearButtonClick()">
                            Clear
                        </b-button>
                    </b-button-group>
                </b-button-toolbar>
            </b-card>
        </b-col>

        <!-- Tests in this Test Package table -->
        <b-col cols="8">
            <div style="padding-top:25px">
                <h4>Tests in this Test Package</h4>
            </div>
            <md-table v-model="definedTests">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Name" md-sort-by="email">{{ item.testName }}</md-table-cell>
                    <md-table-cell md-label="Test Type" md-sort-by="name">{{ item.testType }}</md-table-cell>
                    <md-table-cell md-label="Destination IP Address" md-sort-by="phoneNumber">{{ item.proxyIP }}</md-table-cell>
                    <md-table-cell><b-button size="sm" variant="outline-danger" @click="onRemoveButtonClick(item.testType, item.testName, item.proxyIP)"><b-icon icon="x"></b-icon> Remove</b-button></md-table-cell>
                </md-table-row>
            </md-table>
        </b-col>

        <!-- Buttons -->
        <div>
            <b-col cols="8">
            <!-- Error Message -->
            <div id="test-package-error-message" style="color:red;padding-top:10px">{{ errorMessage }}</div>
            <b-button-toolbar style="padding-top:10px;padding-bottom:50px">
                <!-- Enroll Button -->
                <b-button-group>
                    <b-button id="create-test-package" v-show="!loading" variant="success" @click="postNewTestPackage()">
                        <b-icon icon="plus-circle"></b-icon>
                        Create Test Package
                    </b-button>
                </b-button-group>
                <!-- Submitting spinner -->
                <b-button-group>
                    <b-button v-show="loading" variant="success" disabled>
                        <b-spinner small></b-spinner>
                        Submitting...
                    </b-button>
                </b-button-group>
                <!-- Cancel -->
                <b-button-group class="mx-1">
                    <b-button id="cancel-create-test-package" variant="danger" @click="cancelCreateTestPackage()" :disabled="loading">
                        Cancel
                    </b-button>
                </b-button-group>
            </b-button-toolbar>
            </b-col>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CreateTestPackage',
        data() {
            return {
                testPackageName: "",
                testName: "",
                ipAddress: "",
                loading: false,
                errorMessage: "",
                defineTestErrorMessage: "",
                testPackageNameValid: null,
                testPackageNameFeedback: "",
                testTypeValid: null,
                testNameValid: null,
                testNameFeedback: "",
                ipAddressValid: null,
                ipAddressFeedback: "",
                selectedTestType: null,
                testTypeOptions: [
                    { value: null, text: "Please select a test type." },
                    { value: "ping", text: "ping" },
                    { value: "traceroute", text: "traceroute" },
                    { value: "cURL", text: "cURL" },
                ],
                definedTests: [
                    { testType: "ping", testName: "Ping google.com", proxyIP: "142.251.33.110" },
                    { testType: "ping", testName: "Ping f5.com", proxyIP: "107.162.162.40" },
                ],
            }
        },
        methods: {
            postNewTestPackage() {
                var internal = this;
                this.validateTestPackageName();

                // if the input is valid, call the postClient mutation method.
                if (this.testPackageNameValid) {
                    
                    internal.loading = true;
                    internal.errorMessage = ""; // reset error message if there was one
                    
                    try { 
                        this.$store.dispatch ('postTestPackage', { packageName: internal.testPackageName, testSettings: internal.definedTests })
                        .then((status) => {
                            // check if status code indicates success or failure
                            if (status < 300) {
                                // create Toast to inform user that Test Package creation was successful
                                this.$root.$bvToast.toast('Test Package ' + internal.testPackageName + ' was successfully created.', {
                                    title: 'Success',
                                    variant: 'success',
                                });
                                // redirect user back to the Manage Test Package page if success
                                this.$router.push({ path: '/testpackages' });
                            } else {
                                // stay and note that there was an error if failure
                                internal.loading = false;
                                internal.errorMessage = "There was a problem creating this Test Package. Please try again.";
                            }
                        }).catch((error) => {
                            internal.loading = false;
                            internal.errorMessage = "There was a problem enrolling this Test Package. Please try again.";
                            console.log("ERROR:", error);
                        }
                        );
                    } catch (error) {
                        internal.loading = false;
                        internal.errorMessage = "There was a problem enrolling this Test Package. Please try again.";
                        console.log("ERROR:", error);
                    }
                } else {
                    // if there is invalid/missing input in form, indicate this to the user.
                    internal.errorMessage = "Please fill out the form as indicated above."
                }
            },
            cancelCreateTestPackage() {
                // return back to Manage Test Package page if user clicks Cancel
                this.$router.push({ path: '/testpackages' });
            },
            validateTestPackageName() {
                // validate that Test Package Name is at least 1 character and less than or equal to 100 characters
                if (this.testPackageName.length >= 1 && this.testPackageName.length <= 100) {
                    this.testPackageNameValid = true;
                    this.testPackageNameFeedback = "";
                } else if (this.testPackageName.length == 0) {
                    this.testPackageNameValid = false;
                    this.testPackageNameFeedback = "Please enter a name for the Test Package.";
                } else {
                    this.testPackageNameValid = false;
                    this.testPackageNameFeedback = "Test Package names are limited to 100 characters in length.";
                }
            },
            validateTestType() {
                // validate that a Test Type is selected.
                if (this.selectedTestType != null) {
                    this.testTypeValid = true;
                } else {
                    this.testTypeValid = false;
                }
            },
            validateTestName() {
                // validate that test name is at least 1 character and less than or equal to 100 characters
                if (this.testName.length >= 1 && this.testName.length <= 100) {
                    this.testNameValid = true;
                    this.testNameFeedback = "";
                } else if (this.testName.length == 0) {
                    this.testNameValid = false;
                    this.testNameFeedback = "Please enter a name for the test.";
                } else {
                    this.testNameValid = false;
                    this.testNameFeedback = "Test names are limited to 100 characters in length.";
                }
            },
            validateIpAddress() {
                // validate that destination IP address is at least 7 characters (ex: 8.8.8.8) and less than or equal to 39 characters (for IPv6)
                if (this.ipAddress.length >= 7 && this.ipAddress.length <= 39) {
                    this.ipAddressValid = true;
                    this.ipAddressFeedback = "";
                } else {
                    this.ipAddressValid = false;
                    this.ipAddressFeedback = "Please enter a valid IP address.";
                } 
            },
            onClearButtonClick() {
                // clear out input, valid states, and current feedback.
                this.selectedTestType = null;
                this.testName = "";
                this.ipAddress = "";
                this.testNameValid = null;
                this.ipAddressValid = null;
                this.testTypeValid= null;
                this.testNameFeedback = "";
                this.ipAddressFeedback = "";
            },
            onAddButtonClick() {
                this.defineTestErrorMessage = "";
                
                // make sure that all inputs are valid.
                this.validateTestType();
                this.validateTestName();
                this.validateIpAddress();

                // if all the inputs are valid, add the test to the list of tests for this Test Package.
                if (this.testTypeValid && this.testNameValid && this.ipAddressValid) {
                    const newTest = { testType: this.selectedTestType, testName: this.testName, proxyIP: this.ipAddress };
                    this.definedTests.push(newTest);
                    this.onClearButtonClick(); // clear out the input after it has been added to the list.
                } else {
                    this.defineTestErrorMessage = "Please fill out the form as indicated above."
                }
                
            },
            onRemoveButtonClick(testType, testName, ipAddress) {
                let done = false;

                // filter out the first result that matches what the user wants to remove.
                const results = this.definedTests.filter( function(test) {
                    if ((!done) && (test.testType == testType) && (test.testName == testName) && (test.proxyIP == ipAddress)) {
                        done = true;
                    } else {
                        return test;
                    }
                })

                this.definedTests = results;
            },
        },
    }
</script>