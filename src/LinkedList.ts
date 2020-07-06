import { fabric } from "fabric";
import { Node } from "./Node";
import { Variable } from "./Variable";
import { Pointer } from "./Pointer";
import { BoxNode } from "./BoxNode";
import { CreateNode, CreatePointer, AssignPointer as AssignPointer } from "./Operations";

export class LinkedList {

    private globalVars: { [key: string]: Variable };
    private nodes: { [id: number]: Node };
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

        for (const id in this.nodes) {
            this.nodes[id].draw();
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

    public createNode(op: CreateNode): void {
        const node = new BoxNode(op.value, op.id, this.canvas,
            this.getPointerFromString(op.assignSuboperation.pointer).getOriginLocation());
        this.nodes[op.id] = node;
        this.assignPointer(op.assignSuboperation);
        this.draw();
    }

    public assignPointer(op: AssignPointer): void {
        const lhsPointer = this.getPointerFromString(op.pointer);
        lhsPointer.set(this.nodes[op.newNodeId]);
        this.draw();
    }

    public unCreatePointer(op: CreatePointer): void {
        this.globalVars[op.name].erase();
        delete this.globalVars[op.name];
    }

    public unCreateNode(op: CreateNode): void {
        // put the pointer back where it was
        this.unAssignPointer(op.assignSuboperation);

        // get rid of the node
        this.nodes[op.id].erase();
        delete this.nodes[op.id];
        this.draw();
    }

    public unAssignPointer(op: AssignPointer): void {
        this.getPointerFromString(op.pointer).set(this.nodes[op.oldNodeId]);
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

    public getNodeIdAt(pointer: string): number {
        return this.getPointerFromString(pointer).deref()?.getId();
    }

}
