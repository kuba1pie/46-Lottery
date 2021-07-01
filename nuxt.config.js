export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "lottery",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  target: "static",
  router: {
    base: "/46-Lottery/",
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@assets/style.sass"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/firebase.js", "~/plugins/fireauth.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],
  gtm: {
    id: "GTM-K3HZL8R",
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    "@nuxtjs/gtm",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    [
      "@nuxtjs/firebase",
      {
        config: process.env.GOOGLE_FIREBASE,
        services: {
          auth: true, // Just as example. Can be any other service.
          /*           auth: {
            persistence: "local", // default
            initialize: {
              onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
              onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false,
            },
            ssr: false, // default
            emulatorPort: 9099,
            emulatorHost: "http://localhost",
          }, */
          firestore: true,
          functions: true,
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
