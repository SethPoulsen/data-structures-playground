import { fabric } from "fabric";
import { makeLine } from "./Utils";
import Config = require("./Config");


export class Node {
    public data: number;
    public next: Node;
    public centerX: number;
    public centerY: number;
    private representation: fabric.Object;
    
    constructor(data: number, next: Node) {
        this.data = data;
        this.next = next;
    }
    
    public draw(svg: SVGElement): void {
        // TODO: figures out how to use fabric.js to group the circle, 
        // number, and arrow together so that they all move together 
        // and can be treated as a single object to store in this.representation 

        // Draw the Node
        let groupEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute("cx", this.centerX.toString());
        circle.setAttribute("cy", this.centerY.toString());
        circle.setAttribute("r", Config.NODE_SIZE.toString());
        circle.setAttribute("stroke", "black")
        circle.setAttribute("fill", "transparent")

        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute("x", this.centerX.toString());
        text.setAttribute("y", this.centerY.toString());
        text.innerHTML = this.data.toString();
        text.setAttribute("style", "text-anchor: middle; dominant-baseline: middle;")

        svg.appendChild(circle);
        svg.appendChild(text);

        // Draw the next pointer
        // TODO: write a utility function that will draw an arrow given start and end points
        // const nodeCenter = Config.LIST_Y + Config.NODE_SIZE;
        // const nextNodeLeft = leftEdge + Config.NODE_SPACE
        // var line = makeLine([leftEdge + (2 * Config.NODE_SIZE), nodeCenter, nextNodeLeft, nodeCenter]);
        // var arrow1 = makeLine([nextNodeLeft - 20, nodeCenter + 20, nextNodeLeft, nodeCenter]);
        // let arrow2 = makeLine([nextNodeLeft - 20, nodeCenter - 20, nextNodeLeft, nodeCenter]);
        // svg.appendChild(line);
        // svg.appendChild(arrow1); 
        // svg.appendChild(arrow2);

    }

}