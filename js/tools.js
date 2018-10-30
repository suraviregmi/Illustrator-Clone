class Pencil {
    constructor() {
        this.element = document.getElementById("pen-tool");
    }
    MouseDown(event, layer) {
        this.path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        this.path.setAttribute("fill", defaultFill);
        this.path.setAttribute("draggable", "true");
        this.path.setAttribute("stroke", this.color);
        this.path.setAttribute("stroke-width", this.strokeWidth);
        this.path.setAttribute("class", "draggable");
        this.path.setAttribute("d", "M" + cursor.x + " " + cursor.y + " ");
        layer.appendChild(this.path);

        this.refloop = setTimeout(() => {
            this.pencilDraw();
        }, 1);
    }
    pencilDraw() {
        clearTimeout(this.refLoop);
        let d = this.path.getAttribute("d");
        d += "L" + cursor.x + " " + cursor.y + " ";
        this.path.setAttribute("d", d);
        if (!stop) {
            this.refloop = setTimeout(() => {
                this.pencilDraw();
            }, 1);
        }
    }
    MouseUp(event, layer) {
        stop = true;
    }
}

class Bucket {
    constructor() {
        this.element = document.getElementById("bucket");
        this.selectedElement = null;
    }
    MouseDown(evt, layer) {
        stop = false;
        let notcomplete = false;
        defaultFill = this.color;
        console.log(defaultFill);
        let target = evt.target;
        //to check bezier path
        if (target.classList.contains("quadratic-path")) {
            let parent = target.parentNode;
            let childrenss = parent.children;
            //check if path is complete
            for (let i = 0; i < childrenss.length; i++) {
                if (
                    childrenss[i].classList.contains(
                        "first-anchor" ||
                        "second-anchor" ||
                        "first-marker" ||
                        "dragging"
                    )
                ) {
                    notcomplete = true;
                }
            }
            if (notcomplete) {
                target = null;
            } else {
                target = target.parentNode;
            }
        }
        if (target.classList.contains("draggable")) {
            console.log("dragable");

            this.selectedElement = target;
            console.log("selected path", this.selectedElement);

            this.selectedElement.setAttribute("fill", defaultFill);
            console.log("selected path", this.selectedElement);
        }
    }
    MouseUp(event, layer) {
        stop = true;
        this.selectedElement = null;
    }
}

class Circle {
    constructor() {
        this.element = document.getElementById("circle-tool");
    }
    MouseDown(event, layer) {
        this.circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse"
        );
        this.circle.setAttribute("fill", defaultFill);
        //this.circle.setAttribute("fill", "none");
        this.circle.setAttribute("draggable", "true");
        this.circle.setAttribute("stroke", this.color);
        this.circle.setAttribute("stroke-width", this.strokeWidth);
        this.circle.setAttribute("class", "draggable");
        this.circle.setAttribute("cx", cursor.x);
        prev.x = cursor.x;
        this.circle.setAttribute("cy", cursor.y);
        prev.y = cursor.y;
        layer.appendChild(this.circle);

        this.refloop = setTimeout(() => {
            this.circleDraw();
        }, 1);
    }
    circleDraw() {
        clearTimeout(this.refLoop);
        let radiusX = cursor.x - prev.x;
        let radiusY = cursor.y - prev.y;
        let transformbyX = 0;
        let transformbyY = 0;
        if (radiusX < 0 && radiusY < 0) {
            //draw mathi patti
            radiusX = Math.abs(radiusX);
            radiusY = Math.abs(radiusY);
            transformbyX = -radiusX;
            transformbyY = -radiusY;
        }
        if (radiusX < 0) {
            //90 degree fip vertically
            radiusX = Math.abs(radiusX);
            transformbyX = -radiusX;
        }
        if (radiusY < 0) {
            //90 degree flip horizontally
            radiusY = Math.abs(radiusY);

            transformbyY = -radiusY;
        }
        this.circle.setAttribute("rx", radiusX);
        this.circle.setAttribute("ry", radiusY);
        this.circle.setAttribute(
            "transform",
            "translate(" + transformbyX + "," + transformbyY + ")"
        );

        if (!stop) {
            this.refloop = setTimeout(() => {
                this.circleDraw();
            }, 1);
        }
    }
    MouseUp(event, layer) {
        stop = true;
    }
}

