class ToolProperties {
    constructor() {
        this.color = "#000";
        this.sizeInput = document.getElementById("size");
        this.sizeInput.addEventListener("change", () => {
            this.strokeSize = this.sizeInput.value;
            this.inputValue = document.getElementById("inputValue");
            // console.log(inputValue);
            inputValue.innerHTML = this.strokeSize;
        });
        this.transparent = document.getElementById("transparentColor");
        this.transparent.onclick = () => {
            this.color = "transparent";
            //console.log("defaultFill", defaultFill);
        };
        this.canvas = document.getElementsByClassName("color-bar")[0];
        this.ctx = this.canvas.getContext("2d");
        var colorFrame = new Image();
        // colorFrame.src =
        //     "http://2.bp.blogspot.com/_6ZIqLRChuQg/S2gHmfRGRoI/AAAAAAAAAdE/4SdZoVgu2pc/s320/rainbow.jpg";
        colorFrame.src = "../images/color-picker.png";
        colorFrame.width = "200px";

        colorFrame.crossOrigin = "Anonymous";
        console.log(
            "canvas height width",
            this.canvas.height,
            this.canvas.width
        );
        colorFrame.onload = () => {
            this.ctx.drawImage(
                colorFrame,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
        };

        this.canvas.onmousemove = e => {
            console.log(
                "canvas height width",
                this.canvas.height,
                this.canvas.width
            );
            var posX = e.clientX - this.canvas.getBoundingClientRect().left;
            var posY = e.clientY - this.canvas.getBoundingClientRect().top;
            //console.log("pos", posX, posY);
            var imgData = this.ctx.getImageData(posX, posY, 1, 1);
            this.canvas.addEventListener("click", e => {
                var value =
                    "rgb(" +
                    imgData.data[0] +
                    "," +
                    imgData.data[1] +
                    "," +
                    imgData.data[2] +
                    ")";
                console.log("from canvas", value);
                this.color = value;
            });
        };
    }
}