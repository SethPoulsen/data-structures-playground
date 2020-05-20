import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Pointer } from "./Pointer";
import Config = require("./Config");

export class Node {
    public data: number;
    public next: Pointer;
    private representation: fabric.Group;

    constructor(data: number, canvas: fabric.Canvas) {
        this.data = data;
        this.next = new Pointer(this, canvas);

        const circle = new fabric.Circle({
            radius: Config.NODE_SIZE,
            fill: '#00000000',
            stroke: 'black',
            strokeWidth: 2,
        });

        const text = new fabric.IText(this.data.toString(), {
            fill: '#black',
            evented: false,
            selectable: false
        });

        this.representation = new fabric.Group([circle, text], {
            hasControls: false,
            hasBorders: false,
            hoverCursor: "grab",
            moveCursor: "grabbing",
        });

        canvas.add(this.representation);
        this.representation.center();
    }

    public draw(): void {
        this.next.draw();
    }

    /**
     * Return the location where the pointer touches this node.
     * @param angle the angle at which the pointer will be drawn, in radians.
     */
    public getContactPoint(angle: number) {
        return {
            x: this.representation.left + Math.cos(angle) * Config.NODE_SIZE,
            y: this.representation.top + Math.sin(angle) * Config.NODE_SIZE,
        }
    }

    public getCenter() {
        return {
            x: this.representation.left,
            y: this.representation.top,
        }
    }
}
