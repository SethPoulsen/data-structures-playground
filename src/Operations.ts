
export interface DSOperation {
    type: string;
}

export class CreateNode implements DSOperation {
    public type = "CreateNode";
    public value: number;
    public id: number;
    public pointer: AssignPointer;

    constructor(value: number, id: number, pointer: AssignPointer) {
        this.value = value;
        this.id = id;
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
    public nodeId: number;
    public oldNodeId: number;

    constructor(lhs: string, nodeId: number, oldNodeId: number) {
        this.lhs = lhs;
        this.nodeId = nodeId;
        this.oldNodeId = oldNodeId;
    }
}
