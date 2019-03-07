<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAuthenticated">
        <div class="container">
            <nuxt-link class="navbar-brand" to="/">Q</nuxt-link>
            <form class="form-inline">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <nuxt-link class="nav-link text-uppercase" to="/">Projects</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-uppercase" href="#" @click="logout">Logout</a>
                    </li>
                </ul>
            </form>
        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['isAuthenticated', 'loggedInUser']),
        },

        methods: {
            async logout() {
                await this.$auth.logout();
                this.$router.push('/login');
            },
        },
    };
</script>

