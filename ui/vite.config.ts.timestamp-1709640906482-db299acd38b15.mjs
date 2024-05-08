// vite.config.ts
import { defineConfig, loadEnv } from "file:///home/trandx/dev/Nucle-x/sso/_mono/node_modules/.pnpm/vite@4.5.2_@types+node@20.11.24/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/trandx/dev/Nucle-x/sso/_mono/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.2_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { fileURLToPath } from "url";
import { exec } from "child_process";
var __vite_injected_original_import_meta_url = "file:///home/trandx/dev/Nucle-x/sso/_mono/packages/ui/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
  const config = {
    plugins: [
      Vue({
        script: {
          // defineModel: true,
          // propsDestructure: true,
        }
      })
      //VueJsx(), // if needed
    ],
    resolve: {
      alias: {
        //"@": resolve(__dirname, "src"),
        // '@': path.resolve(__dirname, './src'),
        "@": basePath
      }
    },
    build: {
      minify: "esbuild",
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: basePath,
        name: "NuclexUi",
        formats: ["es", "cjs", "umd", "iife"],
        //fileName: (format) => `index.${format}.js`,
        fileName: "index"
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
            "vue-router": "VueRouter"
          }
        },
        watch: false
      },
      outDir: "dist/lib"
    },
    server: {
      host: true,
      port: +env.VITE_APP_PORT
    },
    preview: {
      host: true,
      port: +env.VITE_APP_PORT
    }
  };
  if (command === "build" && process.argv[3] && process.argv[3] === "--watch") {
    exec("npm run types:watch");
    config.build.watch = {
      include: ["src/**"],
      clearScreen: true
    };
  }
  return {
    ...config
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90cmFuZHgvZGV2L051Y2xlLXgvc3NvL19tb25vL3BhY2thZ2VzL3VpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS90cmFuZHgvZGV2L051Y2xlLXgvc3NvL19tb25vL3BhY2thZ2VzL3VpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3RyYW5keC9kZXYvTnVjbGUteC9zc28vX21vbm8vcGFja2FnZXMvdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IFZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG4vL2ltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwidXJsXCI7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcbi8vaW1wb3J0IGR0cyBmcm9tIFwidml0ZS1wbHVnaW4tZHRzXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5cbi8vIGNvbnN0IGVudl9kYXRhID0gKGVudjogYW55KSA9PiAoe1xuLy8gICBfX0FQUF9OQU1FX186IGVudi5WSVRFX0FQUF9OQU1FLFxuLy8gICBfX0FQUF9ET01BSU5FX186IGVudi5WSVRFX0FQUF9ET01BSU5FLFxuLy8gICBfX0FQUF9QT1JUX186IGVudi5WSVRFX0FQUF9QT1JULFxuLy8gICBfX0FQUF9CQVNFX1VSTF9fOiBlbnYuVklURV9BUFBfQkFTRV9VUkwsXG4vLyAgIF9fQVBQX0FQSV9ET01BSU5FX186IGVudi5WSVRFX0FQSV9ET01BSU5FLFxuLy8gICBfX0FQUF9BUElfUE9SVF9fOiBlbnYuVklURV9BUElfUE9SVCxcbi8vICAgX19BUFBfQVBJX0JBU0VfVVJMX186IGVudi5WSVRFX0FQSV9CQVNFX1VSTCxcbi8vICAgX19BUFBfQVBJX1JFU1NPVVJDRV9fOiBlbnYuVklURV9BUElfUkVTU09VUkNFLFxuLy8gICBfX0FQUF9GQUtFUl9BUElfUkVTU09VUkNFX186IGVudi5WSVRFX0ZBS0VSX0FQSV9SRVNTT1VSQ0UsXG4vLyB9KTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICAvL2NvbnNvbGUubG9nKG1vZGUsIGNvbW1hbmQsICtlbnYuVklURV9BUFBfUE9SVCk7XG4gIGNvbnN0IGJhc2VQYXRoID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSk7XG4gIGNvbnN0IGNvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICBWdWUoe1xuICAgICAgICBzY3JpcHQ6IHtcbiAgICAgICAgICAvLyBkZWZpbmVNb2RlbDogdHJ1ZSxcbiAgICAgICAgICAvLyBwcm9wc0Rlc3RydWN0dXJlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICAvL1Z1ZUpzeCgpLCAvLyBpZiBuZWVkZWRcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIC8vXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICAgICAgLy8gJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgXCJAXCI6IGJhc2VQYXRoLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxuICAgICAgbGliOiB7XG4gICAgICAgIC8vIENvdWxkIGFsc28gYmUgYSBkaWN0aW9uYXJ5IG9yIGFycmF5IG9mIG11bHRpcGxlIGVudHJ5IHBvaW50c1xuICAgICAgICBlbnRyeTogYmFzZVBhdGgsXG4gICAgICAgIG5hbWU6IFwiTnVjbGV4VWlcIixcbiAgICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIiwgXCJ1bWRcIiwgXCJpaWZlXCJdLFxuICAgICAgICAvL2ZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaW5kZXguJHtmb3JtYXR9LmpzYCxcbiAgICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0byBleHRlcm5hbGl6ZSBkZXBzIHRoYXQgc2hvdWxkbid0IGJlIGJ1bmRsZWRcbiAgICAgICAgLy8gaW50byB5b3VyIGxpYnJhcnlcbiAgICAgICAgZXh0ZXJuYWw6IFtcInZ1ZVwiLCBcInZ1ZS1yb3V0ZXJcIl0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIFVNRCBidWlsZFxuICAgICAgICAgIC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgIHZ1ZTogXCJWdWVcIixcbiAgICAgICAgICAgIFwidnVlLXJvdXRlclwiOiBcIlZ1ZVJvdXRlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHdhdGNoOiBmYWxzZSxcbiAgICAgIH0sXG5cbiAgICAgIG91dERpcjogXCJkaXN0L2xpYlwiLFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiB0cnVlLFxuICAgICAgcG9ydDogK2Vudi5WSVRFX0FQUF9QT1JULFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIHBvcnQ6ICtlbnYuVklURV9BUFBfUE9SVCxcbiAgICB9LFxuICB9O1xuXG4gIC8vY29uc29sZS5sb2coY29tbWFuZCwgcHJvY2Vzcy5hcmd2LCBwcm9jZXNzLmFyZ3ZbM10gPT09IFwiLS13YXRjaFwiKTtcblxuICBpZiAoY29tbWFuZCA9PT0gXCJidWlsZFwiICYmIHByb2Nlc3MuYXJndlszXSAmJiBwcm9jZXNzLmFyZ3ZbM10gPT09IFwiLS13YXRjaFwiKSB7XG4gICAgZXhlYyhcIm5wbSBydW4gdHlwZXM6d2F0Y2hcIik7XG5cbiAgICBjb25maWcuYnVpbGQud2F0Y2ggPSB7XG4gICAgICBpbmNsdWRlOiBbXCJzcmMvKipcIl0sXG4gICAgICBjbGVhclNjcmVlbjogdHJ1ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb25maWcsXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBcUIsY0FBYyxlQUFlO0FBQzlXLE9BQU8sU0FBUztBQUVoQixTQUFTLHFCQUFxQjtBQUM5QixTQUFTLFlBQVk7QUFKK0ssSUFBTSwyQ0FBMkM7QUFxQnJQLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFFBQU0sV0FBVyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFDaEUsUUFBTSxTQUFxQjtBQUFBLElBQ3pCLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLFFBQVE7QUFBQTtBQUFBO0FBQUEsUUFHUjtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUEsSUFFSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUE7QUFBQSxRQUdMLEtBQUs7QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsS0FBSztBQUFBO0FBQUEsUUFFSCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTLENBQUMsTUFBTSxPQUFPLE9BQU8sTUFBTTtBQUFBO0FBQUEsUUFFcEMsVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsUUFHYixVQUFVLENBQUMsT0FBTyxZQUFZO0FBQUEsUUFDOUIsUUFBUTtBQUFBO0FBQUE7QUFBQSxVQUdOLFNBQVM7QUFBQSxZQUNQLEtBQUs7QUFBQSxZQUNMLGNBQWM7QUFBQSxVQUNoQjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFFQSxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxDQUFDLElBQUk7QUFBQSxJQUNiO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNLENBQUMsSUFBSTtBQUFBLElBQ2I7QUFBQSxFQUNGO0FBSUEsTUFBSSxZQUFZLFdBQVcsUUFBUSxLQUFLLENBQUMsS0FBSyxRQUFRLEtBQUssQ0FBQyxNQUFNLFdBQVc7QUFDM0UsU0FBSyxxQkFBcUI7QUFFMUIsV0FBTyxNQUFNLFFBQVE7QUFBQSxNQUNuQixTQUFTLENBQUMsUUFBUTtBQUFBLE1BQ2xCLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxFQUNMO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
