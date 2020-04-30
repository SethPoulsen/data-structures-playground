import { fabric } from "fabric";
import { makeLine } from "./Utils";
import Config = require("./Config");


export class Node {
    public data: number;
    public next: Node;
    private representation: fabric.Object;
    
    constructor(data: number, next: Node) {
        this.data = data;
        this.next = next;
    }
    
    public draw(canvas: fabric.Canvas, leftEdge: number): void {
        // TODO: figures out how to use fabric.js to group the circle, 
        // number, and arrow together so that they all move together 
        // and can be treated as a single object to store in this.representation 

        // Draw the Node
        var circle = new fabric.Circle({
            radius: Config.NODE_SIZE, 
            fill: '#00000000', 
            left: leftEdge, 
            top: Config.LIST_Y, 
            stroke: 'black',
            strokeWidth: 2
        });
        let num = new fabric.IText(this.data.toString(), {
            left: leftEdge + 30,
            top: Config.LIST_Y + 20,
            fill: '#black',
        });
        canvas.add(circle, num);

        // Draw the next pointer
        // TODO: write a utility function that will draw an arrow given start and end points
        const nodeCenter = Config.LIST_Y + Config.NODE_SIZE;
        const nextNodeLeft = leftEdge + Config.NODE_SPACE
        var line = makeLine([leftEdge + (2 * Config.NODE_SIZE), nodeCenter, nextNodeLeft, nodeCenter]);
        var arrow1 = makeLine([nextNodeLeft - 20, nodeCenter + 20, nextNodeLeft, nodeCenter]);
        let arrow2 = makeLine([nextNodeLeft - 20, nodeCenter - 20, nextNodeLeft, nodeCenter]);
        canvas.add(line);
        canvas.add(arrow1); 
        canvas.add(arrow2);

    }

}