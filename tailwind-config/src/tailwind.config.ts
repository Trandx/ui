import type { Config } from 'tailwindcss/types';

import formsPlugin from '@tailwindcss/forms';
import scrollbarPlugin from 'tailwind-scrollbar';
import {
  animation,
  keyframes,
  screens,
  colors,
  fontFamily,
} from './css/tailwindcss'; // Adjust path as necessary

// Export the full Tailwind configuration
const tailwindConfig: Config = {
  content: [],
  theme: {
    extend: {
      keyframes,
      animation,
      screens,
      colors,
      fontFamily,
    },
  },
  plugins: [
    formsPlugin,
    scrollbarPlugin({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
  ],
};

export { tailwindConfig };
