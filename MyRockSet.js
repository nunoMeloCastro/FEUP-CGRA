import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { getRandomNumber } from './utils/utils.js'

export class MyRockSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} numRocks - number of rocks
   */
  constructor(scene, numRocks) {
    super(scene);
    this.scene = scene;
    this.rocks = [];
    this.rocksCoords = [];
    this.rockScaleFactors = [];
    this.numRocks = numRocks;
    this.moveRock = false;

    this.initRocks();
    this.initMaterials();
    }


    initRocks() {
        let maxCoord = 20 - 0.2;
        for(let i = 0; i < this.numRocks; i++) {
            let x = getRandomNumber(-maxCoord, maxCoord);
            console.log("x = " + x);
            let y = 0;
            let z = getRandomNumber(-maxCoord, maxCoord);

            let xScaleFactor = getRandomNumber(0.2, 0.4);
            let yScaleFactor = getRandomNumber(0.1, 0.2);
            let zScaleFactor = xScaleFactor;

            this.rocksCoords.push(x, y, z);
            this.rockScaleFactors.push(xScaleFactor, yScaleFactor, zScaleFactor);
            this.rocks.push(new MyRock(this.scene, 24, 12));
        }
    }

    initMaterials() {
        this.rockAppearence = new CGFappearance(this.scene);
        this.rockAppearence.setAmbient(0.15, 0.15, 0.15, 1.0);
        this.rockAppearence.setDiffuse(0.15, 0.15, 0.15, 1.0);
        this.rockAppearence.setSpecular(0.15, 0.15, 0.15, 1.0);
        this.rockAppearence.setEmission(0.15, 0.15, 0.15, 1.0);
        this.rockAppearence.setShininess(120);
    }

    update(index){
        if (this.moveRock){
            this.rocksCoords[index] = this.scene.fish.x + Math.sin(this.scene.fish.getRotation()*Math.PI/180) * 0.49;
            this.rocksCoords[index + 1] = this.scene.fish.y + 2.8;
            this.rocksCoords[index + 2] = this.scene.fish.z + Math.cos(this.scene.fish.getRotation() * Math.PI/180) * 0.49;
        }
    }

    setMovingRock(){
        this.moveRock = true;
    }

    disableMovingRock(){
        this.moveRock = false;
    }

    display() {

        for(let i = 0; i < this.numRocks*3; i+=3) {
            let x = this.rocksCoords[i];
            let y = this.rocksCoords[i + 1];
            let z = this.rocksCoords[i + 2];

            let xScaleFactor = this.rockScaleFactors[i];
            let yScaleFactor = this.rockScaleFactors[i + 1];
            let zScaleFactor = this.rockScaleFactors[i + 2];

            this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.scene.scale(xScaleFactor, yScaleFactor, zScaleFactor);
            this.rockAppearence.apply();
            this.rocks[i / 3].display();
            this.scene.popMatrix();
        }
    }
}
