import { fabric } from "fabric";
import { Point } from "./Types";


export function makeLine(coords: number[] = [0, 0, 0, 0]): fabric.Line {
    return new fabric.Line(coords, {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
        selectable: false,
        evented: false,
    });
}

export function calculateAngle(p1: Point, p2: Point): number {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}
