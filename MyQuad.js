import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
        this.side = 0.5;
        this.scene.cameraCoords = this.scene.camera.position;
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-this.side, -this.side, 0,	//0
			this.side, -this.side, 0,	//1
			-this.side, this.side, 0,	//2
			this.side, this.side, 0,	//3

            -this.side, -this.side, 0,	//4
			this.side, -this.side, 0,	//5
			-this.side, this.side, 0,	//6
			this.side, this.side, 0	    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,

            4, 6, 5,
            5, 6, 7
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */


		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		];

        //Offset was used to fix bugs on the corners
        for(var i = 0; i < this.texCoords.length; i++) {
            var offset = 0.002;
            if(this.texCoords[i] != 0) 
                this.texCoords[i] -= offset;
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

