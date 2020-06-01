import { Node } from "./Node";

export interface DSOperation {
    type: string;
}

export class CreateNode implements DSOperation {
    public type = "CreateNode";
    public value: number;
    public pointer: string;
    public oldDestination: Node;

    constructor(value: number, pointer: string) {
        this.value = value;
        this.pointer = pointer;
    }
}

export class CreatePointer implements DSOperation {
    type = "CreatePointer";
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class AssignPointer implements DSOperation {
    public type = "AssignPointer";
    public lhs: string;
    public rhs: string;
    public oldDestination: Node;

    constructor(lhs: string, rhs: string) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}
