import { fabric } from "fabric"

export class Node {

    constructor() {
        
    }
}

export class LinkedList {
    constructor(canvasEl: HTMLCanvasElement) {

        let canvas = new fabric.Canvas(canvasEl);
        var circle = new fabric.Circle({
            radius: 40, 
            fill: '#00000000', 
            left: 100, 
            top: 100, 
            stroke: 'black',
            strokeWidth: 2
        });

        let num = new fabric.IText('7', {
            left: 130,
            top: 120,
            fill: '#black',
        });

        canvas.add(circle, num);

    }
}


