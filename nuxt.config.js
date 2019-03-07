module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'nuxt-auth',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Nuxt.js project'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {
                rel: 'stylesheet',
                href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            }
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    css: [
        // CSS file in the project
        '@/assets/css/main.css',
        // SCSS file in the project
        '@/assets/css/main.scss'
    ],

    modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

    axios: {
        baseURL: 'https://api.quwi.com/v2'
    },

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {url: 'auth/login', method: 'post', propertyName: 'token'},
                    logout: {url: 'auth/logout', method: 'post'},
                    user: {url: 'users/profile', method: 'get', propertyName: 'user'},
                    tokenRequired: true,
                    tokenType: 'Bearer'
                },
                redirect: {
                    login: '/login',
                    logout: '/',
                    user: '/home',
                    callback: ''
                }
            }
        }
    }
};
