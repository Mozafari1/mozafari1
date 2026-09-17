import { lagGif } from './gif.mjs';
import { mkdirSync } from 'node:fs';

import { fileURLToPath } from 'node:url';
/* Mappa over denne, altsaa rota i repoet. */
const ROT = fileURLToPath(new URL('..', import.meta.url));


mkdirSync(`${ROT}anim`,{recursive:true});
const FPS=7;
const BAKGRUNN={dark:'#0D1117',light:'#FFFFFF'};
const JOBB=[
  {navn:'banner',  b:900, h:240,syklus:8},
  {navn:'inovix',  b:892, h:150,syklus:11},
  {navn:'nordcrm', b:440, h:150,syklus:9},
  {navn:'cashlite',b:440, h:150,syklus:8},
  {navn:'venito',  b:440, h:150,syklus:8.5},
  {navn:'peskot',  b:440, h:150,syklus:9},
  {navn:'delbarme',b:440, h:150,syklus:9},
  {navn:'stamly',  b:440, h:150,syklus:9.5},
  {navn:'tilbudsroboten',b:440,h:150,syklus:9},
];
for (const j of JOBB) {
  for (const tema of ['dark','light']) {
    const kilde = j.navn==='banner' ? `${ROT}banner-${tema}.svg` : `${ROT}kort/${j.navn}-${tema}.svg`;
    const ut = `${ROT}anim/${j.navn}-${tema}.gif`;
    await lagGif({svgSti:kilde,bredde:j.b,hoyde:j.h,syklus:j.syklus,fps:FPS,ut,bakgrunn:BAKGRUNN[tema],hopp:20});
    process.stdout.write('.');
  }
}
console.log('\nferdig');
