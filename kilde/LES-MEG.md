# Hvordan grafikken lages

    npm install
    npm run svg

    node kilde/banner.mjs   # banner-{dark,light}.svg
    node kilde/kort.mjs     # kort/*-{dark,light}.svg

SVG-ene er det som legges ut. De animerer på GitHub.

## Det ble en omvei innom GIF

Kortene så ut til å stå stille, og jeg målte det i Chrome: null piksler
endret seg på tre sekunder. Konklusjonen ble at GitHub slår av SMIL med
`content-security-policy: ... sandbox` på raw-innhold, og alt ble bygget
om til GIF.

Testen var feil. Puppeteer sine skjermbilder teller ikke rammer i en
animasjon, verken i headless eller med ekte vindu. Den kunne aldri måle
bevegelse, og svarte null uansett hva den så på.

Målt riktig, med fjorten prøver over et helt omløp: SVG-en hentet rett
fra `raw.githubusercontent.com` endrer 619 piksler. Den animerer.

GIF-ene er slettet. De veide 1,6 MB mot rundt 100 kB for SVG, og de var
uskarpe ved zoom. `kilde/gif.mjs` og `kilde/bygg.mjs` ligger igjen i
tilfelle det en dag trengs.

## Regler som ble igjen fra omveien

**Hver animert egenskap må ha en grunnverdi.** `<animate
attributeName="x">` uten `x=` på elementet gir x=0 i ro. Det gjelder
ikke bare stillbilder: den som har redusert bevegelse påslått ser den
samme tilstanden.

**Sløyfer bør gå opp i hverandre.** De raske er satt til 1,8 i en på 9,
og 1,1 i en på 11. Det var et krav for GIF, og det skader ikke i SVG.

**Én tidslinje per kort.** Inovix og Peskot ble lagt om fordi flere
`begin`-verdier ikke kan synkroniseres mot hverandre. Lyset og
bevegelsen må møtes.
