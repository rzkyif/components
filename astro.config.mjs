import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
import critters from "astro-critters";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://rzkyif.github.io',
  base: '/components',
  integrations: [tailwind(), react(), critters(), compress()],
  vite: {
    plugins: [Icons({
      compiler: 'jsx',
      jsx: 'react'
    })]
  }
});