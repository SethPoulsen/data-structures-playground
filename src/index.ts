import { LinkedList } from "./LinkedList";
import { fabric } from "fabric"
export class DSPlayground {
    constructor(root: HTMLDivElement) {
        console.log("Made a new DSPlayground!");
        
        let canvasEl = document.createElement("canvas");
        root.append(canvasEl);
        
        let canvas = new fabric.Canvas(canvasEl);
        var circle = new fabric.Circle({
            radius: 20, fill: 'green', left: 100, top: 100
          });
          var triangle = new fabric.Triangle({
            width: 20, height: 30, fill: 'blue', left: 50, top: 50
          });
          
          canvas.add(circle, triangle);

        let ll = new LinkedList();
    }
}

