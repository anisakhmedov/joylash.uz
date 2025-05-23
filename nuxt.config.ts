// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  router: {
    base: '/'
  },
  css: ['~/assets/css/style.css', 'leaflet/dist/leaflet.css'],
  target: 'static',
  app: {
    head: {
      title: 'Joylash,uz', // default fallback title
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          src: 'https://api-maps.yandex.ru/2.1/?apikey=a82d324e-b1dc-4510-b1f8-782e0913094e&lang=ru_RU',
          async: true
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],
  sitemap: {
    hostname: 'https://example.com',
    routes: [
      '/products/1',
      '/products/2',
      // или использовать auto-discovery
    ]
  },
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
  },
  // build: {
  //   transpile: ['leaflet']
  // },

  // vite: {
  //   assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
  //   optimizeDeps: {
  //     include: ['leaflet']
  //   }
  // }
});