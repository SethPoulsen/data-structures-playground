import { fabric } from "fabric";
import { Node } from "./Node";
import { makeLine } from "./Utils";
import Config = require("./Config");

export class LinkedList {

    private head: Node = null;
    private svgEl: SVGElement;

    constructor(svgEl: SVGElement, values:number[]=[]) {
        this.svgEl = svgEl;

        values = values.reverse();
        for (let num of values) {
            this.head = new Node(num, this.head);
        }

        this.draw()
        
        // let nul = new fabric.IText('NULL', {
        //     left: Config.LIST_X + (values.length * Config.NODE_SPACE),
        //     top: Config.LIST_Y + (Config.NODE_SIZE / 2),
        //     fill: '#black',
        // });
        // this.svgEl.add(nul) 

        // let head = new fabric.IText('head', {
        //     left: 20,
        //     top: 20,
        //     fill: '#black',
        // });
        // this.svgEl.add(head) 

        let line = makeLine([60, 60, 100, 140]);
        let arrow1 = makeLine([95, 110, 100, 140]);
        let arrow2 = makeLine([70, 120, 100, 140]);
        this.svgEl.append(line);
        this.svgEl.appendChild(arrow1); 
        this.svgEl.appendChild(arrow2);
    
    }

    public draw() {
        let leftEdge = Config.LIST_X;
        let temp = this.head;
        while (temp) {
            temp.draw(this.svgEl, leftEdge);
            
            leftEdge += Config.NODE_SPACE;
            temp = temp.next;
        }
    }
}


