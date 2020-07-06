
export interface DSOperation {
    type: string;
}

export class CreateNode implements DSOperation {
    public type = "CreateNode";
    public value: number;
    public id: number;
    public assignSuboperation: AssignPointer;

    constructor(value: number, id: number, assignSuboperation: AssignPointer) {
        this.value = value;
        this.id = id;
        this.assignSuboperation = assignSuboperation;
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
    public pointer: string;
    public newNodeId: number;
    public oldNodeId: number;

    constructor(pointer: string, newNodeId: number, oldNodeId: number) {
        this.pointer = pointer;
        this.newNodeId = newNodeId;
        this.oldNodeId = oldNodeId;
    }
}
