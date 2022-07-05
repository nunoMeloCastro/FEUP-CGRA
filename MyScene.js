import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyCubeMap } from "./MyCubeMap.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyPlane } from './MyPlane.js';
import { MyQuad } from "./MyQuad.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyAlgaeSet } from "./MyAlgaeSet.js";
import { MyAlgaeGroup } from "./MyAlgaeGroup.js";
import { MyPyramid } from "./MyPyramid.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { MyFishSet } from './MyFishSet.js';

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        this.lightPosition = [];
        this.lightDiffuse = [];

        super.init(application);
        this.initLights();
        this.initCameras();
        this.initTextures();
        this.initMaterials();
        this.initShaders();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        this.enableTextures(true);

        // ----- Initialize scene objects
        this.fishColor = [1.0, 0.0, 0.0];
        this.axis = new CGFaxis(this);
        this.sphere = new MySphere(this, 16, 8);
        this.movingObject = new MyMovingObject(this, new MyPyramid(this, 4));
        this.cubeMap = new MyCubeMap(this);
        this.cylinder = new MyCylinder(this, 25);
        this.plane = new MyPlane(this, 20);
        this.fish = new MyMovingFish(this, 40, this.fishColor, this.bodyTexture);
        this.waterSurface = new MyQuad(this);
        this.rock = new MyRock(this, 24, 12);
        this.quad = new MyQuad(this);
        this.rockSet = new MyRockSet(this, 10);
        this.pole = new MyCylinder(this, 25);
        this.algaeSet = new MyAlgaeSet(this, 10);
        this.fishSet = new MyFishSet(this, 4);
        // -----

        // Flag for movingObject
        this.moveObject = false;

        // ----- Objects connected to MyInterface
        this.displayAxis = false;
        this.displayNormals = false;

        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.selectedObject = 5;

        this.fishSpeed = 0;
        this.fishRotation = 0;

        this.movingRock = 0;
        this.carrying = 0;

        this.rockOrig = [];

        this.objectList = [this.movingObject, this.cubeMap, this.cylinder, this.sphere, this.plane, this.fish];
        this.objectIDs = {'Pyramid': 0, 'CubeMap': 1, 'Cylinder': 2, 'Sphere': 3,  'Plane': 4, 'Fish': 5};

        // --- CubeMap Textures
        this.selectedBackground = 2;
        this.backgroundIDs = {'Demo': 0, 'Test': 1, 'Underwater 1': 2, 'Underwater 2': 3};
        // ---
        // -----

        // set the scene update period 
		// (to invoke the update() method every 50ms or as close as possible to that )
		this.setUpdatePeriod(5);

        this.elapsedTime = 0;
        this.actualTime = 0;
    }
    
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    
    initCameras() {
        let fov = 1.75;
        let position = vec3.fromValues(2, 2, 2);
        let target = vec3.fromValues(0, 2, 0);
        this.camera = new CGFcamera(fov, 0.1, 500, position, target);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0,0,0,1);
        this.setShininess(10.0);
    }

    initTextures() {
        this.earthTexture = new CGFtexture(this, 'images/earth.jpg');

        this.sandMap = new CGFtexture(this, "images/sandMap_3.png");
		this.sandTex = new CGFtexture(this, "images/sand2.png");
    
        // Texture from https://drive.google.com/drive/folders/1mrkOQA3pqG03U89txz2VSe6uVkplNDcM
        this.bodyTexture = new CGFtexture(this, 'images/fish/scales.jpg');

        this.waterSurfaceTexture = new CGFtexture(this, 'images/pier.jpg');
        this.waterDistortionTexture = new CGFtexture(this, 'images/distortionmap.png');

        this.rust = new CGFtexture(this, 'images/rust.jpg');
        
    }

    initMaterials() {
        this.defaultAppearance = new CGFappearance(this);
		this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0,0,0,1);
		this.defaultAppearance.setShininess(120);

        this.sphereAppearance = new CGFappearance(this);
		this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.sphereAppearance.setShininess(120);

        this.poleAppearance = new CGFappearance(this);
		this.poleAppearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.poleAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.poleAppearance.setSpecular(0.0, 0.0, 0.0, 1);
		this.poleAppearance.setShininess(120);

        this.fishFinsAppearence = new CGFappearance(this);
        this.fishFinsAppearence.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.fishFinsAppearence.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.fishFinsAppearence.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.fishFinsAppearence.setEmission(1.0 , 0.0, 0.0, 1.0);
        this.fishFinsAppearence.setShininess(120);

        this.waterMaterial = new CGFappearance(this);
		this.waterMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.waterMaterial.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.waterMaterial.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.waterMaterial.setEmission(0,0,0,1);
		this.waterMaterial.setShininess(120);
        this.waterMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.waterMaterial.setTexture(this.waterSurfaceTexture);
    }

    initShaders() {
        this.waterShader = new CGFshader(this.gl, 'shaders/water.vert', 'shaders/water.frag');
        this.waterShader.setUniformsValues({ waterTexture: 0,
                                             distortionMap: 1,
                                             speedFactor: 0.005,
                                             timeFactor: 1,
                                             distortionScaleFactor: 0.5});

        this.sandShader = new CGFshader(this.gl, 'shaders/sand.vert', 'shaders/sand.frag');
        this.sandShader.setUniformsValues({  sandTex: 0, sandMap: 1  });
    }

    checkKeys(object) {
        var text = "Keys pressed: ";
        var speed = 2.0;
        var rotation = 45.0;
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/ 
        if(this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            object.accelerate(speed * this.speedFactor);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            object.accelerate(-speed * this.speedFactor);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyA")) {
            this.fishRotation = 1;
            text += " A ";
            object.turn(rotation * this.speedFactor);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyD")) {
            this.fishRotation = -1;
            text += " D ";
            object.turn(-rotation * this.speedFactor);
            keysPressed = true;
        }

        if(this.gui.isKeyPressed("KeyR")) {
            text += "R";
            object.reset();
            this.rockSet.disableMovingRock();
            if (this.carrying==1){
                this.carrying = 0;
                this.rockSet.rocksCoords[this.movingRock] = this.rockOrig[0];
                this.rockSet.rocksCoords[this.movingRock + 1] = this.rockOrig[1];
                this.rockSet.rocksCoords[this.movingRock + 2] = this.rockOrig[2];
            }
            keysPressed = true;
        }

        if(object == this.fish) {
            // Move up
            if(this.gui.isKeyPressed("KeyP")) {
                text += "P";
                object.setMoveUp();
                keysPressed = true;
            }

            // Move down
            if(this.gui.isKeyPressed("KeyL")) {
                text += "L";
                object.setMoveDown();
                keysPressed = true;
            }

            // Move rock
            if(this.gui.isKeyPressed("KeyC")) {
                text += "C";
                if (this.carrying == 0 && Math.round(this.fish.y) == -2) {
                    for (let i = 0; i < this.rockSet.numRocks * 3; i += 3){
                        if (this.rockSet.rocksCoords[i] > this.fish.x - 1.5 && this.rockSet.rocksCoords[i] < this.fish.x + 1.5 && this.rockSet.rocksCoords[i + 2] > this.fish.z - 1.5 && this.rockSet.rocksCoords[i + 2] < this.fish.z + 1.5){
                            this.rockOrig[0] = this.rockSet.rocksCoords[i];
                            this.rockOrig[1] = this.rockSet.rocksCoords[i+1];
                            this.rockOrig[2] = this.rockSet.rocksCoords[i+2];
                            this.movingRock = i;
                            this.rockSet.setMovingRock();
                            this.carrying = 1; 
                        }
                    }
                } else if (this.carrying == 1 && Math.round(this.fish.y) == -2 && this.fish.x < -8 && this.fish.z < -11 && this.fish.x > -18 && this.fish.z > -18 && this.fish.y < 2){
                    this.rockSet.disableMovingRock();
                    this.rockSet.rocksCoords[this.movingRock + 1] = 1;
                    this.carrying = 0;
                }

                keysPressed = true;
            }
            console.log("Carrying = " + this.carrying);
        }

        if(keysPressed) 
            console.log(text);
        else
            this.fishRotation = 0;
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        if(this.actualTime == 0) {
            this.actualTime = t;
        }

        this.elapsedTime = t - this.actualTime;
        this.actualTime = t;

        this.checkKeys(this.movingObject);
        this.movingObject.update();

        this.checkKeys(this.fish);
        this.fish.update();

        this.rockSet.update(this.movingRock);

        this.waterShader.setUniformsValues({ timeFactor: t / 200 % 100 });
    }

    display() {
        // ----- BEGIN Background, camera and axis setup
        // --- Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // ---

        // --- Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // ---

        // --- Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        // ---
        
        this.defaultAppearance.apply();

        // --- Draw axis
        if (this.displayAxis)
            this.axis.display();
        // ---
        // -----

        // ----- BEGIN Primitive drawing section

        // --- Check if normals are activated to enable them
        if (this.displayNormals && this.objectList[this.selectedObject] != this.cubeMap)
            this.objectList[this.selectedObject].enableNormalViz();
        else if (!this.displayNormals && this.objectList[this.selectedObject] != this.cubeMap)
            this.objectList[this.selectedObject].disableNormalViz();
        // ---

        // --- Water Surface
        this.waterMaterial.texture.bind(0);
        this.waterDistortionTexture.bind(1);
        this.setActiveShader(this.waterShader);
        this.pushMatrix();
        this.translate(0, 10, 0);
        this.scale(50, 50, 50);
        this.rotate(Math.PI/2, 1, 0, 0);
        this.waterMaterial.apply();
        this.waterSurface.display();
        this.popMatrix();
        this.waterMaterial.texture.unbind(0);
        this.waterDistortionTexture.unbind(1);
        // --- 

        // --- Sand Bottom
        this.sandTex.bind(0);
        this.sandMap.bind(1);
        this.setActiveShader(this.sandShader);
        this.plane.draw();
        this.sandTex.unbind(0);
        this.sandMap.unbind(1);
        // ---

        this.setActiveShader(this.defaultShader);

        // --- Poles
        this.poleAppearance.setTexture(this.rust);
        this.poleAppearance.apply();
        this.pole.drawPole(20, -1, 4);
        this.pole.drawPole(20, -1, -4);
        this.pole.drawPole(14, -1, 4);
        this.pole.drawPole(14, -1, -4);
        this.pole.drawPole(8, -1, 4);
        this.pole.drawPole(8, -1, -4);
        // --- 

        this.defaultAppearance.apply();

        // --- Algae Set
        this.algaeSet.display();
        // ---

        // --- Rock Set
        this.rockSet.display();
        // ---

        // --- Fish Set
        this.fishSet.display();
        // ---

        // --- The selected object is the CubeMap
        let cubeMapScaleFactor = 500.0;

        this.pushMatrix();
        //this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);  // Center CubeMap in camera position
        this.scale(cubeMapScaleFactor, cubeMapScaleFactor, cubeMapScaleFactor);

        this.cubeMap.display();

        this.popMatrix();
        // ---

        // --- This sphere does not have defined texture coordinates
        if(this.objectList[this.selectedObject] == this.sphere){
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor); 
            this.sphereAppearance.apply();
            this.sphere.display();
            this.popMatrix();
        }
        // ---

        this.setDefaultAppearance();

        // --- The selected object is the MovingObject
        if(this.objectList[this.selectedObject] == this.movingObject) {
            this.pushMatrix();
            // Apply scaleFactor
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.movingObject.display();
            this.popMatrix();
        }
        else
            this.movingObject.reset();
        // ---

        // --- The selected object is the Cylinder
        if(this.objectList[this.selectedObject] == this.cylinder) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.sphereAppearance.setTexture(this.earthTexture);    // Set sphere earthTexture as the sphere texture
            this.sphereAppearance.apply();
            this.cylinder.drawPole();
            this.cylinder.display();

            this.popMatrix();
        }
        // ---

        // --- The selected object is the Fish
        if(this.objectList[this.selectedObject] == this.fish) {
            this.fish.display();
        }
        this.setActiveShader(this.defaultShader);

        // ----- END Primitive drawing section
    }
}