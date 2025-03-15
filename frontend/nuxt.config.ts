// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  css: ["~/styles/global.scss"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BaseUrl: process.env.BASE_URL ?? "http://localhost:3000",
      ServiceDomain: process.env.SERVICE_DOMAIN ?? "http://localhost:8080",
    },
  },
  nitro: {
    preset: "static",
  }
})
