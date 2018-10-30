class ToolBox {
    constructor() {
        this.pencil = new Pencil();
        this.circle = new Circle();
        this.rectangle = new Rectangle();
        this.font = new Font();
        this.curve = new Curve();
        this.move = new Move();
        this.bucket = new Bucket();

        this.currentTool = this.pencil;

        this.pencil.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.pencil;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.circle.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.circle;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.rectangle.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.rectangle;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.font.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.font;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.curve.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.curve;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.move.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.move;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
        this.bucket.element.onclick = event => {
            this.resetToolBox();
            this.currentTool = this.bucket;
            this.currentTool.element.setAttribute("class", "activeTool");
        };
    }
    resetToolBox() {
        this.pencil.element.setAttribute("class", "inactiveTool");
        this.circle.element.setAttribute("class", "inactiveTool");
        this.rectangle.element.setAttribute("class", "inactiveTool");
        this.font.element.setAttribute("class", "inactiveTool");
        this.curve.element.setAttribute("class", "inactiveTool");
        this.move.element.setAttribute("class", "inactiveTool");
        this.bucket.element.setAttribute("class", "inactiveTool");
    }
}