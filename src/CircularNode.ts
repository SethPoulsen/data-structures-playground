import { fabric } from "fabric";
import { Node } from "./Node";
import { Point } from "./Types";
import Config = require("./Config");
import { calculateAngle } from "./Utils";

export class CircularNode extends Node {
    constructor(data: number, canvas: fabric.Canvas) {
        super(data, canvas);

        const circle = new fabric.Circle({
            radius: Config.NODE_SIZE,
            fill: '#00000000',
            stroke: 'black',
            strokeWidth: 2,
        });

        const text = new fabric.IText(this.data.toString(), {
            fill: '#black',
            evented: false,
            selectable: false
        });

        this.representation = new fabric.Group([circle, text], {
            hasControls: false,
            hasBorders: false,
            hoverCursor: "grab",
            moveCursor: "grabbing",
        });

        canvas.add(this.representation);
        this.representation.center();
    }

    public getHeadContactPoint(angle: number): Point {
        return {
            x: this.representation.left - Math.cos(angle) * Config.NODE_SIZE,
            y: this.representation.top - Math.sin(angle) * Config.NODE_SIZE,
        };
    }

    public getTailContactPoint(angle: number): Point {
        return {
            x: this.representation.left + Math.cos(angle) * Config.NODE_SIZE,
            y: this.representation.top + Math.sin(angle) * Config.NODE_SIZE,
        };
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
