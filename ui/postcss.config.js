//import { tailwindConfig as config } from "@package/tailwind-config";

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    },
  },
}
