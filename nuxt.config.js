const colors = require('vuetify/es5/util/colors').default

export default {
  mode: 'universal',
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
    '@/plugins/vue2-touch-events.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/firebase'],
  firebase: {
    config: {
      apiKey: "AIzaSyDLs3DwRPPGYB3E44xCjTjAO_BtPVO5SCk",
      authDomain: "moodtracking-a5513.firebaseapp.com",
      databaseURL: "https://moodtracking-a5513.firebaseio.com",
      projectId: "moodtracking-a5513",
      storageBucket: "moodtracking-a5513.appspot.com",
      messagingSenderId: "401126265609",
      appId: "1:401126265609:web:b078abe077b29f5d7b39d8"
    },
    services: {
      auth: true,
      /*auth: {
        persistence: 'local', // default

        // it is recommended to configure either a mutation or action but you can set both
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          // onAuthStateChangedAction: 'onAuthStateChangedAction'
        },

        ssr: false // default*/
      firestore: true,
    /*  functions: true,
      storage: true,
      realtimeDb: true,
      messaging: true,
      performance: true,
      analytics: true,
      remoteConfig: true*/
    }
  },
vuetify: {
  customVariables: ['~/assets/variables.scss'],
    theme:
  {
    dark: true,
      themes:
    {
      dark: {
        primary: colors.blue.darken2,
          accent:
        colors.grey.darken3,
          secondary:
        colors.amber.darken3,
          info:
        colors.teal.lighten1,
          warning:
        colors.amber.base,
          error:
        colors.deepOrange.accent4,
          success:
        colors.green.accent3
      }
    }
  }
}
,
/*
** Build configuration
*/
build: {
  /*
  ** You can extend webpack config here
  */
  extend(config, ctx)
  {
  }
}
}
