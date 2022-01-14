<template>
    <div class="container">
        <form>
            <h3>Registration</h3>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block" > 
                <router-link :to="{path: '/login'}">Sign Up</router-link>

            </button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{path: '/register'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
        signup(){
            this.$router.push({ path: '/testlist' });

        }
    }
}

</script>