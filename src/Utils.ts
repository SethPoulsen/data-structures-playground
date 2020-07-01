import { fabric } from "fabric";
import { Point } from "./Types";

const origin: Point = { x: 0, y: 0 };
export function makeLine(start: Point=origin, end: Point=origin): fabric.Line {
    return new fabric.Line([start.x, start.y, end.x, end.y], {
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

/**
 * Calculates the point at which a ray drawn from the center of a box intersects the box boundrary.
 * @param center center of the box
 * @param angle angle at which ray is drawn, with respect to the positive x-axis
 * @param width width of the box
 * @param height height of the box
 */
export function getBoxIntersection(center: Point, angle: number, width: number, height: number): Point {
    // r is distance from center to contact point
    // take minimum to determine if it intersects the vertical or horizontal boundary first
    const r = Math.min(
        Math.abs((width / 2) / Math.cos(angle)),
        Math.abs((height / 2) / Math.sin(angle))
    );

    return {
        x: center.x + Math.cos(angle) * r,
        y: center.y + Math.sin(angle) * r
    };
}
