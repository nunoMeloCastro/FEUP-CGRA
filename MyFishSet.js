import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { getRandomNumber } from './utils/utils.js'

export class MyFishSet extends CGFobject {
  /**
   * @method constructor
   * @param  {CGFscene} scene - MyScene object
   * @param  {integer} numFish - number of rocks
   */
  constructor(scene, numFish) {
    super(scene);
    this.scene = scene;
    this.fishSet = [];
    this.xPos = [];
    this.yPos = [];
    this.zPos = [];
    this.radius = [];
    this.angl =[];
    this.scale = [];
    this.numFish = numFish;
    this.initFish();
    }

    initFish() {
        for(let i = 0; i < this.numFish; i++) {
            this.angl.push(getRandomNumber(0, 360));
            this.xPos.push(getRandomNumber(-15, 15));
            this.yPos.push(getRandomNumber(1, 7));
            this.zPos.push(getRandomNumber(-15, 15));
            this.radius.push(getRandomNumber(3, 7));

            this.rShade = getRandomNumber(0, 1);
            this.gShade = getRandomNumber(0, 1);
            this.bShade = getRandomNumber(0, 1);
            this.color = [this.rShade, this.gShade,this.bShade];

            this.scale.push(getRandomNumber(0.5, 3.0));

            this.fishSet.push(new MyFish(this.scene, getRandomNumber(20, 80), this.color, this.scene.bodyTexture));
        }
    }

    display() {
        for(let i = 0; i < this.numFish; i++) {

            this.scene.pushMatrix();
            this.scene.translate(this.xPos[i], this.yPos[i], this.zPos[i])
            this.scene.rotate(this.scene.speedFactor * (this.scene.actualTime/1000.0), 0, 1, 0);
            this.scene.rotate((this.angl[i])*3, 0, 1, 0);
            this.scene.translate(0, 0, this.radius[i]);
            this.scene.rotate(90*Math.PI/180, 0, 1, 0);
            this.scene.scale(this.scale[i], this.scale[i], this.scale[i]);
            this.scene.translate(0, -3, 0);
            
            this.fishSet[i].display();
            this.scene.popMatrix();
        }
    }
}
