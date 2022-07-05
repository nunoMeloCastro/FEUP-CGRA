import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyAlgaeGroup } from './MyAlgaeGroup.js';
import { MyPyramid } from './MyPyramid.js';
import { getRandomNumber } from './utils/utils.js';

export class MyAlgaeSet extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} numAlgaes - number of algaes
     */
    constructor(scene, numAlgaeGroups) {
        super(scene);
        this.scene = scene;
        this.algaeGroups = [];
        this.numAlgaeGroups = numAlgaeGroups;

        this.initAlgaes();
    }

    initAlgaes() {
        for(let i = 0; i < this.numAlgaeGroups; i++) {
            let numAlgaes = getRandomNumber(1, 5);
            let maxCoord = getRandomNumber(2, 5);
            let minCoord = 0;
            this.algaeGroups.push(new MyAlgaeGroup(this.scene, numAlgaes, minCoord, maxCoord));
        }

    }

    display() {
        for(let i = 0; i < this.numAlgaeGroups; i++)
            this.algaeGroups[i].display();
    }

}
