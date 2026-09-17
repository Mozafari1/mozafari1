<picture>
  <source media="(prefers-color-scheme: dark)" srcset="banner-dark.svg">
  <img src="banner-light.svg" alt="Rahmat Mozafari, founder of Inovix" width="100%">
</picture>

## [Inovix](https://inovix.no)

A small studio in Norway. We build our own products and put them live, rather than selling hours.

Five are running today.

<table>
<tr><td><a href="https://nordcrm.io"><picture><source media="(prefers-color-scheme: dark)" srcset="kort/nordcrm-dark.svg"><img src="kort/nordcrm-light.svg" width="420" alt=""></picture></a></td><td><a href="https://cashlite.io"><picture><source media="(prefers-color-scheme: dark)" srcset="kort/cashlite-dark.svg"><img src="kort/cashlite-light.svg" width="420" alt=""></picture></a></td></tr>
<tr><td><a href="https://venito.io"><picture><source media="(prefers-color-scheme: dark)" srcset="kort/venito-dark.svg"><img src="kort/venito-light.svg" width="420" alt=""></picture></a></td><td><a href="https://peskot.com"><picture><source media="(prefers-color-scheme: dark)" srcset="kort/peskot-dark.svg"><img src="kort/peskot-light.svg" width="420" alt=""></picture></a></td></tr>
<tr><td><a href="https://delbarme.com"><picture><source media="(prefers-color-scheme: dark)" srcset="kort/delbarme-dark.svg"><img src="kort/delbarme-light.svg" width="420" alt=""></picture></a></td><td></td></tr>
</table>

Two more are on the way.

<table>
<tr><td><picture><source media="(prefers-color-scheme: dark)" srcset="kort/stamly-dark.svg"><img src="kort/stamly-light.svg" width="420" alt=""></picture></td><td><picture><source media="(prefers-color-scheme: dark)" srcset="kort/tilbudsroboten-dark.svg"><img src="kort/tilbudsroboten-light.svg" width="420" alt=""></picture></td></tr>
</table>

## The one I am building now

**Tilbudsroboten** lets a tradesperson write, send and get a quote signed from the customer's driveway, instead of at the kitchen table at eleven at night. Voice in, a finished quote out, signed in the browser without an app and without a login.

A monorepo with one app, one web portal and one database that has to be right, because a quote with the wrong sum is worse than no quote at all.

- **Money is integers of øre, computed in one place.** The language model proposes what to do and how much of it. It never sees a price and is never asked to add anything up.
- **Access control lives in the database, not in the client.** Row level security on every table, with a SQL test suite that logs in as four different users and tries to read what it should not. 107 assertions, and they have caught real holes.
- **Nothing is ever hard deleted.** Rows are marked, never removed. A company can be closed and reopened by its owner, and only by its owner.

## Stack

TypeScript everywhere. React Native and Expo for the apps, Next.js for the web, Supabase and PostgreSQL underneath, Deno edge functions for anything holding a secret, and the Anthropic API for the writing.

No Kubernetes. A monorepo and a managed database is the right size for this.

## How I work

**Measure, do not guess.** A layout bug I had reasoned about for an hour turned out to be an image that never filled its box. The arithmetic was right and the premise was wrong. Contrast gets a number, token cost gets a number, and a guard gets a test that is made to fail on purpose before it is trusted.

**Write it so it survives being read again in a month.** Comments say why, not what. When a decision is reversed, the old reason is deleted rather than left standing as a rule nobody follows.

**Only claim what is true.** That applies to a landing page and to a README. Every link above was checked before it was put there.

## Reach me

[post@inovix.no](mailto:post@inovix.no) · [inovix.no](https://inovix.no)
