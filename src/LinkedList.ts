import { fabric } from "fabric";
import { Node } from "./Node";
import { makeLine } from "./Utils";
import Config = require("./Config");

export class LinkedList {

    private head: Node = null;
    private canvas: fabric.Canvas;

    constructor(canvasEl: HTMLCanvasElement, values: number[] = []) {

        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.selection = false;

        // this allows us to draw circles using the coordinates of their centers
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        values = values.reverse();
        for (let num of values) {
            this.head = new Node(num, this.head);
        }

        this.draw()

        let nul = new fabric.IText('NULL', {
            left: Config.LIST_X + (values.length * Config.NODE_SPACE),
            top: Config.LIST_Y + (Config.NODE_SIZE / 2),
            fill: '#black',
        });
        this.canvas.add(nul)

        let head = new fabric.IText('head', {
            left: 20,
            top: 20,
            fill: '#black',
        });
        this.canvas.add(head)

        let line = makeLine([60, 60, 100, 140]);
        let arrow1 = makeLine([95, 110, 100, 140]);
        let arrow2 = makeLine([70, 120, 100, 140]);
        this.canvas.add(line);
        this.canvas.add(arrow1);
        this.canvas.add(arrow2);

        const self = this;
        this.canvas.on('object:moving', function (e) {
            let temp = self.head;
            while (temp) {
                temp.redraw();
                temp = temp.next;
            }
        });

    }

    public draw() {
        let leftEdge = Config.LIST_X;
        let temp = this.head;
        while (temp) {
            temp.draw(this.canvas, leftEdge);

            leftEdge += Config.NODE_SPACE;
            temp = temp.next;
        }
    }
}


