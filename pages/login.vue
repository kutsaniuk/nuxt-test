<template>
    <section class="container mt-5">
        <div class="row">
            <div class="offset-md-4 col-md-4">
                <div class="card-login mt-5">
                    <div class="card-body">
                        <h5 class="text-uppercase"><b>Login</b></h5>
                        <form method="post" @submit.prevent="login" @keyup="showError = true">
                            <div class="form-group">
                                <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        placeholder="Email"
                                        v-model="email"
                                        :class="{ 'is-invalid': showError && !email }">
                                <div class="invalid-feedback">
                                    Email is required
                                </div>
                            </div>
                            <div class="form-group">
                                <input
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        placeholder="Password"
                                        v-model="password"
                                        :class="{ 'is-invalid': showError && !password }"
                                >
                                <div class="invalid-feedback">
                                    Password is required
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary" :disabled="!email || !password">Login</button>
                        </form>
                    </div>
                </div>

                <Notification :message="error" v-if="error"/>
            </div>
        </div>
    </section>
</template>

<script>
    import Notification from '~/components/Notification';

    export default {
        middleware: 'guest',

        components: {
            Notification,
        },

        data() {
            return {
                email: '',
                password: '',
                error: null,
                showError: false
            };
        },

        methods: {
            async login() {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.email,
                            password: this.password,
                        },
                    });

                    this.$router.push('/');
                } catch (e) {
                    this.error = e.response.data.first_errors.email;
                }
            },
        },
    };
</script>

