// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  fonts: [{
    provider: fontProviders.local(),
    name: "Pencerio",
    cssVariable: "--font-pencerio",
    options: {
      variants: [{
        src: 
        [
            './src/assets/fonts/pencerio/Pencerio-Hairline.woff2',
            './src/assets/fonts/pencerio/Pencerio-Hairline.woff',
            './src/assets/fonts/pencerio/Pencerio-Hairline.ttf'
        ],
        weight: '50',
        style: 'normal'
      }]
    }
  }]
});