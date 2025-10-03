import vueDevTools from "vite-plugin-vue-devtools"
import { defineConfig, loadEnv, type UserConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "url"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const basePath = fileURLToPath(new URL("./src", import.meta.url))
  const entryFile = fileURLToPath(new URL("./src/index.ts", import.meta.url))

  const config: UserConfig = {
    base: env.VITE_APP_BASE_URL || "/",
    plugins: [
      Vue({
        script: {
          // defineModel: true,
          // propsDestructure: true,
        },
      }),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": basePath,
      },
    },
    esbuild: {
      drop: ["console", "debugger"], // ⚡ enlève console.log et debugger en prod
    },
    build: {
      minify: "esbuild",
      lib: {
        entry: entryFile,
        name: "NuclexUi",
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        external: ["vue", "vue-router"],
        output: {
          globals: {
            vue: "Vue",
            "vue-router": "VueRouter",
          },
        },
        watch: false,
      },
      outDir: "dist/lib",
    },
    server: {
      host: true,
      port: Number(env.VITE_APP_PORT) || 5173,
    },
    preview: {
      host: true,
      port: Number(env.VITE_APP_PORT) || 4173,
    },
  }

  return config
})
