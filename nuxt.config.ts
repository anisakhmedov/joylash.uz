// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: ['~/assets/css/index.css', 'leaflet/dist/leaflet.css'],
  app: {
    head: {
      title: 'Joylash,uz', // default fallback title
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  modules: ['@nuxtjs/i18n'],
  plugins: ['~/plugins/axios.ts'],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:6000/',
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'uz', name: 'Uzbek', file: 'uz.json' },
      { code: 'ru', name: 'Russia', file: 'ru.json' }
    ]
  }
})