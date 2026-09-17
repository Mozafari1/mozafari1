/*
  Ett kort per produkt, med en liten animert demo av hva det GJOER.

  TO FILER PER KORT, IKKE ÉN. Ikonene klarte seg med én fil fordi de
  ikke hadde tekst. Et kort har navnet i seg, og ingen enkeltfarge er
  lesbar baade paa GitHub sin hvite (#ffffff) og moerke (#0d1117)
  bakgrunn. <picture> i README-en velger.

  Demoen er ikke pynt. Et kanban-kort som flytter seg sier hva et CRM
  gjoer; en generisk graf sier ingenting.

  Bevegelsen er forskjoevet mellom kortene, og hver syklus har et langt
  opphold. Sju ting som pulserer i takt blir en stroboskoplampe.


  SLOEYFENE MAA GAA OPP I HVERANDRE

  Kortene blir til GIF foer de legges ut, fordi GitHub ikke kjoerer SMIL
  (se scripts/gif.mjs). En GIF har én lengde, og har et kort en rask
  underanimasjon som ikke gaar opp i hovedlengden, hopper den synlig ved
  hver runde.

  Derfor er alle raske sloeyfer satt slik at hovedlengden er et helt
  multiplum av dem: 1,8 i en paa 9, og 1,1 i en paa 11.


  HVER ANIMERT EGENSKAP MAA HA EN GRUNNVERDI

  <animate attributeName="x"> uten x= paa elementet gir x=0 i ro. Det
  ble oppdaget ved aa rendre kortene som stillbilder: NordCRMs emne og
  DelbarMes to profiler laa i venstre kant, oppaa navnet.

  Det gjelder mer enn stillbildet. Den som har redusert bevegelse
  paaslaatt, og enhver som ser foerste bilde foer animasjonen starter,
  ser den samme tilstanden. Kortet skal vaere ferdig OGSAA naar
  ingenting beveger seg.
*/
import { writeFileSync, mkdirSync } from 'node:fs';

import { fileURLToPath } from 'node:url';
/* Mappa over denne, altsaa rota i repoet. */
const ROT = fileURLToPath(new URL('..', import.meta.url));



mkdirSync(`${ROT}kort`, { recursive: true });

const H = 150;
const BREDDE = { standard: 440, bred: 892 };
let B = BREDDE.standard;
const TEMA = {
  dark:  { flate: '#161B22', kant: '#30363D', navn: '#E6EDF3', dempet: '#8B949E', spor: '#21262D', blaa: '#3B82F6' },
  light: { flate: '#FFFFFF', kant: '#D0D7DE', navn: '#0F172A', dempet: '#57606A', spor: '#EFF2F5', blaa: '#2563EB' },
};

const SANS = 'Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif';
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';

