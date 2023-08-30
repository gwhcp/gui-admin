export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: 'preload',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css',
                    as: 'style'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css'
                }
            ],
            script: [
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js'
                }
            ]
        }
    },
    auth: {
        baseURL: process.env.NUXT_PUBLIC_API_URL,
        globalAppMiddleware: {
            allow404WithoutAuth: true,
            isEnabled: true
        },
        isEnabled: true,
        provider: {
            endpoints: {
                getSession: { path: '/login/profile', method: 'get' },
                signIn: { path: '/dj-rest-auth/api-token-auth/', method: 'post' },
                signOut: { path: '/dj-rest-auth/logout/', method: 'post' }
            },
            pages: {
                login: '/auth'
            },
            token: {
                headerName: 'Authorization',
                maxAgeInSeconds: 21600,
                signInResponseTokenPointer: '/token/key',
                type: 'Token'
            },
            type: 'local'
        },
        session: {
            enableRefreshOnWindowFocus: true,
            enableRefreshPeriodically: false
        }
    },
    build: {
        transpile: [
            'ag-grid-vue'
        ]
    },
    dayjs: {
        plugins: [
            'customParseFormat',
            'timezone',
            'utc'
        ]
    },
    devtools: {
        enabled: true
    },
    gtag: {
        id: process.env.NUXT_PUBLIC_GOOGLE_TAG,
        loadingStrategy: 'defer'
    },
    modules: [
        '@nuxtjs/robots',
        '@sidebase/nuxt-auth',
        '@vee-validate/nuxt',
        'dayjs-nuxt',
        'nuxt-gtag',
        'nuxt-simple-sitemap'
    ],
    runtimeConfig: {
        public: {
            api_title: process.env.NUXT_PUBLIC_API_TITLE,
            api_url: process.env.NUXT_PUBLIC_API_URL,
            gui_url: process.env.NUXT_PUBLIC_GUI_URL
        }
    },
    site: {
        url: process.env.NUXT_PUBLIC_GUI_URL
    },
    sitemap: {
        credits: false,
        exclude: [
            '/auth/**',
            '/billing/**',
            '/company/**',
            '/employee/**',
            '/hardware/**',
            '/network/**',
            '/setting/**',
            '/store/**'
        ],
        sitemapName: 'sitemap.xml',
        xslTips: false
    },
    veeValidate: {
        autoImports: true
    }
});
