import { fabric } from "fabric";
import { makeLine } from "./Utils";
import Config = require("./Config");


export class Node {
    public data: number;
    public next: Node;
    
    public centerX: number;
    public centerY: number;
    
    private circleEl: SVGCircleElement;
    private textEl: SVGTextElement;
    
    constructor(data: number, next: Node, svg: SVGElement) {
        this.data = data;
        this.next = next;

        this.circleEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');

        let groupEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        groupEl.appendChild(this.circleEl);
        groupEl.appendChild(this.textEl);

        groupEl.addEventListener("mousedown", this.onDrag);

        svg.appendChild(groupEl);
    }
    
    private onDrag(): void {
        console.log("HIII");
    }

    public draw(): void {
        // TODO: figures out how to use fabric.js to group the circle, 
        // number, and arrow together so that they all move together 
        // and can be treated as a single object to store in this.representation 

        // Draw the Node
        this.circleEl.setAttribute("cx", this.centerX.toString());
        this.circleEl.setAttribute("cy", this.centerY.toString());
        this.circleEl.setAttribute("r", Config.NODE_SIZE.toString());
        this.circleEl.setAttribute("stroke", "black")
        this.circleEl.setAttribute("fill", "transparent")

        this.textEl.setAttribute("x", this.centerX.toString());
        this.textEl.setAttribute("y", this.centerY.toString());
        this.textEl.innerHTML = this.data.toString();
        this.textEl.setAttribute("style", "text-anchor: middle; dominant-baseline: middle;");
        this.textEl.setAttribute("pointer-events", "none");

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