import {CGFobject, CGFtexture, CGFappearance, CGFshader} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
import { MySphere } from './MySphere.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleRectangle } from './MyTriangleRectangle.js';

export class MyFish extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     */
    constructor(scene, ratio, color, bodyTexture) {
        super(scene);

        this.ratio = ratio;
        this.color = color;
        this.bodyTexture = bodyTexture;

        this.height = 3;

        this.body = new MySphere(this.scene, 24, 12);
        this.tail = new MyTriangle(this.scene);
        this.dorsalFin = new MyTriangleRectangle(this.scene);
        this.rightFin = new MyTriangleRectangle(this.scene);
        this.leftFin = new MyTriangleRectangle(this.scene);
        this.rightEye = new MySphere(this.scene, 24, 12);
        this.leftEye = new MySphere(this.scene, 24, 12);

        this.quadTest = new MyQuad(this.scene);

        this.initMaterials();
        this.initTextures();
        this.initShaders();
    }

    initMaterials() {
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setAmbient(this.color[0], this.color[1], this.color[2], 1.0);
        this.bodyMaterial.setDiffuse(this.color[0], this.color[1], this.color[2], 1.0);
        this.bodyMaterial.setTexture(this.bodyTexture);

        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setDiffuse(0.0, 0.0, 0.0, 1.0);
        this.eyeMaterial.setSpecular(0.0, 0.0, 0.0, 1.0);
        this.eyeMaterial.setEmission(1.0, 1.0, 1.0, 1.0);
        this.eyeMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.eyeMaterial.setShininess(10.0);
        this.eyeMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    initTextures() {
        this.rightEyeTexture = new CGFtexture(this.scene, 'images/fish/right_eye.jpg');
        this.leftEyeTexture = new CGFtexture(this.scene, 'images/fish/left_eye.jpg');
    }

    getShader() {
        return this.shader;
    }

    initShaders() {
        this.shader = new CGFshader(this.scene.gl, 'shaders/fish2.vert', 'shaders/fish2.frag');
        this.shader.setUniformsValues({ reactToLight : true,
                                        fishTexture: 0, 
                                        ratio: this.ratio,
                                        color: this.color,
                                        scaleFactor: 0.5});
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, this.height, 0);

        // ---- Body
        this.bodyTexture.bind(0);


        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.scale(0.15, 0.20, 0.25);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.setActiveShader(this.shader);
        this.body.display();
        this.scene.popMatrix();
        // -----

        this.bodyTexture.unbind(0);
        this.scene.setActiveShader(this.scene.defaultShader);

        // ----- Tail
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(0, 0, -0.25);
        this.scene.rotate(Math.sin(this.scene.actualTime * Math.max(this.scene.fishSpeed, 0.5) * this.scene.speedFactor / 100 % 100) * (20.0*Math.PI/180), 0, 1, 0)
        this.scene.translate(0, 0, -0.20);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.20, 0.20, 0.20);
        this.bodyMaterial.apply();
        this.tail.display();
        this.scene.popMatrix();
        // -----

        // ----- Dorsal Fin
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(0, 0.15, -0.10);
        this.scene.scale(0.20, 0.20, 0.20);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.dorsalFin.display();
        this.scene.popMatrix();
        // -----

        // ----- Right Fin
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(0.14, -0.18, 0.05);
        this.scene.scale(0.15, 0.15, 0.15);
        this.scene.translate(0.0, 1.0, 0.0);
        if (this.scene.fishRotation <= 0)
            this.scene.rotate(Math.sin(this.scene.actualTime/ 200 % 200) * (20.0*Math.PI/180), 0, 0, 1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, -1.0, 0.0);
        this.rightFin.display();
        this.scene.popMatrix();
        // -----

        // ----- Left Fin
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(-0.14, -0.18, 0.05);
        this.scene.scale(0.15, 0.15, 0.15);
        this.scene.translate(0.0, 1.0, 0.0);
        if (this.scene.fishRotation >= 0)
            this.scene.rotate(Math.sin(this.scene.actualTime/ 200 % 200) * -(20.0*Math.PI/180), 0, 0, 1);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(0.0, -1.0, 0.0);
        this.rightFin.display();
        this.scene.popMatrix();
        // -----


        // ----- Right Eye
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(0.08, 0.06, 0.18);
        this.scene.scale(0.04, 0.04, 0.04);
        this.eyeMaterial.setTexture(this.rightEyeTexture);
        this.eyeMaterial.apply();
        this.rightEye.display();
        this.scene.popMatrix();
        // -----

        // ----- Left Eye
        this.scene.pushMatrix();
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);
        this.scene.translate(-0.08, 0.06, 0.18);
        this.scene.scale(0.04, 0.04, 0.04);
        this.eyeMaterial.setTexture(this.leftEyeTexture);
        this.eyeMaterial.apply();
        this.leftEye.display();
        this.scene.popMatrix();
        // -----


        this.scene.popMatrix();
    }

    getHeight() {
        return this.height;
    }
}
