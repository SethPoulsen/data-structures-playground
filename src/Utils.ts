import { fabric } from "fabric";


export function makeLine(coords: number[]) {
    return new fabric.Line(coords, {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
}
