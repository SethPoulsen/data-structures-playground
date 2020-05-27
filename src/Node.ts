import { fabric } from "fabric";
import { Pointer } from "./Pointer";
import { Point } from "./Types";

export abstract class Node {
    public data: number;
    public next: Pointer
    protected representation: fabric.Group;

    constructor(data: number, canvas: fabric.Canvas) {
        this.data = data;
        this.next = new Pointer(this, canvas);
    }

    public draw(): void {
        this.next.draw();
    }

    /**
     * Return the location where the pointer tail should touch this node.
     * @param angle the angle at which the pointer will be drawn, in radians.
     */
    public abstract getContactPoint(angle: number): Point;

    public abstract getCenter(): Point;
}
