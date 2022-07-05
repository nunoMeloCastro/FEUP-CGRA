import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var increment = 1.0/this.slices;
        var s = 0;

        for(var i = 0; i < this.slices*2; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(
                ca, 1, -sa,
                ca, 0, -sa,
                caa, 0, -saa,

                caa, 0, -saa,
                caa, 1, -saa,
                ca, 1, -sa
            );
           
            this.normals.push(
                ca, 0, -sa,
                ca, 0, -sa,
                caa, 0, -saa,

                caa, 0, -saa, 
                caa, 0, -saa,
                ca, 0, -sa
            );


            this.texCoords.push(
                s, 0,
                s, 1,
                s + increment, 1,

                s + increment, 1,
                s + increment, 0,
                s, 0
            );

            this.indices.push(3*i, (3*i+1) , (3*i+2) );
            //this.indices.push(3*i+3, (3*i+4), (3*i+5));

            ang+=alphaAng;
            s += increment;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    drawPole(x, y, z){
        this.scene.pushMatrix();
        this.scene.translate(x, y, z);
		this.scene.scale(0.5, 12.0, 0.5);
		this.display();
        this.scene.popMatrix();
    }
}