/* Demoene. Hver faar temaet og tegner i omraadet x 236-416, y 26-124. */
const DEMO = {
  /*
    Inovix er studioet, ikke et produkt. Demoen er derfor de fem tingene
    det har satt i drift, som lyser opp etter tur, og en linje som gaar
    fra verkstedet og ut.

    Kortet er dobbelt saa bredt som de andre med vilje: det staar over
    dem og skal ikke se ut som en sjettedel av samme rekke.
  */
  inovix: (t) => {
    /*
      Inovix er studioet, ikke et produkt. Demoen er det studioet gjoer:
      noe forlater verkstedet og lander i hvert produkt etter tur.

      ALT LIGGER PAA ÉN TIDSLINJE. Foerste utgave ga hver brikke sin egen
      begin-verdi, og da kunne ingenting synkroniseres mot dem. Naa deler
      alle den samme varigheten og styres av keyTimes, saa brikken lyser
      opp noeyaktig naar prikken er framme. En animasjon der lyset og
      bevegelsen ikke moetes, leses som to ting som skjer tilfeldig.

      Kortet er dobbelt saa bredt som de andre med vilje: det staar over
      dem og skal ikke se ut som en sjettedel av samme rekke.
    */
    const merke = ['nordcrm', 'cashlite', 'venito', 'peskot', 'delbarme'];
    const bredde = 78, mellom = 8, SYKLUS = 11;

    /*
      Startpunktet er regnet ut, ikke gjettet. Fem brikker a 78 med 8
      mellom er 422 piksler; kortet er 892 bredt og skal ha 24 i luft paa
      hoeyre side. Med 470 falt delbarme utenfor kanten.
    */
    const x0 = B - 24 - (merke.length * bredde + (merke.length - 1) * mellom);
    const senter = (i) => x0 + i * (bredde + mellom) + bredde / 2;

    /* Naar prikken er framme ved hver brikke, som andel av syklusen. */
    const ANKOMST = merke.map((_, i) => 0.1 + i * 0.11);
    const SLUTT = 0.7, BORTE = 0.76;
    const vx = x0 - 46;

    let ut = `<line x1="${vx + 18}" y1="75" x2="${x0 - 8}" y2="75" stroke="${t.dempet}" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round"/>`;

    /* Verkstedet, som puster naar det sender fra seg noe. */
    ut += `<rect x="${vx - 16}" y="59" width="32" height="32" rx="8" fill="${t.blaa}" opacity="0.9"/>`;
    /*
      Pulsen er en sirkel som vokser om sitt eget senter, ikke en firkant
      som skaleres. En skalering flytter ogsaa opphavspunktet, saa den
      maa motregnes med en translate, og to transformer som skal oppheve
      hverandre er en feil som venter. Samme grep som i banneret.
    */
    ut += `<circle cx="${vx}" cy="75" r="18" fill="none" stroke="${t.blaa}" stroke-width="2" opacity="0">
      <animate attributeName="r" values="17;30" keyTimes="0;1" dur="1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.5;0" keyTimes="0;1" dur="1.1s" repeatCount="indefinite"/>
    </circle>`;

    merke.forEach((navn, i) => {
      const x = x0 + i * (bredde + mellom);
      ut += `<rect x="${x}" y="52" width="${bredde}" height="46" rx="8" fill="${t.spor}"/>`;
      /* Lyser opp i det prikken lander, og blir staaende ut runden. */
      ut += `<rect x="${x}" y="52" width="${bredde}" height="46" rx="8" fill="none" stroke="${t.blaa}" stroke-width="2" opacity="0">
        <animate attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;${(ANKOMST[i] - 0.02).toFixed(3)};${ANKOMST[i].toFixed(3)};${SLUTT};${BORTE}"
          dur="${SYKLUS}s" repeatCount="indefinite"/>
      </rect>`;
      ut += `<text x="${x + bredde / 2}" y="79" fill="${t.dempet}" fill-opacity="0.8" font-family="${MONO}" font-size="9.5" text-anchor="middle">${navn}</text>`;
    });

    /* Prikken. Samme tidslinje som brikkene, saa de moetes. */
    const punkter = [vx, ...ANKOMST.map((_, i) => senter(i)), senter(merke.length - 1)];
    const tider = [0, ...ANKOMST.map((v) => v.toFixed(3)), 1];
    ut += `<circle cx="${vx}" cy="75" r="5" fill="${t.blaa}">
      <animate attributeName="cx" values="${punkter.join(';')}" keyTimes="${tider.join(';')}" dur="${SYKLUS}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.04;${SLUTT};${BORTE};1" dur="${SYKLUS}s" repeatCount="indefinite"/>
    </circle>`;

    return ut;
  },

  nordcrm: (t) => {
    /* Tre kolonner, og et emne som flytter seg gjennom loepet. */
    const kol = [240, 300, 360];
    let ut = kol.map((x) =>
      `<rect x="${x}" y="30" width="52" height="90" rx="7" fill="${t.spor}"/>`).join('');
    ut += kol.map((x, i) =>
      `<rect x="${x + 7}" y="${38 + i * 0}" width="38" height="5" rx="2.5" fill="${t.dempet}" opacity="0.35"/>`).join('');
    /* To hvilende kort, saa kolonnene ikke ser tomme ut. */
    ut += `<rect x="247" y="52" width="38" height="15" rx="4" fill="${t.dempet}" opacity="0.28"/>`;
    ut += `<rect x="307" y="52" width="38" height="15" rx="4" fill="${t.dempet}" opacity="0.28"/>`;
    /* Emnet som vinnes. */
    ut += `<rect x="247" y="74" width="38" height="15" rx="4" fill="${t.blaa}">
      <animate attributeName="x" values="247;247;307;307;367;367;247" keyTimes="0;0.2;0.34;0.54;0.68;0.94;1" dur="9s" repeatCount="indefinite"/>
    </rect>`;
    return ut;
  },

  cashlite: (t) => {
    /* Et budsjett som fylles, og tre poster under. */
    let ut = `<rect x="240" y="44" width="176" height="12" rx="6" fill="${t.spor}"/>`;
    ut += `<rect x="240" y="44" height="12" rx="6" fill="${t.blaa}">
      <animate attributeName="width" values="14;124;124;14" keyTimes="0;0.4;0.82;1" dur="8s" begin="0.6s" repeatCount="indefinite"/>
    </rect>`;
    [0, 1, 2].forEach((i) => {
      const y = 72 + i * 18;
      ut += `<circle cx="246" cy="${y + 4}" r="4" fill="${t.dempet}" opacity="0.4"/>`;
      ut += `<rect x="258" y="${y + 1}" width="${90 - i * 18}" height="6" rx="3" fill="${t.dempet}" opacity="0.3"/>`;
      ut += `<rect x="378" y="${y + 1}" width="38" height="6" rx="3" fill="${t.dempet}" opacity="0.18"/>`;
    });
    return ut;
  },

  venito: (t) => {
    /*
      En invitasjon som aapner seg, og tre som svarer ja.

      Foerste utgave var en blaa flate paa 96x78 som dekket halve kortet.
      I ro leste den som et fargefelt og ikke som en invitasjon.
      Konvolutten er naa tegnet med kropp og klaff, slik at den betyr noe
      ogsaa naar ingenting beveger seg.
    */
    let ut = `<rect x="250" y="44" width="104" height="66" rx="8" fill="${t.spor}" stroke="${t.dempet}" stroke-opacity="0.35"/>`;
    ut += `<g opacity="0">
      <rect x="264" y="60" width="58" height="5" rx="2.5" fill="${t.dempet}" opacity="0.6"/>
      <rect x="264" y="72" width="76" height="5" rx="2.5" fill="${t.dempet}" opacity="0.4"/>
      <rect x="264" y="86" width="40" height="5" rx="2.5" fill="${t.blaa}"/>
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.3;0.42;0.84;0.9" dur="8.5s" begin="1.2s" repeatCount="indefinite"/>
    </g>`;
    /* Klaffen. Lukket i ro, slaar opp midt i syklusen. */
    ut += `<path d="M250 46 L302 84 L354 46" fill="none" stroke="${t.blaa}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <animate attributeName="d"
        values="M250 46 L302 84 L354 46;M250 46 L302 84 L354 46;M250 46 L302 30 L354 46;M250 46 L302 30 L354 46;M250 46 L302 84 L354 46"
        keyTimes="0;0.24;0.4;0.84;1" dur="8.5s" begin="1.2s" repeatCount="indefinite"/>
    </path>`;
    [0, 1, 2].forEach((i) => {
      ut += `<circle cx="${372 + i * 20}" cy="77" r="8" fill="${t.dempet}" opacity="0.28"/>`;
      ut += `<circle cx="${372 + i * 20}" cy="77" r="8" fill="${t.blaa}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${0.5 + i * 0.07};${0.58 + i * 0.07};0.86;0.92" dur="8.5s" begin="1.2s" repeatCount="indefinite"/>
      </circle>`;
    });
    return ut;
  },

  peskot: (t) => {
    /*
      Fire spillere som legger hvert sitt kort i stikket.

      ÉN TIDSLINJE, som Inovix. Foerste utgave ga hvert kort sin egen
      begin og en egen varighet regnet ut fra den, pluss en ekstra
      animasjon som skulle sette alt tilbake. Fire klokker som skal
      moetes igjen er en feil som venter, og den taalte ikke aa bli
      gjort om til GIF: en sloeyfe uten felles lengde hopper ved hver
      runde.
    */
    const plass = [[328, 34], [386, 75], [328, 116], [270, 75]];
    const SYKLUS = 9;
    let ut = plass.map(([x, y]) =>
      `<rect x="${x - 11}" y="${y - 15}" width="22" height="30" rx="4" fill="${t.spor}" stroke="${t.dempet}" stroke-opacity="0.3"/>`).join('');

    plass.forEach(([x, y], i) => {
      const ute = 0.1 + i * 0.12;      /* naar kortet forlater haanden */
      const inne = ute + 0.09;         /* naar det ligger i stikket */
      const mx = 299 + i * 12, my = 60;
      ut += `<rect x="${x - 11}" y="${y - 15}" width="22" height="30" rx="4" fill="${i === 3 ? t.blaa : t.spor}" stroke="${t.dempet}" stroke-opacity="${i === 3 ? 0 : 0.3}" opacity="0">
        <animate attributeName="x" values="${x - 11};${x - 11};${mx};${mx};${x - 11}" keyTimes="0;${ute.toFixed(3)};${inne.toFixed(3)};0.78;0.84" dur="${SYKLUS}s" repeatCount="indefinite"/>
        <animate attributeName="y" values="${y - 15};${y - 15};${my};${my};${y - 15}" keyTimes="0;${ute.toFixed(3)};${inne.toFixed(3)};0.78;0.84" dur="${SYKLUS}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${ute.toFixed(3)};${inne.toFixed(3)};0.78;0.84" dur="${SYKLUS}s" repeatCount="indefinite"/>
      </rect>`;
    });
    return ut;
  },

  delbarme: (t) => {
    /* En stemme, og to som finner hverandre. */
    let ut = '';
    const h = [12, 24, 36, 22, 14, 26, 16];
    h.forEach((full, i) => {
      const x = 244 + i * 11, kort = Math.max(6, Math.round(full * 0.3));
      ut += `<rect x="${x}" y="${75 - full / 2}" width="5" height="${full}" rx="2.5" fill="${t.blaa}" opacity="0.85">
        <animate attributeName="height" values="${full};${kort};${full}" dur="1.8s" begin="${(i * 0.22).toFixed(2)}s" repeatCount="indefinite"/>
        <animate attributeName="y" values="${75 - full / 2};${75 - kort / 2};${75 - full / 2}" dur="1.8s" begin="${(i * 0.22).toFixed(2)}s" repeatCount="indefinite"/>
      </rect>`;
    });
    ut += `<circle cx="340" cy="75" r="15" fill="${t.spor}" stroke="${t.dempet}" stroke-opacity="0.35">
      <animate attributeName="cx" values="340;340;362;362;340" keyTimes="0;0.3;0.5;0.86;1" dur="9s" begin="2.4s" repeatCount="indefinite"/>
    </circle>`;
    ut += `<circle cx="406" cy="75" r="15" fill="${t.spor}" stroke="${t.dempet}" stroke-opacity="0.35">
      <animate attributeName="cx" values="406;406;384;384;406" keyTimes="0;0.3;0.5;0.86;1" dur="9s" begin="2.4s" repeatCount="indefinite"/>
    </circle>`;
    ut += `<path d="M366 62 L373 68 L380 62" fill="none" stroke="${t.blaa}" stroke-width="2.5" stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.58;0.86;0.92" dur="9s" begin="2.4s" repeatCount="indefinite"/>
    </path>`;
    return ut;
  },

  stamly: (t) => {
    /* Et stempelkort som fylles, og en belonning til slutt. */
    let ut = `<rect x="240" y="48" width="176" height="54" rx="9" fill="${t.spor}"/>`;
    [0, 1, 2, 3, 4].forEach((i) => {
      const cx = 262 + i * 30;
      ut += `<circle cx="${cx}" cy="75" r="9" fill="none" stroke="${t.dempet}" stroke-opacity="0.4" stroke-width="1.5"/>`;
      ut += `<circle cx="${cx}" cy="75" r="9" fill="${t.blaa}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;${(0.1 + i * 0.12).toFixed(2)};${(0.17 + i * 0.12).toFixed(2)};0.88;0.94" dur="9.5s" begin="3s" repeatCount="indefinite"/>
      </circle>`;
    });
    ut += `<path d="M382 68 l3.2 6.6 7.3 1 -5.3 5.1 1.3 7.2 -6.5 -3.4 -6.5 3.4 1.3 -7.2 -5.3 -5.1 7.3 -1 z" fill="${t.blaa}" opacity="0">
      <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.74;0.8;0.9;0.95" dur="9.5s" begin="3s" repeatCount="indefinite"/>
    </path>`;
    return ut;
  },

  tilbudsroboten: (t) => {
    /* Tale inn, linjer ut, signatur. */
    let ut = `<rect x="240" y="30" width="26" height="36" rx="13" fill="${t.blaa}" opacity="0.9"/>`;
    ut += `<circle cx="253" cy="48" r="20" fill="none" stroke="${t.blaa}" stroke-width="2" opacity="0">
      <animate attributeName="r" values="14;26" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite"/>
    </circle>`;
    ut += `<rect x="286" y="30" width="130" height="90" rx="8" fill="${t.spor}"/>`;
    [0, 1, 2].forEach((i) => {
      ut += `<rect x="298" y="${42 + i * 14}" width="${104 - i * 22}" height="6" rx="3" fill="${t.dempet}" opacity="0.45">
        <animate attributeName="opacity" values="0;0;0.45;0.45;0" keyTimes="0;${(0.16 + i * 0.08).toFixed(2)};${(0.24 + i * 0.08).toFixed(2)};0.86;0.92" dur="9s" begin="4.2s" repeatCount="indefinite"/>
      </rect>`;
    });
    ut += `<path d="M300 100 C 310 90, 320 110, 332 98 S 352 90, 366 102" fill="none" stroke="${t.blaa}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="0">
      <animate attributeName="stroke-dashoffset" values="90;90;0;0;90" keyTimes="0;0.52;0.72;0.88;0.94" dur="9s" begin="4.2s" repeatCount="indefinite"/>
    </path>`;
    return ut;
  },
};

