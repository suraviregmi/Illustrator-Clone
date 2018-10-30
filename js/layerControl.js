console.log("layer control");

class LayerElement {
    constructor() {
        //create box to display LayerNumber
        this.element = document.createElement("div");
        this.element.setAttribute("class", "activelayerBlock");

        //create eye for the layer
        this.eye = document.createElement("div");
        this.eye.setAttribute("class", "unclickedEye");
        //create a group in SVG
        this.canvasLayer = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );
        this.canvasLayer.style.position = "absolute";
        this.canvasLayer.style.left = "0";
        this.canvasLayer.style.top = "0";
        this.canvasLayer.width = "1200";
        this.canvasLayer.height = "600";
        this.canvasLayer.setAttribute("fill", "none");

        // console.log(this.canvasLayer);
    }
}