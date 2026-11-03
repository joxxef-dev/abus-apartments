import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createReadStream, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = dirname(fileURLToPath(import.meta.url))
const imageDirectory = resolve(projectDirectory, 'images')
const outputImageDirectory = resolve(projectDirectory, 'dist', 'images')
const imageAliases = {
  'exterior-dusk.jpg': 'images (7).jpg',
  'lounge-minimal.jpg': '2e84802c034a925ad661fbbe2c565ccca02aaef8.jpg',
  'penthouse-master.jpg': 'ba58c91919ae99e3d331fe668c427da8955b1464.jpg',
  'amenities-grid.jpg': 'images (2).jpg',
  'logo.png': 'logo.png',
}

function serveLocalImageAliases() {
  return {
    name: 'serve-abus-local-image-aliases',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const filename = request.url?.split('?')[0]?.replace(/^\/images\//, '')
        const source = filename && Object.prototype.hasOwnProperty.call(imageAliases, filename)
          ? imageAliases[filename]
          : null
        if (!source) {
          next()
          return
        }

        const sourcePath = resolve(imageDirectory, source)
        if (!existsSync(sourcePath)) {
          next(new Error(`Missing local image: ${sourcePath}`))
          return
        }

        response.setHeader('Content-Type', source.endsWith('.png') ? 'image/png' : 'image/jpeg')
        const stream = createReadStream(sourcePath)
        stream.on('error', next)
        stream.pipe(response)
      })
    },
  }
}

function copyLocalImageAliases() {
  return {
    name: 'copy-abus-local-image-aliases',
    apply: 'build',
    closeBundle() {
      const missing = Object.entries(imageAliases).filter(([, source]) => !existsSync(resolve(imageDirectory, source)))
      if (missing.length) {
        throw new Error(`Missing local images in ${imageDirectory}: ${missing.map(([alias, source]) => `${alias} → ${source}`).join(', ')}`)
      }

      mkdirSync(outputImageDirectory, { recursive: true })
      for (const [alias, source] of Object.entries(imageAliases)) {
        copyFileSync(resolve(imageDirectory, source), resolve(outputImageDirectory, alias))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/abus-apartments/' : '/',
  plugins: [react(), serveLocalImageAliases(), copyLocalImageAliases()],
})
