import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyPyramid } from './MyPyramid.js';
import { getRandomNumber } from './utils/utils.js';

export class MyAlgaeGroup extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} numAlgaes - number of algaes
   */
    constructor(scene, numAlgaes, minCoord, maxCoord) {
        super(scene);
        this.scene = scene;
        this.algaes = [];
        this.algaeCoords = [];
        this.algaeScaleFactors = [];
        this.algaeRShade = [];
        this.algaeGShade = [];
        this.algaeBShade = [];
        this.numAlgaes = numAlgaes;
        this.minCoord = minCoord;
        this.maxCoord = maxCoord;
        this.xTranslation = 0;
        this.zTranslation = 0;

        this.initAlgaes();
        this.initMaterials();
    }

    initAlgaes() {
        let x = 0;
        let y = 0; 
        let z = 0;
        for(let i = 0; i < this.numAlgaes; i++) {
            x = getRandomNumber(this.minCoord, this.maxCoord);
            y = 0;
            z = getRandomNumber(this.minCoord, this.maxCoord);

            let xScaleFactor = getRandomNumber(0.15, 0.4);
            let yScaleFactor = getRandomNumber(0.2, 2.0); 
            let zScaleFactor = getRandomNumber(0.15, 0.4); 

            let rFactor = getRandomNumber(0.0, 0.3);
            let gFactor = getRandomNumber(0.3, 1.0);
            let bFactor = getRandomNumber(0.0, 0.3);

            let slices = getRandomNumber(3, 7);

            this.algaeCoords.push(x, y, z);
            this.algaeScaleFactors.push(xScaleFactor, yScaleFactor, zScaleFactor);
            this.algaeRShade.push(rFactor);
            this.algaeGShade.push(gFactor);
            this.algaeBShade.push(bFactor);
            this.algaes.push(new MyPyramid(this.scene, slices));
        }

        let r = 20 - this.maxCoord;
        this.xTranslation = getRandomNumber(-r, r);
        this.zTranslation = getRandomNumber(-r, r);

    }

    initMaterials(rFactor, gFactor, bFactor) {
        this.algaeAppearance = new CGFappearance(this.scene);
        this.algaeAppearance.setAmbient(rFactor, gFactor, bFactor, 1.0);
        this.algaeAppearance.setDiffuse(rFactor, gFactor, bFactor, 1.0);
        this.algaeAppearance.setSpecular(rFactor, gFactor, bFactor, 1.0);
        this.algaeAppearance.setEmission(rFactor, gFactor, bFactor, 1.0);
        this.algaeAppearance.setShininess(120);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xTranslation, 0, this.zTranslation);

        for(let i = 0; i < this.numAlgaes*3; i+=3) {
            let x = this.algaeCoords[i];
            let y = this.algaeCoords[i + 1];
            let z = this.algaeCoords[i + 2];

            let xScaleFactor = this.algaeScaleFactors[i];
            let yScaleFactor = this.algaeScaleFactors[i + 1];
            let zScaleFactor = this.algaeScaleFactors[i + 2];

            this.initMaterials(this.algaeRShade[i / 3], this.algaeGShade[i / 3], this.algaeBShade[i / 3]);

            this.scene.pushMatrix();
            this.scene.translate(x, y, z);
            this.scene.scale(xScaleFactor, yScaleFactor, zScaleFactor);
            this.scene.rotate(Math.PI/2, -1, 0, 0);
            this.algaeAppearance.apply();
            this.algaes[i / 3].display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }
}