class Rectangle {
    constructor() {
        this.element = document.getElementById("rect-tool");
    }
    MouseDown(event, layer) {
        this.rectangle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );

        this.rectangle.setAttribute("fill", defaultFill);
        this.rectangle.setAttribute("draggable", "true");
        this.rectangle.setAttribute("stroke", this.color);
        this.rectangle.setAttribute("stroke-width", this.strokeWidth);
        this.rectangle.setAttribute("class", "draggable");
        this.rectangle.setAttribute("x", cursor.x);
        prev.x = cursor.x;
        this.rectangle.setAttribute("y", cursor.y);
        prev.y = cursor.y;
        layer.appendChild(this.rectangle);

        this.refloop = setTimeout(() => {
            this.rectangleDraw();
        }, 1);
    }
    MouseUp(event, layer) {
        stop = true;
    }
    rectangleDraw() {
        clearTimeout(this.refLoop);
        let width = cursor.x - prev.x;
        let height = cursor.y - prev.y;
        let transformbyX = 0;
        let transformbyY = 0;
        if (width < 0 && height < 0) {
            //draw mathi patti
            width = Math.abs(width);
            height = Math.abs(height);
            transformbyX = -width;
            transformbyY = -height;
        }
        if (width < 0) {
            //90 degree fip vertically
            width = Math.abs(width);
            transformbyX = -width;
        }
        if (height < 0) {
            //90 degree flip horizontally
            height = Math.abs(height);

            transformbyY = -height;
        }
        this.rectangle.setAttribute("width", width);
        this.rectangle.setAttribute("height", height);
        this.rectangle.setAttribute(
            "transform",
            "translate(" + transformbyX + "," + transformbyY + ")"
        );

        if (!stop) {
            this.refloop = setTimeout(() => {
                this.rectangleDraw();
            }, 1);
        }
    }
}

class Font {
    constructor() {
        this.element = document.getElementById("font");
    }
    MouseUp(event, layer) {
        stop = true;
    }
    MouseDown(event, layer) {
        //console.log("mousedown called");
        let message = prompt("Text here", "");

        this.text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        // text.setAttribute("fill", "none");
        this.text.setAttribute("stroke", this.color);
        this.text.setAttribute("font-size", this.strokeWidth);
        this.text.setAttribute("x", cursor.x);
        this.text.setAttribute("y", cursor.y);
        this.text.setAttribute("fill", defaultFill);
        this.text.setAttribute("class", "draggable");
        this.text.innerHTML = message;
        layer.appendChild(this.text);
    }
}

class Move {
    constructor() {
        this.element = document.getElementById("hand");
        this.selectedElement = null;
        this.offset = { x: 0, y: 0 };
    }
    MouseUp(event, layer) {
        //end drag
        this.selectedElement = null;
        //console.log("in end drag", this.selectedElement);

        stop = true;
        //console.log("mouseup", stop);
    }
    MouseDown(evt, layer) {
        //start drag
        let notcomplete = false;
        stop = false;
        this.offset.x = cursor.x;
        this.offset.y = cursor.y;
        //console.log("OFFFFFFFFFFFFFFFFFFFFFFFFFFFFSET", this.offset);

        let target = evt.target;
        //to check bezier path
        if (target.classList.contains("quadratic-path")) {
            let parent = target.parentNode;
            let childrenss = parent.children;
            //check if path is complete
            for (let i = 0; i < childrenss.length; i++) {
                if (
                    childrenss[i].classList.contains(
                        "first-anchor" ||
                        "second-anchor" ||
                        "first-marker" ||
                        "dragging"
                    )
                ) {
                    notcomplete = true;
                }
            }
            if (notcomplete) {
                target = null;
            } else {
                target = target.parentNode;
            }
        }
        if (target.classList.contains("draggable")) {
            // console.log("dragable");

            this.selectedElement = target;
            //console.log("selected path", this.selectedElement);

            var transforms = this.selectedElement.transform.baseVal;
            //console.log("transforms", transforms);

            if (
                transforms.length === 0 ||
                transforms.getItem(0).type !==
                SVGTransform.SVG_TRANSFORM_TRANSLATE
            ) {
                // Create an transform that translates by (0, 0)
                var translate = svgCanvas.createSVGTransform();
                translate.setTranslate(0, 0);
                // Add the translation to the front of the transforms list
                this.selectedElement.transform.baseVal.insertItemBefore(
                    translate,
                    0
                );
            }

            transform = transforms.getItem(0);
            this.offset.x -= transform.matrix.e;
            this.offset.y -= transform.matrix.f;
        }
    }
    MouseMove() {
        //drag
        if (!stop) {
            //console.log("in start drag");
            // console.log(this.offset.x, this.offset.y);
            //console.log(cursor.x, cursor.y);
            transform.setTranslate(
                cursor.x - this.offset.x,
                cursor.y - this.offset.y
            );
        }
    }
}

