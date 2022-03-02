


export class CompoundOperation implements DSOperation {
    public type = "CompoundOperation";
    public operations: DSOperation[];

    constructor(operations: DSOperation[]) {
        this.operations = operations;
    }
}