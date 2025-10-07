import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  plugins: [
    vue(),
    removeConsole(),
    AutoImport({
      dts: "./auto-imports.d.ts",
      imports: ["vue", "@vueuse/head", "@vueuse/core", "pinia"],
      dirs: ["src/services"],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
