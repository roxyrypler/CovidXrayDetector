
console.log('ml5 version:', ml5.version);
const classifier = ml5.imageClassifier('./models/Covid/model.json', modelLoaded);

let OpenImgUpload = document.getElementById("OpenImgUpload");
let imgupload = document.getElementById("imgupload");
let testImage = document.getElementById("testImage");
let predictionText = document.getElementById("prediction");

OpenImgUpload.addEventListener("click", () => {
    imgupload.click();
});

imgupload.addEventListener("change", (data) => {
    console.log(data, imgupload);
    var input = imgupload;
    var url = imgupload.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) 
     {
        var reader = new FileReader();

        reader.onload = function (e) {
            testImage.setAttribute('src', e.target.result);
        }
       reader.readAsDataURL(input.files[0]);
       predict();
    }else {
        console.log("no!");
    }
})


// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  //predict();
}

function predict() {
    classifier.classify(testImage, (err, results) => {
        console.log(results[0].label + " sertenty: " + results[0].confidence * 100 + "%");
        predictionText.innerHTML = "Prediction: " + results[0].label + ", with sertenty of: " + results[0].confidence * 100 + "%";
    });
}