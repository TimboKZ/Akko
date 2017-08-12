/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');
const Visualiser = require('../Visualiser');

class RingVisualiser extends Visualiser {

    constructor() {
        super('Rn', 'The Ring');
    }

    onInit(renderer, width, height) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    onUpdate(renderer) {
        this.cube.rotation.x += 0.1;
        renderer.render(this.scene, this.camera);
    }

    onResize(renderer, width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    onDestroy() {
        delete this.scene;
    }

}

module.exports = RingVisualiser;
