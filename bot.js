var img = "";
var status4 = "";
var objectDetector = "";
var objects = [];

function preload() {
    img = loadImage("bottles.webp");
}

function setup() {
    var canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status4").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status4").innerHTML = "Status: Objects Detected";
            document.getElementById("detected4").innerHTML = "There are 5 big objects in this image out of which the cocossd Model detected " + objects.length + " object.";
            
            fill("#ff0000");
            var percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            console.log("Drawn");
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
    }
    objects = results;
}