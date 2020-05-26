import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Pointer } from "./Pointer";
import Config = require("./Config");
import { Node } from "./Node";

export class Variable {
    private name: string;
    public pointer: Pointer;
    private representation: fabric.Group;

    constructor(name: string, canvas: fabric.Canvas) {
        this.name = name;
        this.pointer = new Pointer(this, canvas);

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

    public getAccessibleNames() {
        let nodePointedTo = this.pointer.get();

        let pointers = [this.name];
        if (nodePointedTo !== null) {
            pointers = pointers.concat(
                Object.keys(nodePointedTo.pointers).map(pointerName => this.name + "->" + pointerName));
        }
        return pointers;
    }

    public draw(): void {
        this.pointer.draw();
    }

    /**
     * Return the location where the pointer touches this variable on the canvas.
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

    public getCenter() {
        return {
            x: this.representation.left,
            y: this.representation.top,
        }
    }
}
