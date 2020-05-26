import { fabric } from "fabric";
import { Node } from "./Node";
import { Variable } from "./Variable";
import { Pointer } from "./Pointer";

export class LinkedList {

    private globalVars: { [key: string]: Variable };
    private nodes: Node[];
    private canvas: fabric.Canvas;

    constructor(canvasEl: HTMLCanvasElement) {

        this.canvas = new fabric.Canvas(canvasEl);
        this.canvas.selection = false;

        // this allows us to draw circles using the coordinates of their centers
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

        this.nodes = [];
        this.globalVars = {};

        this.draw();

        const self = this;
        this.canvas.on('object:moving', function (e) {
            self.draw();
        });
    }

    public draw() {
        for (let key in this.globalVars) {
            this.globalVars[key].draw();
        }

        for (let node of this.nodes) {
            node.draw();
        }

        this.canvas.renderAll();
    }

    public getAccessibleNames(): string[] {
        let names : string[] = [];
        for (let key in this.globalVars) {
            names = names.concat(this.globalVars[key].getAccessibleNames())
        }
        return names;
    }

    public createPointer(name: string): void {
        this.globalVars[name] = new Variable(name, this.canvas);
        this.draw();
    }

    public createNode(value: number, pointerToNode: string): void {
        const node = new Node(value, this.canvas);
        this.nodes.push(node);
        this.getPointerFromString(pointerToNode).set(node);

        this.draw();
    }

    public reassignPointer(lhs: string, rhs: string): void {
        this.getPointerFromString(lhs).set(this.getPointerFromString(rhs).deref());
        this.draw();
    }

    private getPointerFromString(str: string): Pointer {
        let [firstToken, next] = str.split("->");
        if (!(firstToken in this.globalVars)) {
            throw Error("Invalid string; first token is not a global variable");
        } else if (next === undefined) {
            return this.globalVars[firstToken].pointer;
        } else if (next === "next") {
            return this.globalVars[firstToken].pointer.deref().next;
        } else {
            throw Error("Only member pointers names 'next' are supported right now.")
        }
    }
}
