# Akko v0.1.0 API reference

Table of contents:

* [`new Akko([options])`](#new-akkooptions)
* [`Akko.visualisers`](#akkovisualisers)
* [`Akko.Visualiser`](#akkovisualiser)

## `new Akko([options])`

Creates a new instance of Akko. A single page can have multiple instances of Akko running at the same time, although this is not recommended. Example usage:

```javascript
let options = {
    autoPlay: true,
};
let akko = new Akko(options);
akko.addTrack('https://<your-website>/music.mp3');
akko.start();
```

The optional `options` object defines Akko's behaviour. Available options:

| Property                | Description                                                                                                                  | Type    | Default |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------|---------|---------|
| `containerId`           | ID of the element to which Akko's `<canvas>` and UI will be appended.                                                        | String  | `'akko'`  |
| `useDefaultVisualisers` | If you only want to use custom visualisers, you can tweak this setting to disable Akko's default visualisers out-of-the-box. | Boolean | `true`    |
| `autoPlay`              | Automatically start playing the first track (if it's available) as soon as `.start()` method is called.                      | Boolean | `false`   |

### Methods

#### `.start()`

Starts the instance. This method bootstraps Akko's [Preact](https://preactjs.com/) UI, enables its visualisation core and music player, and sets up event listeners.

#### `.addVisualiser(visualiser)`

* `visualiser` - Instance of `Akko.Visualiser`.

Adds a visualiser to the current Akko instance. Users can switch between all available visualisers using the controls on Akko's canvas.

**Visualiser instances cannot be shared by multiple Akko instances**, so make sure to create brand new instance of a Visualiser for every Akko instance.

#### `.addTrack(source[, title])`

* `source` - An instance of `File` or `ArrayBuffer`, or a string representing the URL of an audio file.
* `title` *(optional)* - Title of the track as it will be shown in the track list.

Adds a track to the music player. If this method is called after `.start()` the player will automatically play the newly added track once it's loaded. If no `title` was specified, the title is extracted from the filename. If `source` is an `ArrayBuffer`, the default `title` is `Untitled`.

## `Akko.visualisers`

Object defining default visualisers. Available visualisers: `BarVisualiser`, `RingVisualiser`. Example usage:

```javascript
let akko = new Akko({useDefaultVisualisers: false});
akko.addVisualiser(new Akko.visualisers.RingVisualiser());
akko.addVisualiser(new Akko.visualisers.BarVisualiser());
akko.start();
```

## `Akko.Visualiser`

Abstract class defining a visualiser. Should be extended when creating custom visualisers. Example usage in ES6:

```javascript
class MyVisualiser extends Akko.Visualiser {
    constructor() {
        super({
            code: 'Mv',
            name: 'My Visualiser!',
            fftSize: 128,
            smoothingTimeConstant: 0.5,
        });
    }
    onInit(data) { /* ... */ }
    onUpdate(data) { /* ... */ }
    onDestroy(data) { /* ... */ }
    onResize(data) { /* ... */ }
    onPause(data) { /* ... */ }
    onRevive(data) { /* ... */ }
}

let akko = new Akko({useDefaultVisualisers: false});
akko.addVisualiser(new MyVisualiser());
akko.start();
```

### Constructor

#### `new Akko.Visualiser(options)`

* `options`
    * `options.code` - A 2 character long string to be used a shorthand for visualiser's name.
    * `options.name` - The name of this visualiser, will be displayed in the visualiser selection menu.
    * `options.fftSize` - Current visualiser's desired `fftSize` for [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize).
    * `options.smoothingTimeConstant` - Current visualiser's desired `smoothingTimeConstant` for [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant).

Should be called as `super(options)` in your code (see example above). `fftSize` and `smoothingTimeConstant` will be applied to the `AnalyserNode` every time the visualiser is initialised or revived, only need to declare them here.

### Abstract methods (must be overridden)

#### `.onInit(data)`

* `data`
    * `data.renderer` - Instance of [three.js `WebGLRenderer`](https://threejs.org/docs/#api/renderers/WebGLRenderer). Shared by all visualisers.
    * `data.analyser` - Instance of [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode). Handles audio analysis. Shared by all visualisers.
    * `data.width` - Current width of the `<canvas>` as an integer.
    * `data.height` - Current height of the `<canvas>` as an integer.
    
Called once when the visualiser is selected for the first time. This method should setup your `THREE.Scene`, `THREE.Camera` and any other relevant variables. You can also adjust `data.renderer` settings to match your desired setup.

#### `.onUpdate(data)`

* `data`
    * `data.renderer` - Instance of [three.js `WebGLRenderer`](https://threejs.org/docs/#api/renderers/WebGLRenderer). Shared by all visualisers.
    * `data.analyser` - Instance of [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode). Handles audio analysis. Shared by all visualisers.
    * `data.frequencyData` - `Float32Array` of length `data.analyser.frequencyBinCount`. Obtained using [`getFloatFrequencyData()` method](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatFrequencyData).
    * `data.timeDomainData` - `Float32Array` of length `data.analyser.frequencyBinCount`. Obtained using [`getFloatTimeDomainData()` method](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData).
    
Called 30 times every second (i.e. 30 FPS) **while your visualiser is active**. This method should be used to update the graphics of your visualiser to match the music.

#### `.onDestroy()`
    
Called on all visualisers when the instance of Akko is destroyed. This method should free any objects you were using, clear all timeouts, etc. The purpose of this method is to make sure that the visualiser can be garbage collected.

### Instance methods (can be overridden)

#### `.onResize(data)`

* `data`
    * `data.renderer` - Instance of [three.js `WebGLRenderer`](https://threejs.org/docs/#api/renderers/WebGLRenderer). Shared by all visualisers.
    * `data.analyser` - Instance of [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode). Handles audio analysis. Shared by all visualisers.
    * `data.width` - Current width of the `<canvas>` as an integer.
    * `data.height` - Current height of the `<canvas>` as an integer.
    
Called every time Akko's container element is resized. This method should adjust the aspect ratio of your cameras and perform any other relevant tweaks. Note that this does not necessarily correlate with the window being resized, because Akko can be used as an inline element.

`onResize()` is also called every time the visualiser is initialised or revived.

#### `.onPause()`
    
Called every time Akko switches from your visualiser to some other visualiser. Once this method is called, you no longer have control over the visualisation process so make sure to clear any timeouts and put your visualiser into the 'idle' mode.

#### `.onRevive(data)`

* `data`
    * `data.renderer` - Instance of [three.js `WebGLRenderer`](https://threejs.org/docs/#api/renderers/WebGLRenderer). Shared by all visualisers.
    * `data.analyser` - Instance of [Web Audio API `AnalyserNode`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/AnalyserNode). Handles audio analysis. Shared by all visualisers.
    * `data.width` - Current width of the `<canvas>` as an integer.
    * `data.height` - Current height of the `<canvas>` as an integer.
    
Called every time Akko switches from some other visualiser to your visualiser, given it has already been initialised. I.e. the first time your visualiser is selected, `onInit(data)` is called, but all subsequent activations will call `onRevive(data)`. This method should change `data.renderer` to your desired setup and make any other relevant tweaks.
