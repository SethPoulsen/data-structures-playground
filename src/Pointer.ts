import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Node } from "./Node";
import { Variable } from "./Variable";

export class Pointer {
    private origin: Node | Variable;
    private destination: Node;

    private line: fabric.Line;
    private arrowhead: fabric.Line[];

    private canvas: fabric.Canvas;

    constructor(origin: Node | Variable, canvas: fabric.Canvas) {
        this.origin = origin;
        this.canvas = canvas;
        this.destination = null;

        this.line = makeLine();
        this.arrowhead = [makeLine(), makeLine()];
        canvas.add(this.line, ...this.arrowhead);
    }

    public set(nodePointedTo: Node): void {
        this.destination = nodePointedTo;
    }

    public deref(): Node {
        return this.destination;
    }

    public draw(): void {
        if (this.destination === null) return;

        const pointerAngle = this.origin.getAngleTo(this.destination);

        const { x: x1, y: y1 } = this.origin.getTailContactPoint(pointerAngle);
        const { x: x2, y: y2 } = this.destination.getHeadContactPoint(pointerAngle);
        const arrowAngles = [pointerAngle + 0.85 * Math.PI, pointerAngle - 0.85 * Math.PI];

        this.line.set({ x1, x2, y1, y2 });

        const arrowLength = 20;

        for (const i of [0, 1]) {
            this.arrowhead[i].set({
                x1: x2 + arrowLength * Math.cos(arrowAngles[i]),
                y1: y2 + arrowLength * Math.sin(arrowAngles[i]),
                x2,
                y2,
            });
        }
    }

    public erase(): void {
        this.canvas.remove(this.line, ...this.arrowhead);
    }
}
