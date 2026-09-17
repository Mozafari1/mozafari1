# Hvordan grafikken lages

    npm install
    npm run alt

eller hvert steg for seg:

    node kilde/banner.mjs   # banner-{dark,light}.svg
    node kilde/kort.mjs     # kort/*-{dark,light}.svg
    node kilde/bygg.mjs     # anim/*.gif

bygg.mjs trenger Google Chrome installert. Stien står øverst i
kilde/gif.mjs.

SVG-ene er kilden. GIF-ene er det som legges ut.

## Hvorfor GIF og ikke SVG

GitHub kjører ikke SMIL i SVG som ligger i repoet. Det ble målt i ekte
Chrome mot profilsiden: null piksler endret seg på tre sekunder. Raw-
innhold serveres med `content-security-policy: default-src 'none';
sandbox`, og den slår av animasjonen. Filen er intakt, nettleseren
kjører den bare ikke.

`bygg.mjs` laster derfor hver SVG i Chrome, pauser animasjonen, spoler
med `setCurrentTime` og tar ett bilde per rute. Ingen timer, så hver
rute er nøyaktig der den skal være og resultatet er likt hver gang.

## To ting som avgjør vekten

**Åtte farger.** Målt: banneret gikk fra 645 til 210 kB. 16 og 32 ga
nøyaktig samme størrelse som hverandre, så terskelen ligger ved åtte,
der GIF-en holder seg til en palett på tre bit. Til sammen 1,6 MB mot
3,8 MB.

**Sløyfene må gå opp i hverandre.** En GIF har én lengde. Har et kort en
rask underanimasjon som ikke går opp i hovedlengden, hopper den synlig
ved hver runde. Derfor er de raske satt til 1,8 i en på 9, og 1,1 i en
på 11.

## Og en ting som avgjør at det ser riktig ut

Hver animert egenskap må ha en grunnverdi. `<animate attributeName="x">`
uten `x=` på elementet gir x=0 i ro. Det gjelder ikke bare stillbildet:
den som har redusert bevegelse påslått ser den samme tilstanden.
