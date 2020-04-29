let exam = {
    "Multiple-Choice":[
      {
        "Num": 1,
        "Que": "Inside which HTML element do we put the JavaScript?",
        "Choice":[
          {"text": "<script>","correctness": true},
          {"text": "<html>","correctness": false},
          {"text": "<scripting>","correctness":false},
          {"text": "None of above","correctness":false}
        ],
        "CorrectAns":"1",
        "Points": 2
      },
      {
        "Num": 2,
        "Que": "Choose the client-side JavaScript object:",
        "Choice":[
          {"text": "Database","correctness": false},
          {"text": "Cursor","correctness": false},
          {"text": "Client","correctness":false},
          {"text": "FileUpLoad","correctness":true}
        ],
        "CorrectAns":"4",
        "Points": 2
      }
    ],
    "Fill-in":[{
      "Num": 3,
      "Que": "It is possible to nest functions in JavaScript. (True/False)",
      "CorrectAns": "True",
      "Points": 4
    },
    {
      "Num": 4,
      "Que": "Math. round(-20.5)= ?",
      "CorrectAns": "-21",
      "Points": 4
    },
    {
      "Num": 5,
      "Que": "If x=103 & y=9 then x%=y , what is the value of x after executing x%=y?",
      "CorrectAns": "4",
      "Points": 4
    }
  
    ]
}

const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const nextButton1 = document.getElementById('next-btn2');
const submitButton = document.getElementById('submit-btn');
const resultButton = document.getElementById('result-btn');
const homepageContainer_element = document.getElementById('home-container');
const examTitle_element = document.getElementById('exam-title');
const examInformation_element = document.getElementById('exam-information');
const header_element = document.getElementById('header');

const countdownContainerElement = document.getElementById('countdown-container');
const countdown_element = document.getElementById('countdown');

const questionNumber_element = document.getElementById('question-number');
const question_element = document.getElementById('question');

const questionContainer1Element = document.getElementById('question-container1');
const choice1_element = document.getElementById('choice1');
const choice2_element = document.getElementById('choice2');
const choice3_element = document.getElementById('choice3');
const choice4_element = document.getElementById('choice4');

const questionContainer2Element = document.getElementById('question-container2');
const questionNumber2_element = document.getElementById('question-number2');
const question2_element = document.getElementById('question2');

const resultContainerElement = document.getElementById('result-container');
const result_element = document.getElementById("result");

let startingMinutes = 3;
let time = startingMinutes * 60;
let interval;
let currentQuestionIndex;

let result_form = {};
result_form.res = [];
result_form.points = [];


readJson();
//console.log(exam);

let lengthOfMultiple = exam["Multiple-Choice"].length;
let lengthOfFill = exam["Fill-in"].length;
let lengthOfExam = exam["Multiple-Choice"].length+exam["Fill-in"].length;
examInformation_element.innerHTML = 'This exam contains ' + lengthOfExam + ' questions and ' + 'lasts ' + startingMinutes + ' mins.';


startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    submit();
    
    currentQuestionIndex++;
    if(currentQuestionIndex <= (lengthOfMultiple-1)){
        initialize();
        displayQuestion1();
    }else{
        questionContainer1Element.classList.add('hide');
        questionContainer2Element.classList.remove('hide');
        initialize();
        displayQuestion2();
    }
})

nextButton1.addEventListener('click', () => {
    submit();
    
    currentQuestionIndex++;
    initialize();
    displayQuestion2();
    
    if(currentQuestionIndex == (lengthOfExam-1)){
        nextButton1.classList.add('hide');
        submitButton.classList.remove('hide');
    }      
})

submitButton.addEventListener('click', ()=>{
    submit();
    clearInterval(interval);
    resultButton.classList.remove('hide');
});

resultButton.addEventListener('click',() =>{
    questionContainer2Element.classList.add('hide');
    header_element.classList.add('hide');
    displayResult(result_form);

});

function initialize(){
    document.getElementById("answer").value = "";
    document.getElementById("answer2").value = "";
}

function startGame() {
    console.log('Start');
    homepageContainer_element.classList.add('hide');
    startButton.classList.add('hide');
    header_element.classList.add('parent');
    currentQuestionIndex = 0;
    countdownContainerElement.classList.remove('hide');
    questionContainer1Element.classList.remove('hide');
    nextButton.classList.remove('hide');

    displayQuestion1();
       
    interval = setInterval(updateCountdown, 1000); 
}

function displayQuestion1(){
    questionNumber_element.innerHTML = "Question " + exam["Multiple-Choice"][currentQuestionIndex].Num + ": ";
    question_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Que;
    choice1_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[0]["text"];
    choice2_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[1]["text"];
    choice3_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[2]["text"];
    choice4_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[3]["text"];
}

function displayQuestion2(){
    let lengthOfMultiple = exam["Multiple-Choice"].length;
    questionNumber2_element.innerHTML = "Question " + exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Num + ": ";
    question2_element.innerText = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Que;
}

function displayResult(result_form){   
    resultContainerElement.classList.remove('hide');
    
    let totoalpoints=0;
    for (let i=0;i<result_form["res"].length;i++){
        //result_element.innerText="Question"+(i+1)+": "+result_form["res"][i];
        totoalpoints+=result_form["points"][i];
    }
    document.getElementById("q1").innerText = "Question1: "+result_form["res"][0];
    document.getElementById("q2").innerText = "Question2: "+result_form["res"][1];
    document.getElementById("q3").innerText = "Question3: "+result_form["res"][2];
    document.getElementById("q4").innerText = "Question4: "+result_form["res"][3];
    document.getElementById("q5").innerText = "Question5: "+result_form["res"][4];
    console.log(totoalpoints);
    result_element.innerText="Congratulations! You got "+totoalpoints+" points.";
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

async function submit(){
    console.log("In submit!");

    try{
        let correct_ans;
        let your_ans;
        let currentPoints;
        let lengthOfMultiple = exam["Multiple-Choice"].length;
        if(currentQuestionIndex <= (exam["Multiple-Choice"].length-1)){
            correct_ans = exam["Multiple-Choice"][currentQuestionIndex].CorrectAns;
            currentPoints = exam["Multiple-Choice"][currentQuestionIndex].Points;
            your_ans = document.getElementById("answer").value;
            
        } else{
            correct_ans = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].CorrectAns;
            currentPoints = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Points;
            your_ans = document.getElementById("answer2").value;
        }

        let request = `http://127.0.0.1:5000/?your_ans=${your_ans}&correct_ans=${correct_ans}`;
        console.log("request: ", request);

        // Send an HTTP GET request to the backend
        const data = await axios.get(request);

        console.log("data.data: ", JSON.stringify(data.data, null, 2));

        if (data.data.result){
            result_form.res.push("Correct");
            result_form.points.push(currentPoints);
        }else{
            result_form.res.push("Wrong");
            result_form.points.push(0);
        }
        console.log(result_form);
        
    } catch (error) {
        console.log("error: ", error);
    }

}

async function readJson(){
    console.log("Load json file!");
    let request = `http://127.0.0.1:5000/?quiz_ID=${1}`;
    console.log("request: ", request);
    const data = await axios.get(request);

    quiz = JSON.stringify(data.data, null, 2);
    console.log(quiz);
}