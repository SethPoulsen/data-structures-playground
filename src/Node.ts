import { fabric } from "fabric";
import { Pointer } from "./Pointer";
import { Point } from "./Types";
import Config = require("./Config");

export abstract class Node {
    public data: number;
    public next: Pointer
    protected representation: fabric.Group;

    constructor(data: number, canvas: fabric.Canvas, pointerOrigin: Point) {
        this.data = data;
        this.next = new Pointer(this, canvas);

        this.representation = new fabric.Group(this.createFabricObjects(), {
            hasControls: false,
            hasBorders: false,
            hoverCursor: "grab",
            moveCursor: "grabbing",
            left: Math.min(pointerOrigin.x + Config.NODE_SPACE, canvas.getWidth() - Config.NODE_SIZE),
            top: pointerOrigin.y,
        });

        canvas.add(this.representation);
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
}
