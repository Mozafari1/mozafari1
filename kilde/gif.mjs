/*
  Lager animert GIF av en animert SVG.

  HVORFOR GIF OG IKKE SVG: maalt i ekte Chrome mot github.com/Mozafari1
  endret null piksler seg paa tre sekunder. GitHub serverer raw-innhold
  med «content-security-policy: default-src 'none'; sandbox», og den
  slaar av SMIL. Fila er intakt, men nettleseren kjoerer den ikke.

  Bildene tas ikke med en timer. SVG-en pauses og spoles med
  setCurrentTime, saa hver rute er noeyaktig der den skal vaere og
  resultatet er likt hver gang.
*/
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export async function lagGif({ svgSti, bredde, hoyde, syklus, fps, ut, bakgrunn, hopp = 20 }) {
  /*
    hopp: vi begynner aa fange etter tjue sekunder, ikke ved null.

    Kortene har animasjoner som starter med forsinkelse. Fanger man fra
    null, faar man oppstarten én gang og deretter et hopp. Etter tjue
    sekunder gaar alt i fast rytme, og da er ett omloep likt det neste.
  */
  const ruter = Math.round(syklus * fps);
  const forsinkelse = Math.round(1000 / fps);

  const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const p = await b.newPage();
  await p.setViewport({ width: bredde, height: hoyde, deviceScaleFactor: 1 });
  const svg = readFileSync(svgSti, 'utf8');
  await p.setContent(
    `<html><body style="margin:0;background:${bakgrunn}">${svg}</body></html>`,
    { waitUntil: 'load' },
  );
  await p.evaluate(() => document.querySelector('svg').pauseAnimations());

  const bilder = [];
  for (let i = 0; i < ruter; i++) {
    const t = hopp + (i / ruter) * syklus;
    await p.evaluate((tid) => document.querySelector('svg').setCurrentTime(tid), t);
    bilder.push(await p.screenshot({ type: 'png', omitBackground: false }));
  }
  await b.close();

  /* Sharp lager animert GIF av ruter stablet loddrett, med pageHeight. */
  const raa = await Promise.all(
    bilder.map((buf) => sharp(buf).ensureAlpha().raw().toBuffer()),
  );
  const stablet = Buffer.concat(raa);
  await sharp(stablet, {
    raw: { width: bredde, height: hoyde * ruter, channels: 4 },
    pageHeight: hoyde,
  })
    /*
      interFrameMaxError er det som avgjoer stoerrelsen. Uten den lagres
      hver rute i sin helhet; med den blir piksler som ikke endrer seg
      gjennomsiktige, og her staar det meste stille.

      colours 8 er den store gevinsten, og den er maalt: banneret gikk
      fra 645 til 210 kB. 16 og 32 ga noeyaktig samme stoerrelse, saa
      terskelen ligger ved aatte - da holder GIF-en seg til en palett paa
      tre bit. Navnet og undertittelen ble sett paa naert hold etterpaa;
      ingen synlig banding.

      dither 0 av samme grunn: flate farger skal ikke stoeyes til.
    */
    .gif({ loop: 0, delay: forsinkelse, colours: 8, dither: 0, interFrameMaxError: 20, effort: 10 })
    .toFile(ut);
  return ut;
}
