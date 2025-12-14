import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/main.css"],
  devServer: {
    port: 5173,
  },
  devtools: { enabled: true },
  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  pages: true,
  ui: {
    prefix: "Nuxt",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
