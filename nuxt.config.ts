import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/icon", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: "$ui",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      PRODUCTS_URL: process.env.PUBLIC_PRODUCTS_URL || "",
      CHECKOUT_URL: process.env.PUBLIC_CHECKOUT_URL || "",
    },
  },
});
