import { LinkedList } from "./LinkedList";


function setControlsBoxStyle(control: HTMLDivElement) {
    control.style.width = "33%"
    control.style.height = "200px"
    control.style.border = "1px solid black"; 
    control.style.padding = "10px";
    // control.style.borderLeft = "2px solid black";
}

export class DSPlayground {
    constructor(root: HTMLDivElement) {
        console.log("Made a new DSPlayground!");
        
        let canvasEl = document.createElement("canvas");
        canvasEl.width = 1000;
        canvasEl.height = 500;
        canvasEl.style.width = canvasEl.width + "px";
        canvasEl.style.height = canvasEl.height + "px";
        root.append(canvasEl);

        let controlsDiv = document.createElement("div");
        root.append(controlsDiv);
        controlsDiv.style.width = "1000px";
        controlsDiv.style.height = "200px";
        controlsDiv.style.display = "flex";

        let createNodeDiv = document.createElement("div");
        let createPointerDiv = document.createElement("div"); 
        let reassignPointerDiv = document.createElement("div");

        setControlsBoxStyle(createNodeDiv);
        setControlsBoxStyle(createPointerDiv);
        setControlsBoxStyle(reassignPointerDiv);
        
        createNodeDiv.innerHTML = `
            <div style="font-size: 1.2em; padding: 2px;" > 
                <u> Create a new node </u>  
            </div> <div></div>
            <div style="padding: 2px;"> 
                Create a node with value
                <input style="padding: 2px; width: 100px;" type="number"> 
                </input>
            </div>
            <div style="padding: 2px;"> 
                with its next pointer pointing to 
                <select> </select>
            </div>
            <div style="padding: 2px;"> 
                <button id="createNodeButton" 
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px"> 
                    Create! 
                </button>
            </div
        `;

        createPointerDiv.innerHTML = `
            <div style="font-size: 1.2em; padding: 2px;" > 
                <u> Create a new Pointer </u>  
            </div> <div></div>
            <div style="padding: 2px;"> 
                Create a new pointer called
                <input style="padding: 2px; width: 100px;" > 
                </input>
            </div>
            <div style="padding: 2px;"> 
                to point to the same location as the pointer 
                <select> </select>
            </div>
            <div style="padding: 2px;"> 
                <button id="createNodeButton" 
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px"> 
                    Create! 
                </button>
            </div
        `;

        reassignPointerDiv.innerHTML = `
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
                <button id="createNodeButton" 
                    style="float:right; background-color: #87CEFA; height: 30px; width: 100px"> 
                    Reassign! 
                </button>
            </div
        `;
        controlsDiv.append(createNodeDiv);
        controlsDiv.append(createPointerDiv);
        controlsDiv.append(reassignPointerDiv);

        let ll = new LinkedList(canvasEl);

    }
}

