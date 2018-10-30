let downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", event => {
    download();
    console.log("download clicked");

    function svgDataURL(svg) {
        console.log("in svg data url");
        var svgAsXML = new XMLSerializer().serializeToString(svg);
        //to remove fill white
        svgAsXML = svgAsXML.replace(/transparent/g, "");
        console.log(svgAsXML);
        return "data:image/svg+xml," + encodeURIComponent(svgAsXML);
    }

    function download() {
        // console.log("in download ");
        var dl = document.createElement("a");
        document.body.appendChild(dl); // This line makes it work in Firefox.
        //console.log("svg canvs is what", svgCanvas);
        dl.setAttribute("href", svgDataURL(svgCanvas));
        dl.setAttribute("download", "test.svg");
        // console.log("dl is ", dl);
        dl.click();
    }
});