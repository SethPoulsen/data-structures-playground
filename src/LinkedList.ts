import { fabric } from "fabric";
import { Node } from "./Node";
import { makeLine } from "./Utils";
import Config = require("./Config");
import { Variable } from "./Variable";

export class LinkedList {

    private globalVars: { [key: string]: Variable };
    private nodes: Node[];
    private canvas: fabric.Canvas;

    constructor(canvasEl: HTMLCanvasElement, values: number[] = []) {

        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.selection = false;

        // this allows us to draw circles using the coordinates of their centers
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        this.nodes = [];
        for (let num of values) {
            this.nodes.push(new Node(num, this.canvas));
        }

        for (let i = 0; i < this.nodes.length - 1; ++i) {
            this.nodes[i].next.destination = this.nodes[i + 1];
        }

        this.globalVars = {
            head: new Variable("head", this.canvas),
        }
        this.globalVars.head.value.destination = this.nodes[0];

        this.draw();

        const self = this;
        this.canvas.on('object:moving', function (e) {
            self.draw();
            self.canvas.renderAll();
        });
    }

    public draw() {
        for (let key in this.globalVars) {
            this.globalVars[key].draw();
        }

        for (let node of this.nodes) {
            node.draw();
        }
    }
}


