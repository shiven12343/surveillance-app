img="";
var status = "";
objects = [];
var Detector = "";
function preload(){
    var alarm="alarm.wav";
}


function setup(){
    canvas = createCanvas(380, 380)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();

}
function draw(){
    image(video, 0, 0, 380, 380)
    fill("#FF0000")
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        Detector.detect(video, gotResult);
        for(i =0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    if(objects.label != "person"){
        play(alarm);
    }
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = "true";
    Detector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    
}

function start(){
    Detector = ml5.objectDetector('cocossd',modelLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects"
}