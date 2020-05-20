import { fabric } from "fabric";
import { Node } from "./Node";
import { makeLine } from "./Utils";
import Config = require("./Config");
import { Variable } from "./Variable";

export class LinkedList {

    private globalVars: { [key: string]: Variable };
    private nodes: Node[];
    private canvas: fabric.Canvas;

    constructor(canvasEl: HTMLCanvasElement) {

        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.selection = false;

        // this allows us to draw circles using the coordinates of their centers
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        this.nodes = []
        this.globalVars = {}

        this.draw();

        const self = this;
        this.canvas.on('object:moving', function (e) {
            self.draw();
        });
    }

    public draw() {
        for (let key in this.globalVars) {
            this.globalVars[key].draw();
        }

        for (let node of this.nodes) {
            node.draw();
        }

        this.canvas.renderAll();
    }

    public getAccessibleVars() {
        return Object.keys(this.globalVars);
    }

    public createPointer(name: string) {
        this.globalVars[name] = new Variable(name, this.canvas);
        this.draw();
    }

    public createNode(value: number, pointerToNode: string) {
        if (!(pointerToNode in this.globalVars)) {
            throw Error("Invalid pointer to node");
        }

        const node = new Node(value, this.canvas);
        this.nodes.push(node);
        this.globalVars[pointerToNode].set(node);

        this.draw();
    }

    public reassignPointer(lhs: string, rhs: string) {
        console.log("HO");
        this.globalVars[lhs].set(this.globalVars[rhs].getCurrValue());

        this.draw();
    }
}
