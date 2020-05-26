import { LinkedList } from "./LinkedList";


function setControlsBoxStyle(control: HTMLDivElement) {
    control.style.width = "33%"
    control.style.height = "200px"
    control.style.border = "1px solid black"; 
    control.style.padding = "10px";
}


export class DSPlayground {

    private controls: HTMLDivElement;

    private createControlsDiv(html: string) {
        let div = document.createElement("div");
        setControlsBoxStyle(div);
        div.innerHTML = html;
        this.controls.appendChild(div);
        return div;
    }

    constructor(root: HTMLDivElement) {
        console.log("Made a new DSPlayground!");
        
        let canvasEl = document.createElement("canvas");
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

        let createNodeDiv = this.createControlsDiv(`
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

        let createPointerDiv = this.createControlsDiv(`
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

        let reassignPointerDiv = this.createControlsDiv(`
            <div style="font-size: 1.2em; padding: 2px;" > 
                <u> Move/Reassign a pointer </u>  
            </div> <div></div>
            <div style="padding: 2px;"> 
                Reassign the pointer
                <select> </select>

            </div>
            <div style="padding: 2px;"> 
                to point to the same location as the pointer 
                <select> </select>
            </div>
            <div style="padding: 2px;"> 
                <button id="reassignPointerButton" 
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px"> 
                    Reassign! 
                </button>
            </div
        `);

        // TODO: create another controls box for the user to input a list of numbers 
        // to initialize the list
        let ll = new LinkedList(canvasEl);

        createPointerDiv.querySelector("button").addEventListener("click", () => {
            let inputEl = createPointerDiv.querySelector("input");
            ll.createPointer(inputEl.value);
            inputEl.value = "";
            this.updateDropdownOptions(ll);
        });

        createNodeDiv.querySelector("button").addEventListener("click", () => {
            let inputEl = createNodeDiv.querySelector("input");
            let selectEl = createNodeDiv.querySelector("select");
            let pointerName = selectEl.selectedOptions[0].value;
            ll.createNode(parseInt(inputEl.value), pointerName);
            inputEl.value = "";
            this.updateDropdownOptions(ll);
        });

        reassignPointerDiv.querySelector("button").addEventListener("click", () => {
            let selectEls = reassignPointerDiv.querySelectorAll("select");

            let lhsPointer = selectEls[0].selectedOptions[0].value;
            let rhsPointer = selectEls[1].selectedOptions[0].value;
            ll.reassignPointer(lhsPointer, rhsPointer);
            this.updateDropdownOptions(ll);
        });
    }

    updateDropdownOptions(ll: LinkedList) {
        let options = "";
        for (let varName of ll.getAccessibleNames()) {
            options += `<option>${varName}</option>`;
        }
        this.controls.querySelectorAll("select").forEach(selectEl => selectEl.innerHTML = options);
    }
}
