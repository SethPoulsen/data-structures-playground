import { fabric } from "fabric"

export class Node {

    constructor() {
        
    }
}

function drawNode(canvas: fabric.Canvas, left: number, top: number, n: string) {
        var circle = new fabric.Circle({
            radius: 40, 
            fill: '#00000000', 
            left: left, 
            top: top, 
            stroke: 'black',
            strokeWidth: 2
        });

        let num = new fabric.IText(n, {
            left: left + 30,
            top: top + 20,
            fill: '#black',
        });

        canvas.add(circle, num);
}

function makeLine(coords: number[]) {
    return new fabric.Line(coords, {
      fill: 'black',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });
}


export class LinkedList {
    constructor(canvasEl: HTMLCanvasElement) {

        let canvas = new fabric.Canvas(canvasEl);
        drawNode(canvas, 100, 100, '7');
        drawNode(canvas, 300, 100, '1');
        drawNode(canvas, 500, 100, '3');

        
        let nul = new fabric.IText('NULL', {
            left: 700,
            top: 120,
            fill: '#black',
        });
        canvas.add(nul) 

        var line = makeLine([180, 140, 300, 140]);
        var arrow1 = makeLine([280, 120, 300, 140]);
        let arrow2 = makeLine([280, 160, 300, 140]);
        canvas.add(line);
        canvas.add(arrow1); 
        canvas.add(arrow2);

        line = makeLine([380, 140, 500, 140]);
        arrow1 = makeLine([480, 120, 500, 140]);
        arrow2 = makeLine([480, 160, 500, 140]);
        canvas.add(line);
        canvas.add(arrow1); 
        canvas.add(arrow2);

        line = makeLine([580, 140, 700, 140]);
        arrow1 = makeLine([680, 120, 700, 140]);
        arrow2 = makeLine([680, 160, 700, 140]);
        canvas.add(line);
        canvas.add(arrow1); 
        canvas.add(arrow2);


        let head = new fabric.IText('head', {
            left: 20,
            top: 20,
            fill: '#black',
        });
        canvas.add(head) 
        line = makeLine([60, 60, 100, 140]);
        arrow1 = makeLine([95, 110, 100, 140]);
        arrow2 = makeLine([70, 120, 100, 140]);
        canvas.add(line);
        canvas.add(arrow1); 
        canvas.add(arrow2);

    }
}


