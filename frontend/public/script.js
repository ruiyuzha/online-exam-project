//const fs = require('fs');
//let data = JSON.parse(fs.readFileSync('public/exam.json').toString());
//const data = require('./exam.json');
//let exam = data[0];

let exam = [
    {
      Num: 1,
      Que: "2+2=",
      CorrectAns: "4",
      Points: 2
    },
    {
      Num: 2,
      Que: "2*3=",
      CorrectAns: "6",
      Points: 2
    },
    {
      Num: 3,
      Que: "2-6=",
      CorrectAns: "-4",
      Points: 2
    }
  ]

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const questionContainerElement = document.getElementById('question-container');
const question_element = document.getElementById('question');
const countdown_element = document.getElementById('countdown');

let startingMinutes = 3;
let time = startingMinutes * 60;
let interval;
let currentQuestionIndex;
let lengthOfExam = exam.length;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    submit();
    //await delay(1000);
    
    currentQuestionIndex++;
    question_element.innerText = "Que" + exam[currentQuestionIndex].Num + ": " + exam[currentQuestionIndex].Que;   

    if (currentQuestionIndex == (lengthOfExam-1)){
        nextButton.classList.add('hide');
        submitButton.classList.remove('hide');
    }
       
})

function startGame() {
    console.log('Start');
    startButton.classList.add('hide');
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    nextButton.classList.remove('hide');
    console.log(exam.length);
    question_element.innerText = "Que" + exam[currentQuestionIndex].Num + ": " + exam[currentQuestionIndex].Que;
       
    interval = setInterval(updateCountdown, 1000); 
}

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

submitButton.addEventListener('click', submit);

async function submit(){
    console.log("In submit!");

    let result_element = document.getElementById("result");
    //result_element.innerHTML = "Please wait...";

    try{
        let correct_ans = exam[currentQuestionIndex].CorrectAns;
        let your_ans = document.getElementById("answer").value;

        let request = `http://127.0.0.1:5000/?your_ans=${your_ans}&correct_ans=${correct_ans}`;
        console.log("request: ", request);

        // Send an HTTP GET request to the backend
        const data = await axios.get(request);

        console.log("data.data: ", JSON.stringify(data.data, null, 2));

        // Display the random value
        // if (data.data.result){
        //     result_element.innerHTML = "Correct!";
        // }else{
        //     result_element.innerHTML = "Wrong!";
        // }
        
    } catch (error) {
        console.log("error: ", error);
    }

}

const delay = function (t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  };
