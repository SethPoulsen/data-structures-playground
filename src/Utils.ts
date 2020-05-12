import { fabric } from "fabric";


export function makeLine(coords: number[]) {
    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineEl.setAttribute('x1', coords[0].toString());
    lineEl.setAttribute('y1', coords[1].toString());
    lineEl.setAttribute('x2', coords[2].toString());
    lineEl.setAttribute('y2', coords[3].toString());
    lineEl.setAttribute("stroke", "black")

    return lineEl;
}
