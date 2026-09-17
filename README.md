<picture>
  <source media="(prefers-color-scheme: dark)" srcset="anim/banner-dark.gif">
  <img src="anim/banner-light.gif" alt="Rahmat Mozafari, founder of Inovix" width="100%">
</picture>

<table>
<tr><td colspan="2"><a href="https://inovix.no"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/inovix-dark.gif"><img src="anim/inovix-light.gif" width="880" alt="Inovix"></picture></a></td></tr>
</table>

**Inovix** is a small studio in Norway. We build software for clients, and our own products alongside it.

Five of our own are running today.

<table>
<tr><td><a href="https://nordcrm.io"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/nordcrm-dark.gif"><img src="anim/nordcrm-light.gif" width="420" alt=""></picture></a></td><td><a href="https://cashlite.io"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/cashlite-dark.gif"><img src="anim/cashlite-light.gif" width="420" alt=""></picture></a></td></tr>
<tr><td><a href="https://venito.io"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/venito-dark.gif"><img src="anim/venito-light.gif" width="420" alt=""></picture></a></td><td><a href="https://peskot.com"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/peskot-dark.gif"><img src="anim/peskot-light.gif" width="420" alt=""></picture></a></td></tr>
<tr><td><a href="https://delbarme.com"><picture><source media="(prefers-color-scheme: dark)" srcset="anim/delbarme-dark.gif"><img src="anim/delbarme-light.gif" width="420" alt=""></picture></a></td><td></td></tr>
</table>

Two more are on the way.

<table>
<tr><td><picture><source media="(prefers-color-scheme: dark)" srcset="anim/stamly-dark.gif"><img src="anim/stamly-light.gif" width="420" alt=""></picture></td><td><picture><source media="(prefers-color-scheme: dark)" srcset="anim/tilbudsroboten-dark.gif"><img src="anim/tilbudsroboten-light.gif" width="420" alt=""></picture></td></tr>
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