const TEKST = {
  inovix: ['Inovix', 'software for clients, and our own products alongside it'],
  nordcrm: ['NordCRM', 'ai powered crm'],
  cashlite: ['Cashlite', 'smart budgeting'],
  venito: ['Venito', 'digital invitations'],
  peskot: ['Peskot', 'online hokm'],
  delbarme: ['DelbarMe', 'voice first matchmaking'],
  stamly: ['Stamly', 'booking and loyalty'],
  tilbudsroboten: ['Tilbudsroboten', 'quotes, signed on site'],
};

for (const [navn, demo] of Object.entries(DEMO)) {
  const [tittel, under] = TEKST[navn];
  B = navn === 'inovix' ? BREDDE.bred : BREDDE.standard;
  for (const [tn, t] of Object.entries(TEMA)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${B}" height="${H}" viewBox="0 0 ${B} ${H}" role="img" aria-label="${tittel}, ${under}">
  <rect x="0.75" y="0.75" width="${B - 1.5}" height="${H - 1.5}" rx="14" fill="${t.flate}" stroke="${t.kant}"/>
  <text x="24" y="50" fill="${t.navn}" font-family="${SANS}" font-size="20" font-weight="700" letter-spacing="-0.4">${tittel}</text>
  <text x="24" y="72" fill="${t.dempet}" font-family="${MONO}" font-size="11.5">${under}</text>
  <rect x="24" y="86" width="40" height="3" rx="1.5" fill="${t.blaa}"/>
  ${demo(t)}
</svg>`;
    writeFileSync(`${ROT}kort/${navn}-${tn}.svg`, svg);
  }
  console.log(`kort/${navn}-{dark,light}.svg`);
}
