import { fabric } from "fabric";
import { Pointer } from "./Pointer";
import { Point } from "./Types";

export abstract class Node {
    public data: number;
    public next: Pointer
    protected representation: fabric.Group;
    private canvas: fabric.Canvas;

    constructor(data: number, canvas: fabric.Canvas) {
        this.data = data;
        this.canvas = canvas;
        this.next = new Pointer(this, canvas);

        this.representation = new fabric.Group(this.createFabricObjects(), {
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

    protected abstract createFabricObjects(): fabric.Object[];

    /**
     * Return the location where the pointer tail should touch this node.
     * @param angle the angle at which the pointer will be drawn, in radians.
     */
    public abstract getTailContactPoint(angle: number): Point;

    public abstract getHeadContactPoint(angle: number): Point;

    public abstract getCenter(): Point;

    public abstract getAngleTo(other: Node): number;

    public erase(): void {
        this.canvas.remove(this.representation);
        this.next.erase();
    }
}
