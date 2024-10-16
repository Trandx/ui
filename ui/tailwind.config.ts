/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

import { tailwindConfig } from "@package/tailwind-config"

///######## make custom color ########//

// tailwind.theme.colors = {
//  ...tailwind.theme.colors,
//     primary: {
//       '50':  '#71FFFB',
//       '100': '#5CFFFB',
//       '200': '#9be6e6',
//       '300': '#61cbc8',
//       '400': '#00b8b3',
//       '500': '#1c907c',
//       '600': '#197963',
//       '700': '#175d4d',
//       '800': '#123f39',
//       '900': '#0c272a',
//     },
// }


export default {
  presets: [tailwindConfig], // Use the shared config as a preset
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    //  "./node_modules/flowbite/**/*.js"
  ],
} as Config
