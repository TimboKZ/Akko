/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');
const Visualiser = require('../Visualiser');

const RING_COUNT = 16;

class RingVisualiser extends Visualiser {

    constructor() {
        super({
            code: 'Rn',
            name: 'Rings 2D',
            fftSize: RING_COUNT * 2,
            smoothingTimeConstant: 0.9,
        });
    }

    onInit(data) {
        this.setupSceneAndCamera(data);
        this.setupRings();
    }

    setupSceneAndCamera(data) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, data.width / data.height, 0.1, 100);
        this.camera.position.z = 20;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.scene.add(this.camera);
    }

    setupRings() {
        this.rings = [];
        let hslStep = 1 / RING_COUNT;
        for (let i = 0; i < RING_COUNT; i++) {
            let radius = 2 + i;
            let segments = 64;
            let material = new THREE.LineBasicMaterial({color: 0x0000ff * i});
            material.color.setHSL(hslStep * i, 1, 0.5);
            let geometry = new THREE.CircleGeometry(radius, segments);
            let ring = new THREE.Line(geometry, material);
            this.scene.add(ring);
            this.rings.push(ring);
        }

    }

    onUpdate(data) {
        for (let i = 0; i < RING_COUNT; i++) {
            let ring = this.rings[i];
            let timeDomain = data.timeDomainData[i];
            let frequency = Math.abs(data.frequencyData[i]);
            let scale = this.lerp(ring.scale.x, frequency * timeDomain, 0.01);
            scale = this.constrain(2, 0.5, scale);
            ring.scale.set(scale, scale, scale);
            ring.rotation.z += 0.002 * i;
        }
        data.renderer.render(this.scene, this.camera);
    }

    onResize(data) {
        this.camera.aspect = data.width / data.height;
        this.camera.updateProjectionMatrix();
    }

    onDestroy() {
        delete this.scene;
        delete this.camera;
    }

}

module.exports = RingVisualiser;
