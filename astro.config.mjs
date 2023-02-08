import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import Icons from "unplugin-icons/vite";
import critters from "astro-critters";
import compress from "astro-compress";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://rzkyif.github.io',
  base: '/components',
  integrations: [tailwind(), react(), critters(), compress(), svelte()],
  vite: {
    plugins: [
      Icons({
        compiler: 'jsx',
        jsx: 'react'
      }),
      Icons({
        compiler: 'svelte'
      }),
      Icons({
        compiler: 'astro'
      })
    ]
  }
});