class Curve {
    constructor() {
        this.element = document.getElementById("curve-tool");
        this.draggingAreaToMove = null;
        this.circleToMove = null;
        this.groupToMove = null;
        this.indexToMove = 0;
        this.pathToRedraw = null;
        this.pointsCounter = 0;
        this.firstBezierPoint = {
            x: 0,
            y: 0
        };
        this.midpoint = {
            x: 0,
            y: 0
        };
    }

    MouseDown(evt, layer) {
        // console.log("in mouse doen in curve");

        if (evt.target.classList[0] === "dragging") {
            //console.log("in dragging ");
            click = false;
            // console.log("in dragging  removed click", click);
            this.draggingAreaToMove = evt.target;
            this.circleToMove = this.draggingAreaToMove.previousElementSibling;

            this.groupToMove = evt.target.parentNode;
            let child = this.groupToMove.childNodes;
            this.indexToMove = 3;
            for (let i = 0; i < this.groupToMove.childNodes.length; i++) {
                if (this.circleToMove === child[i]) {
                    //get the index of the path to move
                    this.indexToMove = i - 1;
                    //console.log("index to move ", this.indexToMove);
                }
            }

            if (this.groupToMove.getElementsByClassName("first-marker")[0]) {
                //console.log("path t redraw");
                this.pathToRedraw = child[this.indexToMove];
            }
            moveCp = true;
        } else {
            click = true;
            //console.log("inelse so made true", click);
        }
    }
    MouseUp(evt, layer) {
        stop = true;
        console.log("in mouseup", click);

        this.circleToMove.style.fill = "none";

        //click = false;
        moveCp = false;
        //console.log("after making false ", click);
    }
    MouseMove(evt, layer) {
        if (moveCp) {
            //console.log("move Point", this.draggingAreaToMove);

            this.draggingAreaToMove.setAttribute("cx", cursor.x);
            this.draggingAreaToMove.setAttribute("cy", cursor.y);
            //console.log("move Point", this.draggingAreaToMove);
            this.circleToMove.setAttribute("cx", cursor.x);
            this.circleToMove.setAttribute("cy", cursor.y);
            //console.log("move Point", this.circleToMove);
            this.circleToMove.style.fill = "#49c";

            this.redrawPath(
                this.pathToRedraw,
                cursor,
                this.circleToMove.getAttribute("class")
            );
        }
    }

