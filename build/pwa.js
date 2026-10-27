import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Ricava i file offline dalla build, includendo i temi non ancora scelti dall'utente.
export function pwa() {
  let outDir;
  return {
    name: 'shopping-list-pwa',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      async function filesIn(directory, prefix = '') {
        const entries = await readdir(directory, { withFileTypes: true });
        const nested = await Promise.all(entries.map(entry => entry.isDirectory()
          ? filesIn(resolve(directory, entry.name), `${prefix}${entry.name}/`)
          : `${prefix}${entry.name}`));
        return nested.flat();
      }
      const files = (await filesIn(outDir))
        .filter(file => /\.(html|js|css|png|ico|webp|gif|svg|woff2?|webmanifest)$/.test(file) && file !== 'sw.js')
        .sort();
      const template = await readFile(new URL('../src/pwa/service-worker.js', import.meta.url), 'utf8');
      // La versione dipende dal contenuto: ogni modifica genera una nuova cache dell'app.
      const hash = createHash('sha256').update(template);
      for (const file of files) {
        hash.update(file).update(await readFile(resolve(outDir, file)));
      }
      const worker = template
        .replace('__BUILD_VERSION__', hash.digest('hex').slice(0, 16))
        .replace('__PRECACHE_URLS__', JSON.stringify(files.map(file => `/${file}`)));
      if (/__PRECACHE_URLS__|__BUILD_VERSION__/.test(worker)) {
        throw new Error('PWA service worker contains unresolved build placeholders');
      }
      await writeFile(resolve(outDir, 'sw.js'), worker);
    },
  };
}
