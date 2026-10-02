# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.8.0](https://github.com/engelde/portfolio/compare/v1.7.6...v1.8.0) (2026-10-02)


### 🐛 Bug Fixes

* **build:** build with webpack to avoid a production hydration error ([0bb4ecb](https://github.com/engelde/portfolio/commit/0bb4ecb0f9c62cedb68b08fcd66421d59558b653))
* **deps:** refresh dependencies and pin the toolchain ([0e58359](https://github.com/engelde/portfolio/commit/0e5835995782fd9aeb8de254d18c303c3a079dfb))
* **deps:** refresh dependencies, pin pnpm 11 and Node 24, build with webpack ([e11435f](https://github.com/engelde/portfolio/commit/e11435fec15468038f2fb270a93f0943a3dedced))
* draw the message form focus ring ([e6a2ece](https://github.com/engelde/portfolio/commit/e6a2eceb2016f123804141ee185dd1bd4a4a00aa))


### 🚚 Chores

* **config:** point editor settings and git blame at biome ([63dccb5](https://github.com/engelde/portfolio/commit/63dccb5bb55f29f43051faeaef26511691883405))
* **release:** release 1.8.0 ([a222d3d](https://github.com/engelde/portfolio/commit/a222d3da01337bd16c3860c17aa91d74190cde1b))


### 💄 Styling

* format codebase with biome ([ce664c4](https://github.com/engelde/portfolio/commit/ce664c4dfbe9d07819c6787adebda114c9fa6456))


### ♻️ Code Refactoring

* decouple Motion and keyframes from Chakra, remove Tailwind ([900ae44](https://github.com/engelde/portfolio/commit/900ae44780df737225ebc921bda955a899dc78cd))
* move sprite keyframes from emotion to plain css ([808c717](https://github.com/engelde/portfolio/commit/808c717d039428dd0459e5823f8932d1083b2065))
* move ui primitives into src/components/ui ([1ec9209](https://github.com/engelde/portfolio/commit/1ec9209c5bfb76b772679b0a54f865db199d795a))
* resolve biome lint findings ([9cbe7f5](https://github.com/engelde/portfolio/commit/9cbe7f5aec5febaa13f88067d4f0bc043d3383ab))
* tighten chakra v3 parity ([daeeb01](https://github.com/engelde/portfolio/commit/daeeb01e554e25dd7007b1f481886fdcacb0cf19))
* wrap chakra components with motion instead of as={motion.x} ([6bacc1a](https://github.com/engelde/portfolio/commit/6bacc1a9f578cd907daade41937162e0d2d616bc))


### 📦 Build System

* **build:** multi-stage standalone Docker image ([47afde3](https://github.com/engelde/portfolio/commit/47afde3dd1ade5cac85e1984d89a5b97ab6378c8))
* **build:** rebuild the docker image as a multi-stage standalone server ([236fc41](https://github.com/engelde/portfolio/commit/236fc419e4d2a2c83027022e5d78dc81e50f8326))
* **deps:** bump next ([155475e](https://github.com/engelde/portfolio/commit/155475ef0f8f6a8665f5877aab7af6cd12ba50fc))
* **deps:** bump next from 15.5.18 to 15.5.21 in the npm_and_yarn group across 1 directory ([6cc62ea](https://github.com/engelde/portfolio/commit/6cc62eaf267cbbf96cd172fca0af88418340dcea))
* **deps:** bump next from 15.5.21 to 15.5.24 in the npm_and_yarn group across 1 directory ([0b514aa](https://github.com/engelde/portfolio/commit/0b514aad4db33b47c2986f03deff009938dbcdad))
* **deps:** bump next in the npm_and_yarn group across 1 directory ([b44a8dd](https://github.com/engelde/portfolio/commit/b44a8ddc55d2a861d1583583f7db424f7178c7c0))
* **deps:** bump postcss ([174894d](https://github.com/engelde/portfolio/commit/174894da7521fdb11f18e246f656386c0ad2cf23))
* **deps:** bump postcss from 8.4.31 to 8.5.8 in the npm_and_yarn group across 1 directory ([11b9e6b](https://github.com/engelde/portfolio/commit/11b9e6b206280dcb351a78395df0b790e7b2cd70))
* **deps:** bump sharp from 0.34.5 to 0.35.0 in the npm_and_yarn group across 1 directory ([5d90858](https://github.com/engelde/portfolio/commit/5d90858d761234ecf84df746f809ed3e133ee8f1))
* **deps:** bump sharp from 0.35.1 to 0.35.4 in the npm_and_yarn group across 1 directory ([ddd74c6](https://github.com/engelde/portfolio/commit/ddd74c6a3248e2591b82632bd054bcb5a7fb2951))
* **deps:** bump sharp in the npm_and_yarn group across 1 directory ([535d54c](https://github.com/engelde/portfolio/commit/535d54ccf6bf74ffc9f76d7d4cdb06b69c2863a4))
* **deps:** bump sharp in the npm_and_yarn group across 1 directory ([5d302a6](https://github.com/engelde/portfolio/commit/5d302a6771a2f8eb338cacf2eff20ab102477d55))
* **deps:** remove tailwind ([1bd2d00](https://github.com/engelde/portfolio/commit/1bd2d006e2b7e9965c0695dc3e4f0eac030c5548))
* **deps:** replace eslint, prettier, husky and lint-staged with biome and lefthook ([77d4651](https://github.com/engelde/portfolio/commit/77d4651f2bce690fc1b42f6c8f834ede35be7860))
* **deps:** replace framer-motion 10 with motion 13 ([173bf33](https://github.com/engelde/portfolio/commit/173bf33f78b56a8061eca9f2e8ecd2ebb789e531))
* **deps:** replace framer-motion with Motion 13 and release 1.8.0 ([bdaad70](https://github.com/engelde/portfolio/commit/bdaad7054d07510287de59e6b294d5a5783fbd79))
* **deps:** switch to Biome and lefthook, add CI and Dependabot config ([d76c56b](https://github.com/engelde/portfolio/commit/d76c56bd82422d98566a9c5b771f3c4a467d9b5d))
* **deps:** TypeScript 7 and finish the Next 16 migration ([46106ac](https://github.com/engelde/portfolio/commit/46106aca33af6b2bd2269481541d8060ddf92b1d))
* **deps:** upgrade to chakra ui v3 ([0a0e481](https://github.com/engelde/portfolio/commit/0a0e481e82a96f98998d463eb0168414ec391705))
* **deps:** upgrade to Chakra UI v3 ([3d4c695](https://github.com/engelde/portfolio/commit/3d4c695f722999f7d120127705a1ea1457d17d62))
* **deps:** upgrade to typescript 7 and finish the next 16 migration ([4eed8ee](https://github.com/engelde/portfolio/commit/4eed8eeb6aced8370a7a43e65f8b3c252973eedb))
* **release:** replace standard-version with release-please ([e518491](https://github.com/engelde/portfolio/commit/e518491bac89de424960a73a17cdfaab4a58f43a))
* **release:** replace standard-version with release-please ([95592a5](https://github.com/engelde/portfolio/commit/95592a51950e3ca8acbada3f4f9a72456fd6d5b0))

### [1.7.6](https://github.com/engelde/portfolio/compare/v1.7.5...v1.7.6) (2026-05-20)


### 🐛 Bug Fixes

* delay one up collection until reveal ([6b29967](https://github.com/engelde/portfolio/commit/6b29967f6c740cd2e89ce074a555b0e5c7d1ff06))

### [1.7.5](https://github.com/engelde/portfolio/compare/v1.7.4...v1.7.5) (2026-05-20)


### 🐛 Bug Fixes

* tighten powerup collision and overlay entry ([9cbe09f](https://github.com/engelde/portfolio/commit/9cbe09f496069c97f01902c636e2ae78c98b3d8f))

### [1.7.4](https://github.com/engelde/portfolio/compare/v1.7.3...v1.7.4) (2026-05-19)


### 🐛 Bug Fixes

* harden hidden message delivery ([9de2b11](https://github.com/engelde/portfolio/commit/9de2b1147f0d1d66ba85c8c3f5b2083bf6719d1d))

### [1.7.3](https://github.com/engelde/portfolio/compare/v1.7.2...v1.7.3) (2026-05-19)


### 🐛 Bug Fixes

* stabilize mobile preloader assets ([cb4eecc](https://github.com/engelde/portfolio/commit/cb4eecc6eb519e31a51a21d06368e9c4136c6a48))

### [1.7.2](https://github.com/engelde/portfolio/compare/v1.7.1...v1.7.2) (2026-05-19)


### 🐛 Bug Fixes

* trigger leaf box from turtle shell ([56437fe](https://github.com/engelde/portfolio/commit/56437fe05756345498765823626115c95a7b5345))

### [1.7.1](https://github.com/engelde/portfolio/compare/v1.7.0...v1.7.1) (2026-05-19)


### 🐛 Bug Fixes

* normalize mario keyboard movement speed ([a6d25e6](https://github.com/engelde/portfolio/commit/a6d25e6c69035550a27a013746cc34a318895666))

## [1.7.0](https://github.com/engelde/portfolio/compare/v1.6.1...v1.7.0) (2026-05-19)


### ✨ Features

* add message validation and turtle shell routes ([f0b3fb0](https://github.com/engelde/portfolio/commit/f0b3fb0dbd74b36db3da99dcfceb11df3c952a4b))

### [1.6.1](https://github.com/engelde/portfolio/compare/v1.6.0...v1.6.1) (2026-05-19)


### 🐛 Bug Fixes

* polish pipe room camera and end flow ([ce6bb89](https://github.com/engelde/portfolio/commit/ce6bb892c9186d91332c111087d342ba036b2c9a))

## [1.6.0](https://github.com/engelde/portfolio/compare/v1.5.0...v1.6.0) (2026-05-19)


### ✨ Features

* refine gameplay interactions ([0539d16](https://github.com/engelde/portfolio/commit/0539d1616f69c455a60692b0339afc5af810ac05))
* refine mario camera and pipe room physics ([872dcc2](https://github.com/engelde/portfolio/commit/872dcc2b7e0870b24a9a969dd033da0af6dd5ae8))
* refine pipe room interactions ([6f47c70](https://github.com/engelde/portfolio/commit/6f47c70470912588892a7a4d2c84764790d82499))


### 🐛 Bug Fixes

* improve intro tooltip interaction ([55a28bc](https://github.com/engelde/portfolio/commit/55a28bc3d663b5664986b98e6fbd4a0965b9c71d))

## [1.5.0](https://github.com/engelde/portfolio/compare/v1.4.0...v1.5.0) (2026-05-19)


### ✨ Features

* add pipe room easter egg ([49eb9b6](https://github.com/engelde/portfolio/commit/49eb9b69eea6c5e6f19ef56741ed8471608515f9))

## [1.4.0](https://github.com/engelde/portfolio/compare/v1.3.0...v1.4.0) (2026-05-17)


### ✨ Features

* add player selection and polish mario sprites ([8bd9837](https://github.com/engelde/portfolio/commit/8bd98370465bea8170674503739c81c254d7d529))

## [1.3.0](https://github.com/engelde/portfolio/compare/v1.2.0...v1.3.0) (2026-05-17)


### 🐛 Bug Fixes

* polish mario enemy animations ([073ea26](https://github.com/engelde/portfolio/commit/073ea26cdfabbf3bf59e1aac183cb597bdd10941))

## [1.2.0](https://github.com/engelde/portfolio/compare/v1.1.3...v1.2.0) (2026-05-17)


### 🐛 Bug Fixes

* improve mario controls and sprite loading ([db49635](https://github.com/engelde/portfolio/commit/db49635194ea759f10211b167b2d3200e9f051c3))
* polish mario gameplay animations ([8d24a3e](https://github.com/engelde/portfolio/commit/8d24a3e0b48e5116a2a009c2be4163f228b29c49))
* polish shell and pipe fire interactions ([16a4bb9](https://github.com/engelde/portfolio/commit/16a4bb9836eb61a58efe90f10733acdb9682556a))
* stabilize mario gameplay interactions ([132fb26](https://github.com/engelde/portfolio/commit/132fb269f4d45bad64836a8c1ca41b523d8af803))

### [1.1.3](https://github.com/engelde/portfolio/compare/v1.1.2...v1.1.3) (2026-05-17)


### 🐛 Bug Fixes

* use public wordmark asset ([856cf14](https://github.com/engelde/portfolio/commit/856cf14c6bfbeaeb57696371729b02140797b53f))

### [1.1.2](https://github.com/engelde/portfolio/compare/v1.1.1...v1.1.2) (2026-05-16)


### 🐛 Bug Fixes

* stabilize readme wordmark rendering ([f1bbae6](https://github.com/engelde/portfolio/commit/f1bbae6edd049ace543ff86ef6effaf1a0f22a0b))

### [1.1.1](https://github.com/engelde/portfolio/compare/v1.1.0...v1.1.1) (2026-05-16)


### 📝 Documentation

* add readme wordmark ([5beabee](https://github.com/engelde/portfolio/commit/5beabeed9f6efee76e94415087737f9be19d18d8))
* center readme wordmark ([b945808](https://github.com/engelde/portfolio/commit/b9458089ac55e061a555b5c42ac0e82535971acb))

## [1.1.0](https://github.com/engelde/portfolio/compare/v1.0.0...v1.1.0) (2026-05-15)


### 🐛 Bug Fixes

* **super-mario:** scope stomp to leaf box, wire coin chain 3-5, fix prize-block side-clip, gate raccoon flight to coin-chain area ([da39e5d](https://github.com/engelde/portfolio/commit/da39e5d393fe1986aff2695425d51f58871c2c41))


### ✨ Features

* **feature:** update flight area ([7aee4dc](https://github.com/engelde/portfolio/commit/7aee4dc60ba0ef3734303b4127d691daff6174dd))

## [1.0.0](https://github.com/engelde/portfolio/compare/v0.3.14...v1.0.0) (2026-05-15)


### ✨ Features

* pause drawer escape close, jagged border, plus refactor and ui polish ([2c40d69](https://github.com/engelde/portfolio/commit/2c40d69160111dfb1858161399b12f656c048573))

### [0.3.15](https://github.com/engelde/portfolio/compare/v0.3.14...v0.3.15) (2026-05-14)


### ✨ Features

* improve jump mechanics and stylize end screen name ([603d4aa](https://github.com/engelde/portfolio/commit/603d4aa94440175403c8dbd83c8b4b13832de452))
* solid ascii name art shared across intro and end screens ([5e1d769](https://github.com/engelde/portfolio/commit/5e1d769ca159217fff26f5a25f5223f1d62a8825))

### [0.3.14](https://github.com/engelde/portfolio/compare/v0.3.13...v0.3.14) (2026-04-02)


### 🚚 Chores

* trigger deployment ([26c8164](https://github.com/engelde/portfolio/commit/26c816400bacd3c5a3f2f807c8bbf85e5c6676ca))


### ✨ Features

* **feature:** update skills ([cf536e8](https://github.com/engelde/portfolio/commit/cf536e80605590e20b65b01a33b5bc94c4840d89))

### [0.3.13](https://github.com/engelde/portfolio/compare/v0.3.12...v0.3.13) (2026-03-31)


### ✨ Features

* **feature:** update skills ([1597e18](https://github.com/engelde/portfolio/commit/1597e182490a588ff19e39aa9c387aeb9ba872cc))

### [0.3.12](https://github.com/engelde/portfolio/compare/v0.3.11...v0.3.12) (2026-03-31)


### ✨ Features

* **feature:** update skills ([893023d](https://github.com/engelde/portfolio/commit/893023db05e122c2e30413709a17d4e44e938834))

### [0.3.11](https://github.com/engelde/portfolio/compare/v0.3.10...v0.3.11) (2026-03-29)


### ✨ Features

* update dependencies and skills showcase ([05e57a0](https://github.com/engelde/portfolio/commit/05e57a07023b1f5c95afb57cf9300164a2668dae))

### [0.3.10](https://github.com/engelde/portfolio/compare/v0.3.9...v0.3.10) (2026-03-29)

### [0.3.9](https://github.com/engelde/portfolio/compare/v0.3.8...v0.3.9) (2026-03-19)


### ✨ Features

* **feature:** add orcid ([94be3b7](https://github.com/engelde/portfolio/commit/94be3b7b94c7ddbc3e1d57981266f35d2d614e69))
* **feature:** update menu and details ([174d38f](https://github.com/engelde/portfolio/commit/174d38f33ca9b372e93d9cfd6077a74506b2e9a6))

### [0.3.8](https://github.com/engelde/portfolio/compare/v0.3.7...v0.3.8) (2025-12-05)


### 🐛 Bug Fixes

* **deps:** patch CVE-2025-66478 ([bc1779c](https://github.com/engelde/portfolio/commit/bc1779c32e3de485b58723e16324cda71dc0eeb0))

### [0.3.7](https://github.com/engelde/portfolio/compare/v0.3.6...v0.3.7) (2025-12-05)


### ♻️ Code Refactoring

* **refactor:** clean up components ([94462c1](https://github.com/engelde/portfolio/commit/94462c1c38fda6791e870ac0fc9efe102574aba1))


### 🐛 Bug Fixes

* **deps:** patch CVE-2025-66478 ([2ad3823](https://github.com/engelde/portfolio/commit/2ad3823fa2dca902afa87eb506213931a57c4661))

### [0.3.6](https://github.com/engelde/portfolio/compare/v0.3.5...v0.3.6) (2025-07-27)


### ✅ Testing

* **test:** add PostHog ([58cf04f](https://github.com/engelde/portfolio/commit/58cf04f532a20983a1c8355dd14cf09f02fbc8e9))


### 💄 Styling

* **style:** add opinionated import order ([02cc7e0](https://github.com/engelde/portfolio/commit/02cc7e004abb61e626ce36ce327c3e4aadb6525f))

### [0.3.5](https://github.com/engelde/portfolio/compare/v0.3.4...v0.3.5) (2025-07-24)

### ✨ Features

- **feature:** update intro ([1b10587](https://github.com/engelde/portfolio/commit/1b10587283f0eca338f6c1915d1b287340399722))

### 🐛 Bug Fixes

- **bug:** fix typos ([efd1846](https://github.com/engelde/portfolio/commit/efd1846156fa8f6e36996803e03421891918334e))
- **bug:** ignore some files when using Docker ([98f2ace](https://github.com/engelde/portfolio/commit/98f2ace5551884bd7b8414d4ed2d74d5e15d3cb1))

### 🚚 Chores

- **config:** bump version ([a649866](https://github.com/engelde/portfolio/commit/a6498665dba27023d8f23f1524abe5092a5a7856))
- **config:** bump version ([7bca505](https://github.com/engelde/portfolio/commit/7bca5051a3964303a4e95168aa78a372ef861e83))

### [0.3.4](https://github.com/engelde/portfolio/compare/v0.3.3...v0.3.4) (2025-07-23)

### 🐛 Bug Fixes

- **bug:** add preview to readme ([e8162f6](https://github.com/engelde/portfolio/commit/e8162f656656900cbb97cdfa8fd88cbbb88db5c7))
- **bug:** fix fireworks content area ([5c1adac](https://github.com/engelde/portfolio/commit/5c1adac4e546cc461b6bbd5c8694e9d8af59d059))

### ✨ Features

- **feature:** add robots.txt ([9a51b21](https://github.com/engelde/portfolio/commit/9a51b21dc9d6a4a02450082eab78971dd9343d49))

### [0.3.3](https://github.com/engelde/portfolio/compare/v0.3.2...v0.3.3) (2025-07-23)

### ✨ Features

- **feature:** update experience ([c65580d](https://github.com/engelde/portfolio/commit/c65580d777a26a038fa9f8f2918d94543ba1bd00))
- **test:** add speed insights ([f98fc46](https://github.com/engelde/portfolio/commit/f98fc465a59c787fd8ac76a5ac7a28c8e5b23f7e))

### [0.3.2](https://github.com/engelde/portfolio/compare/v0.3.1...v0.3.2) (2025-07-23)

### 🐛 Bug Fixes

- **bug:** get version from package.json ([4a2fe97](https://github.com/engelde/portfolio/commit/4a2fe97871571bb67cc645d67875671193a0f3e4))

### [0.3.1](https://github.com/engelde/portfolio/compare/v0.2.6...v0.3.1) (2025-07-23)

### ✨ Features

- **feature:** clean slate ([b2aecf2](https://github.com/engelde/portfolio/commit/b2aecf256b9459c07d56bd51b98f8eb45ce708d7))
- **feature:** set up git hooks, formatting, linting, and better commits ([89439ae](https://github.com/engelde/portfolio/commit/89439aec404241eb8a65b2862b9f6283da7dc41d))

### 📝 Documentation

- **docs:** update README ([40c3dfb](https://github.com/engelde/portfolio/commit/40c3dfbf9b74f1f44ebafaceec19ae93cb743e52))

### 🚚 Chores

- **refactor:** refactor source ([eea6a07](https://github.com/engelde/portfolio/commit/eea6a07786e07aa3e7cb9c3dc43320124daf64bc))
- **refactor:** remove deprecated code ([c4d2416](https://github.com/engelde/portfolio/commit/c4d2416f8b18af0babf3880160e22debf23ee61e))
- **release:** 0.3.1 ([807cd02](https://github.com/engelde/portfolio/commit/807cd028d754ade35f40fab9389a4cd3d8d97e69))
