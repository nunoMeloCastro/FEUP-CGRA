import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        // ----- Checkbox element in GUI to display axis
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        // -----

        // ----- Checkbox element in GUI to display normals
        this.gui.add(this.scene, 'displayNormals').name('Display Normals');
        // -----

        // ----- Select the object to be displayed
        this.gui.add(this.scene, 'selectedObject', this.scene.objectIDs).name('Selected Object');
        // -----

        // ----- Select the CubeMap texture
        this.gui.add(this.scene, 'selectedBackground', this.scene.backgroundIDs).name('CubeMap Texture');
        // -----

        // ----- Slider for scaleFactor
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');
        // -----

        // ----- Slider for speedFactor
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed');
        // -----

        // a folder for grouping parameters for one of the lights
        /*var f0 = this.gui.addFolder('Light 0 ');
        f0.add(this.scene.lights[0], 'enabled').name("Enabled");
        // a subfolder for grouping only the three coordinates of the light
        var sf0 = f0.addFolder('Light 0 Position');
        sf0.add(this.scene.lights[0].position, '0', -50.0, 50.0).name("X Position");
        sf0.add(this.scene.lights[0].position, '1', -50.0, 50.0).name("Y Position");
        sf0.add(this.scene.lights[0].position, '2', -50.0, 50.0).name("Z Position");*/

        // Call Keys init
        this.initKeys();

        return true;
    }

    initKeys() {
        // Create reference from the scene to the GUI
        this.scene.gui = this;

        // Disable the processKeyboard function
        this.processKeyboard = function(){};

        // Create a named array to store which keys are being pressed
        this.activeKeys = {};
    }

    processKeyDown(event) {
        // Called when a key is pressed down
        // Mark it as active in the array
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // Called when a key is released
        // Mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        if(this.activeKeys[keyCode] && (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }

        return this.activeKeys[keyCode] || false;
    }
}