<template>
    <section class="container mt-5">
        <div class="row">
            <div class="offset-md-3 col-md-6">
                <div class="card mb-2">
                    <div class="card-body">
                        <form method="post" @submit.prevent="save" class="row">
                            <div class="col-4 pt-2">Name</div>
                            <div class="col-8">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="project.name" :class="{ 'is-invalid': !project.name }">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-outline-secondary" :disabled="!project.name">Save</button>
                                    </div>
                                    <div class="invalid-feedback">
                                        Name is required
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        middleware: 'auth',

        asyncData({$axios, params}) {
            return $axios.get(`projects-manage/${params.id}`)
                .then((response) => {
                    return {
                        project: response.data.project
                    }
                })
        },

        computed: {
            ...mapGetters(['isAuthenticated']),
        },

        methods: {
            save: save
        }
    };

    function save() {
        this.$axios.post('projects-manage/update', this.project, {
            params: {
                id: this.project.id
            }
        })
            .then(() => {
                this.$router.push('/');
            })
    }
</script>
