import { fabric } from "fabric";
import { Pointer } from "./Pointer";
import { Point } from "./Types";
import { Node } from "./Node";
import { calculateAngle, getBoxIntersection } from "./Utils";

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
            left: canvas.getWidth() * (0.8 * Math.random() + 0.1),
            top: canvas.getHeight() * (0.8 * Math.random() + 0.1),
        });

        canvas.add(this.representation);
    }

    public getAccessibleNames(): string[] {
        const pointers = [this.name];
        if (this.pointer.deref() !== null) {
            pointers.push(this.name + "->next");
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
    public getTailContactPoint(angle: number): Point {
        return getBoxIntersection(this.getCenter(), angle,
            this.representation.width, this.representation.height);
    }

    public getAngleTo(other: Node): number {
        return calculateAngle(this.getCenter(), other.getCenter());
    }

    public getCenter(): Point {
        return {
            x: this.representation.left,
            y: this.representation.top,
        };
    }
}
