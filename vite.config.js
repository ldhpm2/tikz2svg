/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// URL of api/chat.js resolved relative to this config file (ESM-safe)
const apiModuleUrl = new URL('./api/chat.js', import.meta.url).href

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Inject GEMINI_API_KEY into process.env so api/chat.js can read it
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY
  }

  return {
    plugins: [
      react(),
      {
        name: 'local-api-server',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            let body = ''
            req.on('data', chunk => { body += chunk.toString() })
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body || '{}')

                // Simulate Express-like res.status().json() pattern
                res.status = (code) => { res.statusCode = code; return res }
                res.json = (data) => {
                  if (!res.writableEnded) {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                  }
                  return res
                }

                // Dynamic import (after process.env is set, module cache used)
                const { default: handler } = await import(apiModuleUrl)
                await handler(req, res)
              } catch (e) {
                console.error('[Local API Error]', e.message)
                if (!res.writableEnded) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: e.message }))
                }
              }
            })
          })
        }
      }
    ]
  }
})
