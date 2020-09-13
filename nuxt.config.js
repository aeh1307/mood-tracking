const colors = require('vuetify/es5/util/colors').default

export default {
  mode: 'universal',
  components: true,
  target: 'server',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Manrope&family=Playfair+Display:wght@500&family=Roboto+Slab:wght@100;400&display=swap'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify.js',
    '@/plugins/vue-swipe.js',
    '@/plugins/vue2-touch-events.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/firebase'],
  firebase: {
    config: {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket:process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID
    },
    services: {
      auth: true,
      initialize: {
        onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        onAuthStateChangedAction: 'onAuthStateChangedAction',
      },
      ssr: {
        ignorePaths: [
          '/admin',
          /^api/
        ],
        serverLogin: true
      },
      firestore: true,
      workbox: {
        importScripts: [
        ],
        dev: false
      },
      storage: true
    }
  },
  vuetify: {
    theme: {
      light: true,
      themes:
        {
          light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            white: '#FEFEFE',
          }
        }
    }
  },
  /*
  ** Build configuration
  */
  build: {
  },
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  }
}
