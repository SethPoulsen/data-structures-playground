import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Pointer } from "./Pointer";
import Config = require("./Config");
import { Node } from "./Node";

export class Variable {
    public name: string;
    public value: Pointer;
    private representation: fabric.Group;

    constructor(name: string, canvas: fabric.Canvas) {
        this.name = name;
        this.value = new Pointer(this, canvas);

        const text = new fabric.IText(this.name, {
            fill: '#black',
            evented: false,
            selectable: false
        });

        this.representation = new fabric.Group([text], {
            hasControls: false,
            hasBorders: false,
            hoverCursor: "grab",
            moveCursor: "grabbing",
        });

        canvas.add(this.representation);
        this.representation.center();
    }

    public draw(): void {
        // Draw the pointer
        this.value.draw();
    }

    /**
     * Return the location where the pointer touches this node.
     * @param angle the angle at which the pointer will be drawn, in radians.
     */
    public getContactPoint(angle: number) {
        // r is distance from center to contact point
        // take minimum to determine if it intersects the vertical or horizontal boundary first
        const r = Math.min(
            Math.abs((this.representation.width / 2) / Math.cos(angle)),
            Math.abs((this.representation.height / 2) / Math.sin(angle))
        );

        return {
            x: this.representation.left + Math.cos(angle) * r,
            y: this.representation.top + Math.sin(angle) * r
        }
    }

    /**
     * Returns the angle of a line from this Node to another Node, in radians.
     */
    public getCenter() {
        return {
            x: this.representation.left,
            y: this.representation.top,
        }
    }
}