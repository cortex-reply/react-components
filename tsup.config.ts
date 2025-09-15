import { defineConfig, type Options } from "tsup";
import react18Plugin from "esbuild-plugin-react18";
import cssPlugin from "esbuild-plugin-react18-css";
import { rdiPlugin } from "esbuild-plugin-rdi";
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';

export default defineConfig(
  (options: Options) =>
    ({
      format: ['cjs', 'esm'],
      target: 'esnext',
      entry: ["./src/**", "!./src/**/*.stories.*", "!./src/**/*.test.*", "!./src/**/*.spec.*"],
      treeshake: true,
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      splitting: false,
      dts: true,
      metafile: true,
      ignoreWatch: ['**/*.mdx', '**/*.md', '**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
      esbuildOptions(options) {
        options.loader = {
          ...options.loader,
          '.mdx': 'text', // Treat .mdx files as plain text
          '.md': 'text', // Treat .md files as plain text
        }

        // Filter out test files, stories, and markdown files
        options.plugins = options.plugins || []
        options.plugins.push({
          name: 'exclude-files',
          setup(build) {
            // Skip test files, stories, and markdown files
            build.onLoad({ filter: /\.(test|spec|stories)\.(ts|tsx|js|jsx)$/ }, () => {
              return { contents: '', loader: 'js' }
            })
            build.onLoad({ filter: /\.(md|mdx)$/ }, () => {
              return { contents: '', loader: 'text' }
            })
          },
        })
      },
      esbuildPlugins: [
        preserveDirectivesPlugin({
          directives: ['use client', 'use strict', 'use server'],
          include: /\.(js|ts|jsx|tsx)$/,
          exclude: /node_modules|\.(test|spec|stories)\.(ts|tsx|js|jsx)$|\.(md|mdx)$/,
        }),
        react18Plugin({ disableJSXRequireDedup: true }),
        cssPlugin({ generateScopedName: '[folder]__[local]' }),
        rdiPlugin(),
      ],
      onSuccess: async () => {
        console.log('Build completed, cleaning up story files...')
        const fs = await import('fs')
        const path = await import('path')

        // Function to recursively find and remove story files
        const removeStoryFiles = async (dir: string) => {
          try {
            const entries = await fs.promises.readdir(dir, { withFileTypes: true })

            for (const entry of entries) {
              const fullPath = path.join(dir, entry.name)

              if (entry.isDirectory()) {
                await removeStoryFiles(fullPath)
              } else if (entry.name.includes('.stories.')) {
                try {
                  await fs.promises.unlink(fullPath)
                  console.log(`Removed: ${fullPath}`)
                } catch (err) {
                  console.warn(`Failed to remove ${fullPath}:`, err)
                }
              }
            }
          } catch (err) {
            console.warn(`Failed to read directory ${dir}:`, err)
          }
        }

        // Remove story files from dist
        await removeStoryFiles('dist')
      },
      ...options,
    }) as Options,
)
