import { fabric } from "fabric";
import { Node } from "./Node";
import { Point } from "./Types";
import Config = require("./Config");
import { makeLine, calculateAngle, getBoxIntersection } from "./Utils";

export class BoxNode extends Node {
    protected createFabricObjects(): fabric.Object[] {
        const box = new fabric.Rect({
            width: 2 * Config.NODE_SIZE,
            height: Config.NODE_SIZE,
            fill: '#00000000',
            stroke: 'black',
            strokeWidth: 2,
        });

        const divider = makeLine([0, -Config.NODE_SIZE / 2, 0, Config.NODE_SIZE / 2]);

        const dot = new fabric.Circle({
            radius: Config.NODE_SIZE / 8,
            fill: 'black',
            stroke: 'black',
            strokeWidth: 2,
            left: Config.NODE_SIZE / 2,
        });

        const text = new fabric.IText(this.data.toString(), {
            fill: '#black',
            left: -Config.NODE_SIZE / 2,
        });

        return [box, divider, dot, text];
    }

    public getHeadContactPoint(angle: number): Point {
        return getBoxIntersection(this.getCenter(), angle + Math.PI,
            this.representation.width, this.representation.height);
    }

    public getTailContactPoint(): Point {
        return this.getDotLocation();
    }

    public getAngleTo(other: Node): number {
        return calculateAngle(this.getDotLocation(), other.getCenter());
    }

    public getCenter(): Point {
        return {
            x: this.representation.left,
            y: this.representation.top,
        };
    }

    private getDotLocation(): Point {
        return {
            x: this.representation.left + Config.NODE_SIZE / 2,
            y: this.representation.top,
        };
    }
}