    MouseClick(evt, layer) {
        if (click) {
            click = false;

            switch (this.pointsCounter) {
                case 0:
                    // Create new group of points
                    if (document.getElementById("currentGroup")) {
                        document
                            .getElementById("currentGroup")
                            .removeAttribute("id");
                    }
                    let myGroup = document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "g"
                    );

                    myGroup.setAttribute("id", "currentGroup");
                    myGroup.setAttribute("class", "draggable");
                    //console.log("layer", layer);
                    layer.appendChild(myGroup);
                    // Draw first point and add it to the current group
                    this.drawPoint(cursor.x, cursor.y, "first-anchor");
                    prev.x = cursor.x;
                    prev.y = cursor.y;
                    this.firstBezierPoint.x = cursor.x;
                    this.firstBezierPoint.y = cursor.y;
                    this.pointsCounter++;
                    break;
                case 1:
                    // Draw second point
                    this.drawPoint(cursor.x, cursor.y, "second-anchor");

                    this.midpoint.x = (cursor.x + prev.x) / 2;
                    this.midpoint.y = (cursor.y + prev.y) / 2;
                    //draw control point

                    //draw path
                    this.drawPathQuadratic(
                        prev.x,
                        prev.y,
                        this.midpoint.x,
                        this.midpoint.y,
                        cursor.x,
                        cursor.y,
                        "quadratic-path"
                    );
                    this.drawPoint(
                        (cursor.x + prev.x) / 2,
                        (cursor.y + prev.y) / 2,
                        "first-marker"
                    );
                    //draw draggaalbe control point
                    this.drawPoint(
                        (cursor.x + prev.x) / 2,
                        (cursor.y + prev.y) / 2,
                        "dragging"
                    );

                    prev.x = cursor.x;
                    prev.y = cursor.y;
                    //check if the endpoint is near to 1st point
                    if (
                        Math.abs(cursor.x - this.firstBezierPoint.x) < 5 &&
                        Math.abs(cursor.y - this.firstBezierPoint.y) < 5
                    ) {
                        let lencircle = document
                            .getElementById("currentGroup")
                            .getElementsByTagName("circle").length;
                        //console.log(lencircle);
                        for (let i = 0; i < lencircle; i++) {
                            //remove all dots to form group
                            document
                                .getElementById("currentGroup")
                                .removeChild(
                                    document
                                    .getElementById("currentGroup")
                                    .getElementsByTagName("circle")[0]
                                );
                        }
                        let myPath = document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "path"
                        );
                        let g = document.getElementById("currentGroup");
                        let data =
                            "M" +
                            this.firstBezierPoint.x +
                            " " +
                            this.firstBezierPoint.y +
                            " " +
                            "L " +
                            cursor.x +
                            " " +
                            cursor.y +
                            " ";

                        myPath.setAttribute("d", data);
                        myPath.setAttribute("fill", defaultFill);
                        myPath.setAttribute("class", "linear-path");
                        g.appendChild(myPath);

                        //set to draw a new path
                        this.pointsCounter = 0;
                    }

                    break;
            }
        }
    }

    drawPoint(x, y, classToSet) {
        let myCircle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        let g = document.getElementById("currentGroup");
        myCircle.setAttribute("cx", x);
        myCircle.setAttribute("cy", y);
        myCircle.setAttribute("r", this.strokeWidth);
        myCircle.setAttribute("class", classToSet);

        g.appendChild(myCircle);
    }
    drawPathQuadratic(firstX, firstY, cpX, cpY, lastX, lastY, classToSet) {
        let segments = [];
        let seg = "M" + firstX + "," + firstY;

        seg = seg + " Q" + " " + cpX + " " + cpY + " ";
        segments.push(seg);

        seg = lastX + "," + lastY;
        segments.push(seg);
        //console.log("in segments", segments);
        let data = segments.join(" ");
        //console.log("in data", data);
        let myPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );
        let g = document.getElementById("currentGroup");
        myPath.setAttribute("d", data);
        myPath.setAttribute("class", classToSet);
        myPath.setAttribute("stroke", this.color);
        myPath.setAttribute("stroke-width", this.strokeWidth);
        myPath.setAttribute("fill", defaultFill);
        myPath.setAttribute("stroke-linecap", "round");
        g.appendChild(myPath);
    }
    redrawPath(pathToRedraw, newCoords, pointToChange) {
        let segments = pathToRedraw.getAttribute("d");

        let newX = newCoords.x;
        let newY = newCoords.y;

        let pointsArr = segments.split(" ");
        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                pointsArr[i] = newX.toString();
            }
            if (i === 3) {
                pointsArr[i] = newY.toString();
            }
        }
        // console.log("pointsArrafter new cp", pointsArr);
        let joinedsegment = pointsArr.join(" ");
        //console.log("joiined segment", joinedsegment);
        pathToRedraw.setAttribute("d", joinedsegment);
    }
}