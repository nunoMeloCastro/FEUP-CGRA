import {CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';
import { MyPyramid } from './MyPyramid.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyMovingFish extends MyMovingObject {
    constructor(scene, ratio, color, bodyTexture) {
        //let fish = new MyFish(scene, ratio, color, bodyTexture);
        super(scene, new MyFish(scene, ratio, color, bodyTexture));
        this.fish = this.getObject();
        this.up = false;
        this.down = false;
    }

    getRotation() {
        return this.rotation;
    }
}


