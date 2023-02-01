import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://rzkyif.github.io',
  base: '/components',
  integrations: [tailwind(), react()],
  vite: {
    plugins: [
      Icons({
        compiler: 'jsx', jsx: 'react'
      })
    ]
  }
});