import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCubeMap extends CGFobject {
	constructor(scene) {
		super(scene);

        //Initialize quad
		this.quad = new MyQuad(scene);
        this.scene = scene;

        this.initMaterials();
        this.initTextures();
	}

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.material.setEmission(1.0, 1.0, 1.0, 1.0);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(10.0);
        this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    initTextures() {
        // ----- Demo
        this.topDemoTexture= new CGFtexture(this.scene, 'images/demo_cubemap/top.png');
        this.frontDemoTexture = new CGFtexture(this.scene, 'images/demo_cubemap/front.png');
        this.rightDemoTexture = new CGFtexture(this.scene, 'images/demo_cubemap/right.png');
        this.backDemoTexture = new CGFtexture(this.scene, 'images/demo_cubemap/back.png');
        this.leftDemoTexture = new CGFtexture(this.scene, 'images/demo_cubemap/left.png');
        this.bottomDemoTexture = new CGFtexture(this.scene, 'images/demo_cubemap/bottom.png');
        // -----

        // ----- Test
        this.topTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/py.png');
        this.frontTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/nz.png');
        this.rightTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/px.png');
        this.backTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/pz.png');
        this.leftTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/nx.png');
        this.bottomTestTexture = new CGFtexture(this.scene, 'images/test_cubemap/ny.png');
        // -----

        // ----- Underwater 1
        this.topUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/top.jpg');
        this.frontUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/front.jpg');
        this.rightUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/right.jpg');
        this.backUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/back.jpg');
        this.leftUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/left.jpg');
        this.bottomUnderwaterTexture1 = new CGFtexture(this.scene, 'images/underwater_cubemap/bottom.jpg');
        // -----

        // ----- Underwater 2
        this.topUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/top.png');
        this.frontUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/front.png');
        this.rightUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/right.png');
        this.backUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/back.png');
        this.leftUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/left.png');
        this.bottomUnderwaterTexture2 = new CGFtexture(this.scene, 'images/underwater2_cubemap/bottom.png');
        // -----

        this.topTextures = [this.topDemoTexture, this.topTestTexture, this.topUnderwaterTexture1, this.topUnderwaterTexture2];
        this.frontTextures = [this.frontDemoTexture, this.frontTestTexture, this.frontUnderwaterTexture1, this.frontUnderwaterTexture2];
        this.rightTextures = [this.rightDemoTexture, this.rightTestTexture, this.rightUnderwaterTexture1, this.rightUnderwaterTexture2];
        this.backTextures = [this.backDemoTexture, this.backTestTexture, this.backUnderwaterTexture1, this.backUnderwaterTexture2];
        this.leftTextures = [this.leftDemoTexture, this.leftTestTexture, this.leftUnderwaterTexture1, this.leftUnderwaterTexture2];
        this.bottomTextures = [this.bottomDemoTexture, this.bottomTestTexture, this.bottomUnderwaterTexture1, this.bottomUnderwaterTexture2];
    }

    display(){

        // ----- Top face
        this.scene.pushMatrix();
        this.scene.translate(0, this.quad.side, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);

        this.material.setTexture(this.topTextures[this.scene.selectedBackground]);
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----

        // ----- Front face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.quad.side);

        this.material.setTexture(this.frontTextures[this.scene.selectedBackground]);    
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----

        // ----- Right face
        this.scene.pushMatrix();
        this.scene.translate(this.quad.side, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);

        this.material.setTexture(this.rightTextures[this.scene.selectedBackground]);     
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----

        // ----- Back face
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.quad.side);
        this.scene.rotate(Math.PI, 0, 1, 0);

        this.material.setTexture(this.backTextures[this.scene.selectedBackground]);   
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----
        
        // ----- Left face
        this.scene.pushMatrix();
        this.scene.translate(-this.quad.side, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);

        this.material.setTexture(this.leftTextures[this.scene.selectedBackground]);
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----

        // ----- Bottom face
        this.scene.pushMatrix();
        this.scene.translate(0, -this.quad.side, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.material.setTexture(this.bottomTextures[this.scene.selectedBackground]);  
        this.material.apply();

        this.applyFiltering();

        this.quad.display();
        this.scene.popMatrix();
        // -----
    }

    applyFiltering(){
        if(this.scene.textureFiltering)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
    }
}

