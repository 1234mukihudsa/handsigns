Prediction_1 = "";
Prediction_2 ="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:120
});


camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_Snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5RvcYbI5M/model.json',modelLoaded);
function modelLoaded(){
    console.log('model Loaded');

}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="First prediction is -" + Prediction_1;
    speak_data_2=" and Second prediction is -" + Prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResult);
    
}
function gotResult(error,results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
     Prediction_1 = results[0].label;
     Prediction_2 = results[1].label;
        speak();
        if( results[0].label == "peace"){
            document.getElementById("update_emoji").innerHTML ="✌️";
        }
        if( results[0].label == "thanks"){
            document.getElementById("update_emoji").innerHTML ="🙏";
        }
        if( results[0].label == "three"){
            document.getElementById("update_emoji").innerHTML ="👌";
        }
        if( results[1].label == "three"){
            document.getElementById("update_emoji2").innerHTML ="👌";
        }
        if( results[1].label == "thanks"){
            document.getElementById("update_emoji2").innerHTML ="🙏";
        }
        if( results[1].label == "peace"){
            document.getElementById("update_emoji2").innerHTML ="✌️";
        }
    }
}
