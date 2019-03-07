<template>
    <section class="container mt-5">
        <div class="row">
            <div class="offset-md-2 col-md-8">
                <div class="card card-active mb-2" @click="goEdit(item.id)" :key="item.id" v-for="item in projects">
                    <div class="card-body row">
                            <div class="col-2">
                                <img :src="item.logo_url" :alt="item.name" width="100%" v-if="item.logo_url">
                                <div class="circle">{{getLetters(item.name)}}</div>
                            </div>
                            <div class="col-3 pt-3">
                                <b>{{item.name}}</b>
                            </div>
                            <div class="col-3 pt-3">
                                <b v-if="item.is_active" class="text-success">Active</b>
                                <b v-if="!item.is_active" class="text-danger">Inactive</b>
                            </div>
                            <div class="col-2">
                                <div>time this week</div>
                                <div>this months</div>
                                <div>total</div>
                            </div>
                            <div class="col-2 font-weight-bold">
                                <div>{{parseTime(item.spent_time_week)}}</div>
                                <div>{{parseTime(item.spent_time_month)}}</div>
                                <div>{{parseTime(item.spent_time_all)}}</div>
                            </div>
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

        asyncData({$axios}) {
            return $axios.get('projects-manage/index')
                .then((response) => {
                    return {
                        projects: response.data.projects
                    }
                })
        },

        computed: {
            ...mapGetters(['isAuthenticated']),
        },

        methods: {
            parseTime: parseTime,
            goEdit: goEdit,
            getLetters: getLetters
        }
    };

    function parseTime(secs) {
        let t = new Date(1970, 0, 1);
        t.setSeconds(secs);
        return `${('0' + t.getHours()).slice(-2)}:${('0' + t.getMinutes()).slice(-2)}:${('0' + t.getSeconds()).slice(-2)}`;
    }

    function goEdit(id) {
        this.$router.push(`/projects/${id}`);
    }

    function getLetters(name) {
        let words = name.split(' ');
        let letters = '';

        words.forEach((l) => letters += l[0].toUpperCase());

        return letters;
    }
</script>
