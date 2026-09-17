/**
 * Retter animasjoner der keyTimes ikke slutter paa 1.
 *
 *
 * FEILEN DENNE FILEN FINNES FOR
 *
 * SMIL krever at keyTimes begynner paa 0 og SLUTTER PAA 1. Gjoer den
 * ikke det, er animasjonen ugyldig, og nettleseren forkaster HELE
 * animasjonen. Den feiler ikke halvveis og den sier ingenting.
 *
 * Det traff 42 av animasjonene her. Peskot og Stamly hadde ingen
 * gyldige i det hele tatt, og sto bom stille. Inovix hadde fem av ni
 * ugyldige, saa prikken gikk mens brikkene aldri lyste opp.
 *
 * Aarsaken var en vane: mange av dem er skrevet som
 *
 *   values="0;0;1;1;0"  keyTimes="0;0.3;0.42;0.84;0.9"
 *
 * der 0,9 skulle bety «og saa er det over». Men keyTimes er ikke naar
 * animasjonen slutter, det er hvor i syklusen hver verdi hoerer hjemme,
 * og syklusen slutter paa 1.
 *
 *
 * HVA DEN GJOER
 *
 * Legger til ett punkt til: siste verdi gjentas paa keyTime 1. Da staar
 * elementet stille fra der det var til runden er omme, som var
 * meningen.
 *
 * Kjoeres paa hver SVG foer den skrives. Da kan feilen ikke komme
 * tilbake ved neste kort noen legger til.
 */

export function gyldigeTider(svg) {
  let rettet = 0;

  const ut = svg.replace(/<animate(?:Transform)?\b[^>]*>/g, (tagg) => {
    const kt = tagg.match(/keyTimes="([^"]+)"/);
    const vs = tagg.match(/values="([^"]+)"/);
    if (!kt || !vs) return tagg;

    const tider = kt[1].split(';').map((s) => s.trim());
    const verdier = vs[1].split(';').map((s) => s.trim());
    if (tider.length !== verdier.length) {
      throw new Error(
        `values og keyTimes har ulikt antall (${verdier.length} mot ${tider.length}): ${tagg.slice(0, 90)}`,
      );
    }
    if (tider[tider.length - 1] === '1') return tagg;

    rettet++;
    return tagg
      .replace(/keyTimes="[^"]+"/, `keyTimes="${[...tider, '1'].join(';')}"`)
      .replace(/values="[^"]+"/, `values="${[...verdier, verdier[verdier.length - 1]].join(';')}"`);
  });

  return { svg: ut, rettet };
}
