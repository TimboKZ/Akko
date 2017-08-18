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
        super({
            code: 'Ba',
            name: 'Bars',
            fftSize: BAR_COUNT * 2,
            smoothingTimeConstant: 0.9,
        });
    }

    onInit(data) {
        this.setupSceneAndCamera(data);
        this.prepareRenderer(data);
        this.setupLights(data);
        this.setupPlane(data);
        this.setupBars(data);
    }

    prepareRenderer(data) {
        data.renderer.shadowMap.enabled = true;
        data.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    setupSceneAndCamera(data) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, data.width / data.height, 0.1, 100);
        this.camera.position.set(0, 15, 17);
        this.camera.rotation.x = -Math.PI / 4;
        this.cameraPivot = new THREE.Object3D();
        this.cameraPivot.add(this.camera);
        this.cameraPivot.castShadow = true;
        this.scene.add(this.cameraPivot);
    }

    setupLights() {
        let ambientLight = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambientLight);
    }

    setupPlane() {
        let planeGeometry = new THREE.PlaneGeometry(200, 200, 1);
        let planeMaterial = new THREE.MeshPhongMaterial({color: 0x444444, side: THREE.DoubleSide});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = Math.PI / 2;
        this.scene.add(plane);
    }

    setupBars() {
        this.bars = [];
        this.lights = [];
        this.cubeLights = [];
        let step = 2 * Math.PI / BAR_COUNT;
        let geometry = new THREE.BoxGeometry(0.5, 10, 0.5);
        let radius = 5;
        for (let i = 0; i < BAR_COUNT; i++) {
            let color = 0xff0000 + i * 5;
            let bar = new THREE.Object3D();
            let material = new THREE.MeshLambertMaterial({color});
            let cube = new THREE.Mesh(geometry, material);
            let cubeLight = new THREE.PointLight(color, 0, 4);
            cubeLight.position.y = 7;
            cubeLight.position.x = -1;
            cube.add(cubeLight);
            let light = new THREE.PointLight(color, 0, 10);
            light.position.y = 1;
            light.position.x = 10;
            bar.add(light);
            bar.add(cube);
            bar.position.x = radius;
            cube.position.y = -4.8;
            let pivot = new THREE.Object3D();
            pivot.rotation.y = step * i;
            pivot.add(bar);
            this.scene.add(pivot);
            this.bars.push(cube);
            this.lights.push(light);
            this.cubeLights.push(cubeLight);
        }
    }

    onRevive(data) {
        this.prepareRenderer(data);
    }

    onUpdate(data) {
        for (let i = 0; i < BAR_COUNT; i++) {
            let bar = this.bars[i];
            let light = this.lights[i];
            let cubeLight = this.cubeLights[i];
            let frequency = Math.abs(data.frequencyData[i]);
            let timeDomain = data.timeDomainData[i];

            let value = frequency * timeDomain;
            if (value === Infinity || value === -Infinity) continue;
            let newY = bar.position.y + (value - bar.position.y) / 30;
            if (isNaN(newY)) continue;

            light.intensity = Math.max(0, newY);
            cubeLight.intensity = Math.max(0, newY) * 0.5;
            bar.position.y = newY;
        }
        this.cameraPivot.rotation.y += 0.01;
        data.renderer.render(this.scene, this.camera);
    }

    onResize(data) {
        this.camera.aspect = data.width / data.height;
        this.camera.updateProjectionMatrix();
    }

    onDestroy() {
        delete this.scene;
    }

}

module.exports = BarVisualiser;
