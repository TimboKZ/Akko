# ![Akko Music Visualising Framework](https://s3-eu-central-1.amazonaws.com/foxypanda-ghost/2017/08/akko.png)

Music visualising framework based on WebGL and Web Audio API.

> This project is still in active development, some APIs are likely to change. Please create [a new issue](https://github.com/TimboKZ/Akko/issues) if you find any bugs.

# Examples

![Akko custom visualiser example](https://s3-eu-central-1.amazonaws.com/foxypanda-ghost/2017/08/Akko-Custom-Visualiser.png)

[(online demo)](https://demos.kawaiidesu.me/akko/)

All of the examples are located in the `examples/` folder. If you have [Node.js](https://nodejs.org/en/) installed, you can clone this repo then run `npm install` and `npm run examples` to start a local server. Alternatively, you could upload clone this repo to your own web server.

# Getting started

The graphics component of Akko is based on [three.js](https://threejs.org/). In fact, Akko can be thought of as a convenient wrapper around three.js that handles music playback and audio analysis for you, as well as several other handy features. You can add tracks to Akko both programmatically and through user input. These tracks can later be played and visualised using default visualisers or custom, user-defined visualisers. **Note:** Both [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) and [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) require modern browsers.

To try Akko, load it's JS and CSS files, as well as 2 of its external dependencies. You might also have to set the height for Akko's container.

```html
<!-- Akko's dependencies -->
<script src="https://cdn.jsdelivr.net/bluebird/latest/bluebird.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"></script>

<!-- Akko files -->
<link rel="stylesheet" href="path/to/akko.min.css"/>
<script src="path/to/akko.js"></script>

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
    var akko = new Akko({autoPlay: true});
    akko.start();
</script>
```

You can now drag & drop an audio file onto the visualiser to start playback. Alternatively, you can use one of the input buttons in the menu in the top left of the screen.