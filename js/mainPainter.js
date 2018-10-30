class MainPainter {
    constructor() {
        this.canvases = [];
        this.tracker = 0;
        this.toolBox = new ToolBox();
        this.toolProperties = new ToolProperties();

        //create layer
        let createLayer = document.getElementById("createLayer");

        createLayer.addEventListener("click", () => {
            // console.log("add layer");
            // console.log(svgContainer);
            svgContainer.style.backgroundColor = "white";
            svgContainer.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.25)";

            let layer = new LayerElement(this.canvases.length);
            leftCol.appendChild(layer.element);
            svgCanvas.appendChild(layer.canvasLayer);
            leftCol.appendChild(layer.eye);
            this.canvases.push(layer);
            this.activeLayer = layer;
            this.history = [];

            for (let i = 0; i < this.canvases.length; i++) {
                this.canvases[i].element.setAttribute(
                    "class",
                    "inactiveLayerBlock"
                );
            }

            this.activeLayer.element.setAttribute("class", "activeLayerBlock");
            layer.element.innerHTML += " Layer " + this.tracker;
            layer.element.id = "Layer" + this.tracker;
            layer.eye.id = "eye" + this.tracker;
            layer.canvasLayer.id = "Canvas" + this.tracker;
            layer.canvasLayer.style.zIndex = this.tracker;
            this.tracker++;
            //make clicked layer active layer
            layer.element.addEventListener("click", event => {
                this.activeLayer = layer;
                for (let i = 0; i < this.canvases.length; i++) {
                    this.canvases[i].element.setAttribute(
                        "class",
                        "inactiveLayerBlock"
                    );
                }
                this.activeLayer.element.setAttribute(
                    "class",
                    "activeLayerBlock"
                );
            });
            //eye function
            layer.eye.addEventListener("click", event => {
                this.activeLayer = layer;
                if (
                    this.activeLayer.eye.getAttribute("class") === "clickedEye"
                ) {
                    //now show the content
                    this.activeLayer.canvasLayer.setAttribute("opacity", 1);
                    this.activeLayer.eye.setAttribute("class", "unclickedEye");
                } else {
                    //hide the content

                    this.activeLayer.canvasLayer.setAttribute("opacity", 0);
                    this.activeLayer.eye.setAttribute("class", "clickedEye");
                }
            });

            //mousedown
            svgCanvas.addEventListener("mousedown", event => {
                stop = false;
                this.toolBox.currentTool.color = this.toolProperties.color;
                this.toolBox.currentTool.strokeWidth = this.toolProperties.sizeInput.value;
                this.toolBox.currentTool.MouseDown(
                    event,
                    this.activeLayer.canvasLayer
                );
            });
            //mouseup
            svgCanvas.addEventListener("mouseup", event => {
                //console.log("in mouseup");
                this.toolBox.currentTool.color = this.toolProperties.color;
                this.toolBox.currentTool.strokeWidth = this.toolProperties.sizeInput.value;
                this.toolBox.currentTool.MouseUp(
                    event,
                    this.activeLayer.canvasLayer
                );
            });
            //mousemove only for move and bezier curve
            svgCanvas.addEventListener("mousemove", event => {
                if (
                    this.toolBox.currentTool === this.toolBox.move ||
                    this.toolBox.currentTool === this.toolBox.curve
                ) {
                    // console.log("inmouse move");
                    this.toolBox.currentTool.color = this.toolProperties.color;
                    this.toolBox.currentTool.strokeWidth = this.toolProperties.sizeInput.value;
                    this.toolBox.currentTool.MouseMove(
                        event,
                        this.activeLayer.canvasLayer
                    );
                }
            });
            //click only for bezier curve
            svgCanvas.addEventListener("click", event => {
                if (this.toolBox.currentTool === this.toolBox.curve) {
                    // console.log("in click main painter");
                    this.toolBox.currentTool.color = this.toolProperties.color;
                    this.toolBox.currentTool.strokeWidth = this.toolProperties.sizeInput.value;
                    this.toolBox.currentTool.MouseClick(
                        event,
                        this.activeLayer.canvasLayer
                    );
                }
            });
        });

        //delete layer
        let deleteLayer = document.getElementById("deleteLayer");
        deleteLayer.addEventListener("click", event => {
            if (this.canvases.length > 0) {
                leftCol.removeChild(this.activeLayer.element);
                leftCol.removeChild(this.activeLayer.eye);
                svgCanvas.removeChild(this.activeLayer.canvasLayer);
                this.canvases.splice(
                    this.canvases.indexOf(this.activeLayer),
                    1
                );
            }
            if (this.canvases.length != 0) {
                //set last layer as active
                this.activeLayer = this.canvases[this.canvases.length - 1];
                this.activeLayer.element.setAttribute(
                    "class",
                    "activeLayerBlock"
                );
            }
            if (this.canvases.length === 0) {
                svgContainer.style.backgroundColor = "transparent";
                svgContainer.style.boxShadow = "none";
            }
        });

        //undo
        let undo = document.getElementById("undo");
        undo.addEventListener("click", event => {
            let paths = 0;
            paths = this.activeLayer.canvasLayer.children;
            //console.log("clearing layer path ", paths);
            let len = paths.length;
            //console.log("no of paths", len);
            paths[len - 1].remove();
        });

        //clear current layer
        let clearCurrentLayer = document.getElementById("clearCurrentLayer");
        clearCurrentLayer.addEventListener("click", event => {
            this.activeLayer.canvasLayer.innerHTML = "";
        });

        // clear All canvases
        let clearAll = document.getElementById("clear");
        clearAll.addEventListener("click", function() {
            leftCol.innerHTML = "";
            svgCanvas.innerHTML = "";
            svgContainer.style.backgroundColor = "transparent";
            svgContainer.style.boxShadow = "none";
        });

        //merge layers
        let mergeLayer = document.getElementById("mergeLayer");
        mergeLayer.addEventListener("click", event => {
            if (
                this.canvases.length > 1 &&
                this.canvases.length - 1 !=
                this.canvases.indexOf(this.activeLayer)
            ) {
                let selectedLayer = this.canvases[
                    this.canvases.indexOf(this.activeLayer) + 1
                ];
                let cx = selectedLayer.canvasLayer;
                this.activeLayer.canvasLayer.appendChild(cx);
                leftCol.removeChild(selectedLayer.element);
                leftCol.removeChild(selectedLayer.eye);
                this.canvases.splice(this.canvases.indexOf(selectedLayer), 1);
            }
        });
    }
}