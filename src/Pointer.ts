import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Node } from "./Node";
import Config = require("./Config");


export class Pointer {
    public origin: Node;
    public destination: Node;

    private line: fabric.Line;
    private arrowhead: fabric.Line[];

    constructor(origin: Node, destination: Node) {
        this.origin = origin;
        this.destination = destination;
    }

    public draw(canvas: fabric.Canvas, leftEdge: number): void {
        // Draw the next pointer
        // TODO: write a utility function that will draw an arrow given start and end points
        const nodeCenter = Config.LIST_Y;
        const nextNodeLeft = leftEdge + Config.NODE_SPACE - Config.NODE_SIZE;
        this.line = makeLine([leftEdge + Config.NODE_SIZE, nodeCenter, nextNodeLeft, nodeCenter]);
        this.arrowhead = [
            makeLine([nextNodeLeft - 20, nodeCenter + 20, nextNodeLeft, nodeCenter]),
            makeLine([nextNodeLeft - 20, nodeCenter - 20, nextNodeLeft, nodeCenter]),
        ]

        canvas.add(this.line);
        canvas.add(...this.arrowhead);
    }

    public redraw(): void {
        if (this.destination === null) return;

        const pointerAngle = this.origin.getAngle(this.destination);

        const { x: x1, y: y1 } = this.origin.getContactPoint(pointerAngle);
        const { x: x2, y: y2 } = this.destination.getContactPoint(pointerAngle + Math.PI);
        const arrowAngles = [pointerAngle + 3 * Math.PI / 4, pointerAngle - 3 * Math.PI / 4];

        this.line.set({ x1, x2, y1, y2 });

        const arrowLength = 20;

        for (let i of [0, 1]) {
            this.arrowhead[i].set({
                x1: x2 + arrowLength * Math.cos(arrowAngles[i]),
                y1: y2 + arrowLength * Math.sin(arrowAngles[i]),
                x2,
                y2,
            })
        }
    }

}