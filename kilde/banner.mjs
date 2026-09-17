/*
  Banneret, i to temaer og med bevegelse.

  900x240 og ikke 1200x320. GitHub viser rundt 880 piksler bredt uansett,
  og arealet er det som avgjoer vekten naar dette blir til GIF. Den
  foerste utgaven veide 982 kB per tema; dette lerretet er 44 % mindre.

  Det ble skrevet om fra bunnen da maalene ble endret. Foerste forsoek
  skalerte hver koordinat for seg med soek og erstatt, og da havnet navnet
  oppaa undertittelen. Et oppsett med tjue tall i seg taaler ikke aa bli
  regnet om stykkevis.

  Ingen webfonter: en SVG lastet som bilde faar ikke hente skrift, saa alt
  ligger paa systemstabler, og smaateksten er monospace fordi den er den
  mest forutsigbare paa tvers av maskiner.

  ALLE SLOEYFER GAAR OPP I SYKLUSEN. Kortene og banneret blir til GIF, og
  en GIF har én lengde: en underanimasjon som ikke gaar opp, hopper synlig
  ved hver runde. Syklusen er 8 s, markoeren 1 s, ringene 8 s.
*/
import { gyldigeTider } from './gyldig.mjs';
import { writeFileSync } from 'node:fs';

import { fileURLToPath } from 'node:url';
/* Mappa over denne, altsaa rota i repoet. */
const ROT = fileURLToPath(new URL('..', import.meta.url));


const B = 900, H = 240, SYKLUS = 8;


const TEMA = {
  dark:  { grunn: '#0F172A', rute: '#FFFFFF', ruteOp: 0.04, navn: '#F8FAFC', dempet: '#94A3B8', blaa: '#3B82F6' },
  light: { grunn: '#F8FAFC', rute: '#0F172A', ruteOp: 0.05, navn: '#0F172A', dempet: '#64748B', blaa: '#2563EB' },
};

const SANS = 'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';

/* Venstre spalte. */
const X = 54;
const Y_NAVN = 104, Y_STREK = 120, Y_UNDER = 152;
const UNDERTEKST = 'founder of Inovix. we build for clients, and for ourselves.';
/* Monospace paa 13 px er ca. 7,8 px per tegn. Markoeren settes der teksten slutter. */
const X_MARKOR = X + 2 + Math.round(UNDERTEKST.length * 7.8) + 6;

/* Hoeyre spalte: én node per produkt som er live. */
const NODER = ['nordcrm', 'cashlite', 'venito', 'peskot', 'delbarme'];
const R = 15, AVSTAND = 58, Y_NODE = 108, Y_ETIKETT = 142;
const X_NODE0 = B - 40 - (NODER.length - 1) * AVSTAND - R;

function lag(navn) {
  const t = TEMA[navn];

  let rutenett = '';
  for (let x = 0; x <= B; x += 30) rutenett += `<line x1="${x}" y1="0" x2="${x}" y2="${H}"/>`;
  for (let y = 0; y <= H; y += 30) rutenett += `<line x1="0" y1="${y}" x2="${B}" y2="${y}"/>`;

  let noder = '';
  NODER.forEach((n, i) => {
    const cx = X_NODE0 + i * AVSTAND;
    const fra = 0.1 + i * 0.1, til = fra + 0.1;
    noder += `<circle cx="${cx}" cy="${Y_NODE}" r="${R}" fill="none" stroke="${t.dempet}" stroke-opacity="0.35" stroke-width="2"/>`;
    noder += `<circle cx="${cx}" cy="${Y_NODE}" r="${R}" fill="none" stroke="${t.blaa}" stroke-width="2" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${fra.toFixed(2)};${til.toFixed(2)};0.82;0.88" dur="${SYKLUS}s" repeatCount="indefinite"/>
    </circle>`;
    noder += `<circle cx="${cx}" cy="${Y_NODE}" r="3.4" fill="${t.dempet}" fill-opacity="0.5">
      <animate attributeName="fill-opacity" values="0.5;0.5;1;1;0.5" keyTimes="0;${fra.toFixed(2)};${til.toFixed(2)};0.82;0.88" dur="${SYKLUS}s" repeatCount="indefinite"/>
    </circle>`;
    noder += `<text x="${cx}" y="${Y_ETIKETT}" fill="${t.dempet}" fill-opacity="0.75" font-family="${MONO}" font-size="8.5" text-anchor="middle">${n}</text>`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}" viewBox="0 0 ${B} ${H}" role="img" aria-label="Rahmat Mozafari, founder of Inovix">
  <rect width="${B}" height="${H}" fill="${t.grunn}"/>
  <g stroke="${t.rute}" stroke-opacity="${t.ruteOp}" stroke-width="1">${rutenett}</g>
  <rect x="0" y="0" width="5" height="${H}" fill="${t.blaa}"/>

  <!-- Navnet kommer inn én gang per runde. Kort og dempet: det skal
       kjennes som at siden lastes, ikke som at noe blinker. -->
  <g>
    <text x="${X}" y="${Y_NAVN}" fill="${t.navn}" font-family="${SANS}" font-size="38" font-weight="700" letter-spacing="-1.1">Rahmat Mozafari</text>
    <animateTransform attributeName="transform" type="translate" values="-7 0;0 0;0 0;0 0" keyTimes="0;0.07;0.9;1" dur="${SYKLUS}s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;1" keyTimes="0;0.06;0.9;1" dur="${SYKLUS}s" repeatCount="indefinite"/>
  </g>

  <!-- Streken tegnes fra venstre, rett etter navnet. -->
  <rect x="${X + 2}" y="${Y_STREK}" width="48" height="3" rx="1.5" fill="${t.blaa}">
    <animate attributeName="width" values="0;48;48;48" keyTimes="0;0.12;0.9;1" dur="${SYKLUS}s" repeatCount="indefinite"/>
  </rect>

  <text x="${X + 2}" y="${Y_UNDER}" fill="${t.dempet}" font-family="${MONO}" font-size="13">${UNDERTEKST}</text>
  <rect x="${X_MARKOR}" y="${Y_UNDER - 2}" width="8" height="2.5" rx="1.25" fill="${t.blaa}">
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.52;1" dur="1s" repeatCount="indefinite"/>
  </rect>

  ${noder}
</svg>`;
}

for (const navn of Object.keys(TEMA)) {
  const { svg, rettet } = gyldigeTider(lag(navn));
  if (rettet) console.log(`  rettet ${rettet} keyTimes`);
  writeFileSync(`${ROT}banner-${navn}.svg`, svg);
  console.log(`banner-${navn}.svg`);
}
