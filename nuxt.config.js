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
    '@/plugins/apexcharts.js',
    { src: '~/plugins/auth-cookie', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  serverMiddleware: ['~/serverMiddleware/validateFirebaseIdToken'],

  /*
  ** Nuxt.js modules
  */
  // modules: ['@nuxtjs/firebase'],
  // firebase: {
    /*config: {
      apiKey: "AIzaSyDLs3DwRPPGYB3E44xCjTjAO_BtPVO5SCk",
      authDomain: "moodtracking-a5513.firebaseapp.com",
      databaseURL: "https://moodtracking-a5513.firebaseio.com",
      projectId: "moodtracking-a5513",
      storageBucket: "moodtracking-a5513.appspot.com",
      messagingSenderId: "401126265609",
      appId: "1:401126265609:web:b078abe077b29f5d7b39d8",
    },*/
   /* services: {
      auth: true,
      // or
      /!*    auth: {
            persistence: 'local', // default
    *!/
      // it is recommended to configure either a mutation or action but you can set both
      initialize: {
        onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        onAuthStateChangedAction: 'onAuthStateChangedAction',
      },
      ssr: {
        // nuxt aliases are supported
        credential: '~/secrets/serviceAccount.json',

        // The service worker session automatically ignores external resources, static files and HMR calls
        // If you need to ignore additional routes, define them here
        ignorePaths: [
          '/admin', // path is ignored if url.pathname.startsWith('/admin')
          /^api/ // path is ignored if url.pathname without the leading slash (/) matches the RegExp
        ],
        serverLogin: true
      },
      firestore: true,
      workbox: {
        importScripts: [
          '/firebase-auth-sw.js'
        ],
        dev: false
      },
      storage: true
    }*/
  // },
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
