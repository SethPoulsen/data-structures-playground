import { fabric } from "fabric";
import { makeLine } from "./Utils";
import { Node } from "./Node";
import { Variable } from "./Variable";
import { Point } from "./Types";
import Config = require("./Config");

export class Pointer {
    private origin: Node | Variable;
    private destination: Node;
    private canvas: fabric.Canvas;
    private line: fabric.Line;
    private selfLoop: fabric.Path;
    private arrowhead: fabric.Line[];

    constructor(origin: Node | Variable, canvas: fabric.Canvas) {
        this.origin = origin;
        this.canvas = canvas;
        this.destination = null;
        this.canvas = canvas;
        this.line = makeLine();
        this.selfLoop = new fabric.Path("",{ fill: '', stroke: 'black', objectCaching: false, strokeWidth: 2 });
        this.arrowhead = [makeLine(), makeLine()];
        canvas.add(this.line, ...this.arrowhead);
    }

    public set(nodePointedTo: Node): void {
        this.destination = nodePointedTo;

        this.erase();
        if (this.destination == this.origin) {
            this.canvas.add(this.selfLoop, ...this.arrowhead);
        } else if (this.destination) {
            this.canvas.add(this.line, ...this.arrowhead);
        }

    }

    public deref(): Node {
        return this.destination;
    }

    public draw(): void {
        if (this.destination === null) return;

        let x1, y1, x2, y2, pointerAngle;
        if (this.destination == this.origin) {
            pointerAngle = 0.85;
            ({ x: x1, y: y1 } = this.origin.getTailContactPoint(0));
            ({ x: x2, y: y2 } = this.destination.getHeadContactPoint(0));

            const size = Config.NODE_SIZE * 3;
            this.selfLoop.set("path", [
                <any>["m", x1, y1],
                <any>["c", size , -size , -size * 3/2, -size, x2 - x1, 0]
            ]);

        } else {
            pointerAngle = this.origin.getAngleTo(this.destination);
            ({ x: x1, y: y1 } = this.origin.getTailContactPoint(pointerAngle));
            ({ x: x2, y: y2 } = this.destination.getHeadContactPoint(pointerAngle));

            this.line.set({ x1, x2, y1, y2 });
        }

        const arrowLength = 20;
        const arrowAngles = [pointerAngle + 0.85 * Math.PI, pointerAngle - 0.85 * Math.PI];
        for (const i of [0, 1]) {
            this.arrowhead[i].set({
                x1: x2 + arrowLength * Math.cos(arrowAngles[i]),
                y1: y2 + arrowLength * Math.sin(arrowAngles[i]),
                x2,
                y2,
            });
        }
    }

    public getOriginLocation(): Point {
        return this.origin.getCenter();
    }

    public erase(): void {
        this.canvas.remove(this.line, this.selfLoop, ...this.arrowhead);
    }

}
