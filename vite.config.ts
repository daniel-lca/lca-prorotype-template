import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// AI Studio saves uploaded files (PRDs, briefs, screenshots) in public/assets/aistudio/. They stay in the repo
// for reference, but they must never be published with the prototype.
function excludeAiStudioUploads(): Plugin {
  let outDir = 'dist';
  return {
    name: 'exclude-ai-studio-uploads',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      rmSync(resolve(outDir, 'assets/aistudio'), { recursive: true, force: true });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), excludeAiStudioUploads()],
  // '@/...' imports: shadcn/ui components use '@/components/ui/...' and '@/lib/utils'.
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
});
