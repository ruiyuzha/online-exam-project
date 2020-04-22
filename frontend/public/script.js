//const fs = require('fs');
//let data = JSON.parse(fs.readFileSync('public/exam.json').toString());
//const data = require('./exam.json');
//let exam = data[0];
/*let loader = document.getElementById("loader");
loader.style.display = "none";

const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('Start');
    startButton.classList.add('hide');
    questionContainerElement.remove('hide');
}*/

let exam = {
    "Num": 1,
    "Que": "2+2=",
    "CorrectAns": "4",
    "Points": 2
}

const que = document.getElementById("Question");
que.innerHTML = "Question " + exam.Num + ": " + exam.Que;

document.getElementById("submit").onclick = function (){
    submit();
};

async function submit(){
    console.log("In submit!");

    let result_element = document.getElementById("result");
    result_element.innerHTML = "Please wait...";

    try{
        let correct_ans = exam.CorrectAns;
        let your_ans = document.getElementById("answer").value;

        let request = `http://127.0.0.1:5000/?your_ans=${your_ans}&correct_ans=${correct_ans}`;
        console.log("request: ", request);

        // Send an HTTP GET request to the backend
        const data = await axios.get(request);

        console.log("data.data: ", JSON.stringify(data.data, null, 2));

        // Display the random value
        if (data.data.result){
            result_element.innerHTML = "Correct!";
        }else{
            result_element.innerHTML = "Wrong!";
        }
        
    } catch (error) {
        console.log("error: ", error);
    }

}

//Countdown
const startingMinutes = 3;
let time = startingMinutes * 60;

const countdown_element = document.getElementById('countdown');

let interval = setInterval(updateCountdown, 1000);

function updateCountdown(){
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    
    seconds = seconds < 10 ? '0' +seconds : seconds;

    countdown_element.innerHTML = `${minutes}:${seconds}`;
    time--;

    if (seconds=='00' && minutes=='00'){
        clearInterval(interval);
        submit();
    }
}