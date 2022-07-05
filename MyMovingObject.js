import {CGFobject} from '../lib/CGF.js';
import { MyFish } from './MyFish.js';
import { MyPyramid } from './MyPyramid.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyMovingObject extends CGFobject {
    constructor(scene, object) {
        super(scene);
        this.scene = scene;

        this.object = object;
        this.heightInitial = this.object == MyFish? this.object.getHeight() : 0;

        this.x = 0;
        this.y = this.heightInitial;
        this.z = 0;
        this.rotation = 0;         // angle around the y axis
        this.speed = 0;
        this.moveUp = false;
        this.moveDown = false;
    }

    update() {
        this.x += this.speed*Math.sin(this.rotation*Math.PI/180.0) * this.scene.speedFactor * (this.scene.elapsedTime/1000.0);
        this.z += this.speed*Math.cos(this.rotation*Math.PI/180.0) * this.scene.speedFactor * (this.scene.elapsedTime/1000.0);

        // Move up
        if(this.moveUp) {
            if(this.y < 3)
                this.y += 0.1;
            else
                this.moveUp = false;
        } else if(this.moveDown) {
            if(this.y > -2.0)
                this.y -= 0.1;
            else 
                this.moveDown = false;
        }

        this.scene.fishSpeed = this.speed; 
    }

    setMoveUp() {
        this.moveUp = true;
        this.moveDown = false;
    }

    setMoveDown() {
        this.moveDown = true;
        this.moveUp = false;
    }

    turn(val) {
        this.rotation += val * (this.scene.elapsedTime/1000.0);
    }

    accelerate(val) {
        this.speed += val * (this.scene.elapsedTime/1000.0);
        if(this.speed < 0) 
            this.speed = 0; 
    }

    reset() {
        this.speed = 0;
        this.rotation = 0;
        this.x = 0;
        this.y = this.heightInitial;
        this.z = 0;

        this.moveUp = false;
        this.moveDown = false;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.rotation*Math.PI/180, 0, 1,0);
        if(this.object == MyPyramid)
            this.scene.translate(0,0,-1); // center pyramid at origin

        this.object.display();

        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.object.enableNormalViz();
    }

    disableNormalViz() {
        this.object.disableNormalViz();
    }

    getObject() {
        return this.object;
    }
}


