import {defineConfig} from 'vite';
import {resolve} from 'node:path';
import {programs} from './src/data.js';
const routes=['index','programs/index','approach/index','studio/index','about/index','partners/index','contact/index','privacy/index','404',...programs.map(p=>`programs/${p.slug}/index`)];
export default defineConfig({server:{host:'0.0.0.0',port:4173,strictPort:true,allowedHosts:['terminal.local']},build:{rollupOptions:{input:routes.map(r=>resolve(import.meta.dirname,`${r}.html`))},chunkSizeWarningLimit:650}});
