import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { nitro } from 'nitro/vite'
import neon from './neon-vite-plugin.ts'

function clientOnly(plugin: PluginOption): PluginOption {
  if (!plugin || typeof plugin !== 'object' || Array.isArray(plugin)) return plugin
  return { ...plugin, applyToEnvironment: (env) => env.name !== 'nitro' }
}

const config = defineConfig({
  plugins: [
    devtools(),
    neon,
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    clientOnly(wasm()),
    clientOnly(topLevelAwait()),
    tanstackStart(),
    nitro({ preset: 'vercel' }),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@journeyapps/wa-sqlite', '@powersync/web']
  },
  worker: {
    format: 'es',
    plugins: () => [wasm(), topLevelAwait()]
  }
})

export default config
