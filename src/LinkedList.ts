import { fabric } from "fabric";
import { Node } from "./Node";
import { Variable } from "./Variable";
import { Pointer } from "./Pointer";
import { BoxNode } from "./BoxNode";
import { CreateNode, CreatePointer, AssignPointer as AssignPointer } from "./Operations";

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

        this.canvas.on('object:moving', () => this.draw());
    }

    public draw(): void {
        for (const key in this.globalVars) {
            this.globalVars[key].draw();
        }

        for (const node of this.nodes) {
            node.draw();
        }

        this.canvas.renderAll();
    }

    public getAccessibleNames(): string[] {
        let names : string[] = [];
        for (const key in this.globalVars) {
            names = names.concat(this.globalVars[key].getAccessibleNames());
        }
        return names;
    }

    public createPointer(op: CreatePointer): void {
        this.globalVars[op.name] = new Variable(op.name, this.canvas);
        this.draw();
    }

    public createNode(op: CreateNode): Node {
        const ptr = this.getPointerFromString(op.pointer);

        const node = new BoxNode(op.value, this.canvas, ptr);
        this.nodes.push(node);
        const oldDestination = ptr.deref();
        ptr.set(node);
        this.draw();
        return oldDestination;
    }

    public assignPointer(op: AssignPointer): Node {
        const lhsPointer = this.getPointerFromString(op.lhs);
        const oldDestination = lhsPointer.deref();
        lhsPointer.set(this.getPointerFromString(op.rhs).deref());
        this.draw();
        return oldDestination;
    }

    public unCreatePointer(op: CreatePointer): void {
        this.globalVars[op.name].erase();
        delete this.globalVars[op.name];
    }

    public unCreateNode(op: CreateNode): void {
        // put the pointer back where it was
        this.getPointerFromString(op.pointer).set(op.oldDestination);

        // get rid of the node
        this.nodes[this.nodes.length - 1].erase();
        this.nodes.pop();
        this.draw();
    }

    public unAssignPointer(op: AssignPointer): void {
        this.getPointerFromString(op.lhs).set(op.oldDestination);
        this.draw();
    }

    private getPointerFromString(str: string): Pointer {
        const [firstToken, next] = str.split("->");
        if (!(firstToken in this.globalVars)) {
            throw Error("Invalid string; first token is not a global variable");
        } else if (next === undefined) {
            return this.globalVars[firstToken].pointer;
        } else if (next === "next") {
            return this.globalVars[firstToken].pointer.deref().next;
        } else {
            throw Error("Only member pointers names 'next' are supported right now.");
        }
    }
}
