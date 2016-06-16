#Yet Another Podcast Player 

A simple podcast app built with Vue.js.  Currently this is pre-alpha quality software, with a minimal state of functionality.

## Why?

To my knowledge, the only other open source podcast player with a web interface is gPodder (GPLv3). I am not a big fan of copyleft, and wanted a chance to develop my frontend skills so this seemed like an appropriate project.

Built with [VuePack](https://github.com/egoist/VuePack) by [egoist](https://github.com/egoist)
# VuePack

[![release](https://img.shields.io/github/release/egoist/vuepack.svg)](https://github.com/egoist/vuepack/releases)
![extra](https://img.shields.io/badge/actively%20maintained-yes-ff69b4.svg)

## Technologies

- Vue
- Webpack
- Babel 6
- Vuex
- Vue-Router
- Hot reloading components and Vuex mutations
- PostCSS & cssnext
- Autoprefixer

## Quick Start

```bash
$ git clone https://github.com/egoist/vuepack.git 
$ cd vuepack
$ npm install
$ npm run dev
# open http://localhost:3030
```

## Usage

|Command|Description|
|---|---|
|npm install|Install dependencies|
|npm run dev|Run webpack and server with hot-reload enabled|
|npm run build|Build assets for production use, dumped in `./build`|

## Customize the devServer

You can directly modify [scripts/devServer.js](https://github.com/egoist/vuepack/blob/master/scripts/devServer.js) since it simply uses [Express](http://expressjs.com) under the hood. 

Or, in a more recommended way, update the [scripts/wrap.js](https://github.com/egoist/vuepack/blob/master/scripts/wrap.js) instead.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
