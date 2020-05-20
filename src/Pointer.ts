import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Node } from "./Node";
import Config = require("./Config");
import { Variable } from "./Variable";

export class Pointer {
    private origin: Node | Variable;
    private destination: Node;

    private line: fabric.Line;
    private arrowhead: fabric.Line[];

    constructor(origin: Node | Variable, canvas: fabric.Canvas) {
        this.origin = origin;
        this.destination = null;

        this.line = makeLine();
        this.arrowhead = [makeLine(), makeLine()];
        canvas.add(this.line, ...this.arrowhead);
    }

    public set(nodePointedTo: Node) {
        this.destination = nodePointedTo;
    }

    public get() {
        return this.destination;
    }

    public draw(): void {
        if (this.destination === null) return;

        const pointerAngle = Math.atan2(
            this.destination.getCenter().y - this.origin.getCenter().y,
            this.destination.getCenter().x - this.origin.getCenter().x,
        );

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
