import { LinkedList } from "./LinkedList";
import { validateVariableName } from "./VariableValidation";
import { DSOperation, CreateNode, CreatePointer, AssignPointer } from "./Operations";

function setControlsBoxStyle(control: HTMLDivElement) {
    control.style.width = "33%";
    control.style.height = "200px";
    control.style.border = "1px solid black";
    control.style.padding = "10px";
}


export class DSPlayground {

    private controls: HTMLDivElement;

    private undoButton: HTMLButtonElement;
    private redoButton: HTMLButtonElement;
    private undoStack: DSOperation[] = [];
    private redoStack: DSOperation[] = [];

    private linkedList: LinkedList;

    private createControlsDiv(html: string) {
        const div = document.createElement("div");
        setControlsBoxStyle(div);
        div.innerHTML = html;
        this.controls.appendChild(div);
        return div;
    }

    constructor(root: HTMLDivElement) {
        console.log("Made a new DSPlayground!");

        const canvasEl = document.createElement("canvas");
        canvasEl.width = 1000;
        canvasEl.height = 500;
        canvasEl.style.width = canvasEl.width + "px";
        canvasEl.style.height = canvasEl.height + "px";
        root.append(canvasEl);

        this.controls = document.createElement("div");
        root.append(this.controls);
        this.controls.style.width = "1000px";
        this.controls.style.height = "200px";
        this.controls.style.display = "flex";

        const createNodeDiv = this.createControlsDiv(`
            <div style="font-size: 1.2em; padding: 2px;" >
                <u> Create a new node </u>
            </div> <div></div>
            <div style="padding: 2px;">
                Create a node with value
                <input style="padding: 2px; width: 100px;" type="number">
                </input>
            </div>
            <div style="padding: 2px;">
                which is pointed to by
                <select> </select>
            </div>
            <div style="padding: 2px;">
                <button id="createNodeButton"
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px">
                    Create!
                </button>
            </div
        `);

        const createPointerDiv = this.createControlsDiv(`
            <div style="font-size: 1.2em; padding: 2px;" >
                <u> Create a new Pointer </u>
            </div> <div></div>
            <div style="padding: 2px;">
                Create a new pointer called
                <input style="padding: 2px; width: 100px;" >
                </input>
            </div>
            <div style="padding: 2px;">
                <button id="createPointerButton"
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px">
                    Create!
                </button>
            </div
        `);

        const assignPointerDiv = this.createControlsDiv(`
            <div style="font-size: 1.2em; padding: 2px;" >
                <u> Assign a pointer </u>
            </div> <div></div>
            <div style="padding: 2px;">
                Assign the pointer
                <select> </select>

            </div>
            <div style="padding: 2px;">
                to point to the same location as the pointer
                <select> </select>
            </div>
            <div style="padding: 2px;">
                <button id="assignPointerButton"
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px">
                    Assign!
                </button>
            </div
        `);

        // TODO: create another controls box for the user to input a list of numbers
        // to initialize the list

        this.createControlsDiv(`
            <div style="padding: 2px;">
                <button id="undoButton"
                    style="background-color: #87CEFA; height: 30px; width: 100px">
                    Undo
                </button>
                <button id="redoButton"
                    style="background-color: #87CEFA; height: 30px; width: 100px">
                    Redo
            </button>
            </div
        `);

        this.linkedList = new LinkedList(canvasEl);

        createPointerDiv.querySelector("button").addEventListener("click", () => {
            const inputEl = createPointerDiv.querySelector("input");
            const pointerName = inputEl.value.trim();
            inputEl.value = "";

            if (!validateVariableName(pointerName, this.linkedList.getAccessibleNames())) {
                return;
            }

            this.performOperation(new CreatePointer(pointerName));

            inputEl.value = "";
            this.updateDropdownOptions(this.linkedList);

        });

        createNodeDiv.querySelector("button").addEventListener("click", () => {
            const inputEl = createNodeDiv.querySelector("input");
            const selectEl = createNodeDiv.querySelector("select");
            const pointerName = selectEl.selectedOptions[0].value;

            const operation = new CreateNode(parseInt(inputEl.value), pointerName);
            this.performOperation(operation);

            inputEl.value = "";
            this.updateDropdownOptions(this.linkedList);
        });

        assignPointerDiv.querySelector("button").addEventListener("click", () => {
            const selectEls = assignPointerDiv.querySelectorAll("select");
            const lhsPointer = selectEls[0].selectedOptions[0].value;
            const rhsPointer = selectEls[1].selectedOptions[0].value;

            const operation = new AssignPointer(lhsPointer, rhsPointer);
            this.performOperation(operation);

            this.updateDropdownOptions(this.linkedList);
        });

        this.undoButton = <HTMLButtonElement> document.getElementById("undoButton");
        this.undoButton.addEventListener("click", () => {
            const lastOp = this.undoStack.pop();
            if (!lastOp) {
                return;
            }
            this.undoOperation(lastOp);
            this.redoStack.push(lastOp);
        });

        this.redoButton = <HTMLButtonElement> document.getElementById("redoButton");
        this.redoButton.addEventListener("click", () => {
            const lastOp = this.redoStack.pop();
            if (!lastOp) {
                return;
            }
            this.performOperationInternal(lastOp);
            this.undoStack.push(lastOp);
        });

    }

    private updateDropdownOptions(ll: LinkedList): void {
        let options = "";
        for (const varName of ll.getAccessibleNames()) {
            options += `<option>${varName}</option>`;
        }
        this.controls.querySelectorAll("select").forEach(selectEl => selectEl.innerHTML = options);
    }

    private performOperation(op: DSOperation): void {
        this.performOperationInternal(op);
        this.redoStack = []; // TODO also grey out UI to show its not usable
        this.undoStack.push(op);
    }

    private undoOperation(op: DSOperation): void {
        if (op.type === "CreateNode") {
            this.linkedList.unCreateNode(op as CreateNode);
        } else if (op.type === "CreatePointer") {
            this.linkedList.unCreatePointer(op as CreatePointer);
        } else if (op.type === "AssignPointer") {
            this.linkedList.unAssignPointer(op as AssignPointer);
        } else {
            throw(new Error("Unsupported Operation"));
        }
    }

    private performOperationInternal(op: DSOperation): void {
        if (op.type === "CreateNode") {
            (op as CreateNode).oldDestination = this.linkedList.createNode(op as CreateNode);
        } else if (op.type === "CreatePointer") {
            this.linkedList.createPointer(op as CreatePointer);
        } else if (op.type === "AssignPointer") {
            (op as AssignPointer).oldDestination = this.linkedList.assignPointer(op as AssignPointer);
        } else {
            throw(new Error("Unsupported Operation"));
        }
    }


}
