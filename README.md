# ![Akko Music Visualisation Framework](https://s3-eu-central-1.amazonaws.com/foxypanda-ghost/2017/10/akko.png)

[![npm](https://img.shields.io/npm/v/akko.svg)](https://www.npmjs.com/package/akko)
[![npm](https://img.shields.io/npm/dt/akko.svg)](https://www.npmjs.com/package/akko)
[![Join the chat at https://gitter.im/akko-vis/Lobby](https://badges.gitter.im/akko-vis/Lobby.svg)](https://gitter.im/akko-vis/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Music visualisation framework based on WebGL and Web Audio API.

> This project is still in early development stage, some APIs are likely to change. Please create [a new issue](https://github.com/TimboKZ/Akko/issues) if you find any bugs.

# Introduction 

Akko's main purpose is to make writing music visualisers easy. It defines a robust, standardised framework for the task - you can focus on writing your visualiser without worrying about music playback, controls, or audio analysis. Once you're happy with your visualiser, you can put it into `.js` file and publish it online for other Akko users to enjoy.

Akko uses [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) and [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). This somewhat limits browser support, so you might want to check if it's supported in your browser: [here](https://caniuse.com/#feat=webgl) for WebGL and [here](http://caniuse.com/#feat=audio-api) for Web Audio API.

The graphics component of Akko is based on [three.js](https://threejs.org/). This means you'll be using three.js to write your visualisers. There are tons of learning resources online and Akko comes with several default visualisers to help you get started (see `lib/visualisers/`).

# API

See the detailed [API reference](https://github.com/TimboKZ/Akko/blob/master/API.md).

# Examples

![Akko custom visualiser example](https://s3-eu-central-1.amazonaws.com/foxypanda-ghost/2017/08/Akko-Custom-Visualiser.png)

[(online demo)](https://demos.kawaiidesu.me/akko/)

Example Akko setups are located in the `examples/` folder. If you have [Node.js](https://nodejs.org/en/) installed, you can clone this repo then run `npm install` and `npm run examples` to start a local server. Alternatively, you could upload clone this repo to your own web server.

If you want to see what a simple Akko visualiser looks like, check out the `lib/visualisers/` folder. Examples there are pretty basic, but remember that you have all [three.js](https://threejs.org/) features at your disposal.

# Features

* Audio playback, analysis and control using Web Audio API.
* Visualisation framework built on WebGL and three.js.
* Visualiser selection menu allowing users to switch between multiple visualisers.
* Simple visualiser abstraction that lets you publish your visualiser and use visualisers developed by others.
* Real-time playlist allowing users to add tracks by URL, as a file upload or by drag & dropping a file into the visualiser. 

# Getting started

To try Akko, add it's JS and CSS files, as well as 2 of its external dependencies to your page. You might also have to set the height for Akko's container.

```html
<!-- Akko's dependencies -->
<script src="https://cdn.jsdelivr.net/bluebird/latest/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"></script>

<!-- Akko files -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/akko@0.1.0/dist/akko.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/akko@0.1.0/dist/akko.min.js"></script>

<!-- Set the height for Akko's container -->
<style>
#akko {
    height: 500px;
}
</style>
```

Then, inside the `<body>` of your page, create a `<div>` container and launch Akko:

```html
<div id="akko"></div>
<script>
    var akko = new Akko();
    akko.start();
</script>
```

You can now drag & drop an audio file into the visualiser to start playback. You could also use one of the input buttons in the menu in the top left of the screen. See [Examples](#examples) to learn how to define custom visualisers. You can also [jsDelivr CDN](https://www.jsdelivr.com/package/npm/akko) to load Akko's files:

Alternatively, if you're using Node.js for your project:

```bash
npm install --save akko
```

Then:

```javascript
const Akko = require('akko');
```

# Contributing

This project is still in its early development phase, so a lot of things are likely to change. If you want to extend the source code, please [create a new issue](https://github.com/TimboKZ/Akko/issues) so we can discuss the changes you want to make before you start.

All of the source code is written in ES6, except for some inline JS in the `examples/` directory. For developers' convenience, `npm run examples` and `npm run watch` are provided, starting the local dev server and Webpack watchers respectively. When making a pull request, make sure `npm run lint` returns no errors. Units and integrations tests coming soon. 
