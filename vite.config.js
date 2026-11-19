import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const apiRoutes = ['news', 'contact']

// Jalankan handler serverless di folder /api saat `npm run dev`.
// Tanpa ini Vite menyajikan file api/*.js sebagai modul JS, bukan JSON,
// sehingga halaman /berita gagal memuat data.
function localApiPlugin() {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url || '').split('?')[0].replace(/^\/+/, '')
        if (!apiRoutes.includes(name)) return next()

        res.status = (code) => {
          res.statusCode = code
          return res
        }
        res.json = (body) => {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(body))
          }
          return res
        }

        try {
          if (req.method === 'POST' && !String(req.headers['content-type'] || '').includes('multipart')) {
            const chunks = []
            for await (const chunk of req) chunks.push(chunk)
            const raw = Buffer.concat(chunks).toString('utf8')
            req.body = raw ? JSON.parse(raw) : {}
          }
          const mod = await server.ssrLoadModule(`/api/${name}.js`)
          await mod.default(req, res)
        } catch (err) {
          console.error(`[local-api] /api/${name}:`, err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Local API error. Cek terminal Vite.' }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
})
