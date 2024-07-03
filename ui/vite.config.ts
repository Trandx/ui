import { UserConfig, defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
//import VueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from "url";
import { exec } from "child_process";
//import dts from "vite-plugin-dts";

// https://vitejs.dev/config/

// const env_data = (env: any) => ({
//   __APP_NAME__: env.VITE_APP_NAME,
//   __APP_DOMAINE__: env.VITE_APP_DOMAINE,
//   __APP_PORT__: env.VITE_APP_PORT,
//   __APP_BASE_URL__: env.VITE_APP_BASE_URL,
//   __APP_API_DOMAINE__: env.VITE_API_DOMAINE,
//   __APP_API_PORT__: env.VITE_API_PORT,
//   __APP_API_BASE_URL__: env.VITE_API_BASE_URL,
//   __APP_API_RESSOURCE__: env.VITE_API_RESSOURCE,
//   __APP_FAKER_API_RESSOURCE__: env.VITE_FAKER_API_RESSOURCE,
// });

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  //console.log(mode, command, +env.VITE_APP_PORT);
  const basePath = fileURLToPath(new URL("./src", import.meta.url));
  const config: UserConfig = {
    plugins: [
      Vue({
        script: {
          // defineModel: true,
          // propsDestructure: true,
        },
      }),
      //VueJsx(), // if needed
    ],
    resolve: {
      alias: {
        //"@": resolve(__dirname, "src"),
        // '@': path.resolve(__dirname, './src'),
        "@": basePath,
      },
    },
    esbuild: {
      //drop: ['console', 'debugger'],
    },
    build: {
      minify: "esbuild",
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: basePath,
        name: "NuclexUi",
        formats: ["es", /*"cjs", "umd", "iife"*/],
        //fileName: (format) => `index.${format}.js`,
        fileName: "index",
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue", "vue-router"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
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
      port: +env.VITE_APP_PORT,
    },
    preview: {
      host: true,
      port: +env.VITE_APP_PORT,
    },
  };

  //console.log(command, process.argv, process.argv[3] === "--watch");

  if (command === "build" && process.argv[3] && process.argv[3] === "--watch") {
    exec("npm run types:watch");

    config.build.watch = {
      include: ["src/**"],
      clearScreen: true,
    };
  }

  return {
    ...config,
  };
});
