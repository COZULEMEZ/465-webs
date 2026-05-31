import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { resolve, dirname } from 'node:path'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        kurum: resolve(rootDir, 'kurum.html'),
        hizmetler: resolve(rootDir, 'hizmetler.html'),
        surec: resolve(rootDir, 'surec.html'),
        mevzuat: resolve(rootDir, 'mevzuat.html'),
        sss: resolve(rootDir, 'sss.html'),
        tescil: resolve(rootDir, 'tescil.html'),
        iletisim: resolve(rootDir, 'iletisim.html'),
        cozumMuzik: resolve(rootDir, 'cozum-muzik.html'),
        cozumYazilim: resolve(rootDir, 'cozum-yazilim.html'),
        cozumDijital: resolve(rootDir, 'cozum-dijital.html'),
        eserBildir: resolve(rootDir, 'eser-bildir.html'),
        rehberEser: resolve(rootDir, 'rehber-eser.html'),
        privacy: resolve(rootDir, 'privacy.html'),
        legal: resolve(rootDir, 'legal.html'),
        thanks: resolve(rootDir, 'thanks.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
