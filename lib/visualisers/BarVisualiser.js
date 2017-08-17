/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');
const Visualiser = require('../Visualiser');

const BAR_COUNT = 32;

class BarVisualiser extends Visualiser {

    constructor() {
        super('Ba', 'Bars', BAR_COUNT * 2);
    }

    onInit(data) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, data.width / data.height, 0.1, 10);
        this.camera.position.z = 10;

        this.bars = [];
        let step = 0.5;
        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        for (let i = 0; i < BAR_COUNT; i++) {
            let material = new THREE.MeshBasicMaterial({color: 0xff0000 + i * 5});
            let cube = new THREE.Mesh(geometry, material);
            cube.position.set(-8 + i * step, 0, 0);
            this.scene.add(cube);
            this.bars.push(cube);
        }

    }

    onUpdate(data) {
        for (let i = 0; i < BAR_COUNT; i++) {
            let value = data.frequencyData[i] / 20;
            if (value === 0) value = 0.0001;
            this.bars[i].scale.set(1, value, 1);
        }
        data.renderer.render(this.scene, this.camera);
    }

    onResize(data) {
        let step = 0.5;
        for (let i = 0; i < BAR_COUNT; i++) {
            this.bars[i].position.set(-8 + i * step, 0, 0);
        }
        this.camera.aspect = data.width / data.height;
        this.camera.updateProjectionMatrix();
    }

    onDestroy() {
        delete this.scene;
    }

}

module.exports = BarVisualiser;
