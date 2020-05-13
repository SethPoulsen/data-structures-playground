import { fabric } from "fabric";
import { Node } from "./Node";
import { makeLine } from "./Utils";
import Config = require("./Config");
import { Variable } from "./Variable";

export class LinkedList {

    private globalVars: { [key: string]: Variable }
    private head: Node = null;
    private canvas: fabric.Canvas;

    constructor(canvasEl: HTMLCanvasElement, values: number[] = []) {

        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.selection = false;

        // this allows us to draw circles using the coordinates of their centers
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        values = values.reverse();
        for (let num of values) {
            const temp = this.head;
            this.head = new Node(num, this.canvas);
            this.head.next.destination = temp;
        }

        this.globalVars = {
            head: new Variable("head", this.canvas),
        }
        this.globalVars.head.value.destination = this.head;

        this.draw()

        const self = this;
        this.canvas.on('object:moving', function (e) {
            self.draw();
            self.canvas.renderAll();
        });

    }

    public draw() {
        let leftEdge = Config.LIST_X;
        let temp = this.head;
        while (temp) {
            temp.draw();

            leftEdge += Config.NODE_SPACE;
            temp = temp.next.destination;
        }
        this.globalVars.head.draw();
    }
}


