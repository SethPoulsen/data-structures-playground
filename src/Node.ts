import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Pointer } from "./Pointer";
import Config = require("./Config");

export class Node {
    public data: number;
    public next: Pointer;
    private representation: fabric.Group;

    constructor(data: number, next: Node) {
        this.data = data;
        this.next = new Pointer(this, next);
    }

    public draw(canvas: fabric.Canvas, leftEdge: number): void {
        // TODO: figures out how to use fabric.js to group the circle, 
        // number, and arrow together so that they all move together 
        // and can be treated as a single object to store in this.representation 

        // Draw the Node
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
            left: leftEdge,
            top: Config.LIST_Y,
            hasControls: false,
            hasBorders: false,
            hoverCursor: "grab",
            moveCursor: "grabbing",
        });

        canvas.add(this.representation);
        this.next.draw(canvas, leftEdge)
    }

    public redraw(): void {
        // this.canvasObjects.text.set({
        //     left: this.canvasObjects.circle.left,
        //     top: this.canvasObjects.circle.top,
        // });
        this.next.redraw();
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

    /**
     * Returns the angle of a line from this Node to another Node, in radians.
     */
    public getAngle(other: Node) {
        return Math.atan2(other.representation.top - this.representation.top,
            other.representation.left - this.representation.left);
    }
}

}