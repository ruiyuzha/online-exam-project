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
const previousButton = document.getElementById('previous-btn');
const nextButton1 = document.getElementById('next-btn2');
const previousButton1 = document.getElementById('previous-btn2');
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
result_form.id = [];
result_form.res = [];
result_form.points = [];


readJson();

let lengthOfMultiple = exam["Multiple-Choice"].length;
let lengthOfFill = exam["Fill-in"].length;
let lengthOfExam = exam["Multiple-Choice"].length+exam["Fill-in"].length;
examInformation_element.innerHTML = 'This exam contains ' + lengthOfExam + ' questions and ' + 'lasts ' + startingMinutes + ' mins.';


startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    submit();
    
    currentQuestionIndex++;
    if(currentQuestionIndex == 1){
        previousButton.classList.remove('hide');
        initialize();
        displayQuestion1();
    }else if(currentQuestionIndex > 1 && currentQuestionIndex <= (lengthOfMultiple-1)){
        initialize();
        displayQuestion1();
    }else{
        questionContainer1Element.classList.add('hide');
        questionContainer2Element.classList.remove('hide');
        previousButton1.classList.remove('hide');
        initialize();
        displayQuestion2();
    }
})

previousButton.addEventListener('click',() =>{
    currentQuestionIndex--;
    initialize();
    displayQuestion1();
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

previousButton1.addEventListener('click',() =>{
    currentQuestionIndex--;
    if (currentQuestionIndex == 1){
        questionContainer2Element.classList.add('hide');
        questionContainer1Element.classList.remove('hide');
        displayQuestion1();
    }else{
        displayQuestion2();
    }   
})

submitButton.addEventListener('click', ()=>{
    submit();
    clearInterval(interval);
    resultButton.classList.remove('hide');
});

resultButton.addEventListener('click',() =>{
    questionContainer1Element.classList.add('hide');
    questionContainer2Element.classList.add('hide');
    header_element.classList.add('hide');
    displayResult(result_form);

});

/**
 * Initialize the input text area
 */
function initialize(){
    document.getElementById("answer").value = "";
    document.getElementById("answer2").value = "";
}

/**
 * Define the actions when the start button is pressed:
 * displays the 1st question and the timer starts
 */
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

/**
 * Define the form of the multiple choice question
 */
function displayQuestion1(){
    questionNumber_element.innerHTML = "Question " + exam["Multiple-Choice"][currentQuestionIndex].Num + ": ";
    question_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Que;
    choice1_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[0]["text"];
    choice2_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[1]["text"];
    choice3_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[2]["text"];
    choice4_element.innerText = exam["Multiple-Choice"][currentQuestionIndex].Choice[3]["text"];
}

/**
 * Define the form of fill in question
 */
function displayQuestion2(){
    let lengthOfMultiple = exam["Multiple-Choice"].length;
    questionNumber2_element.innerHTML = "Question " + exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Num + ": ";
    question2_element.innerText = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Que;
}

/**
 * Define the webpage that shows test results
 * (contains the correctness of each equation, points of each equation and total points)
 * @param {object} result_form 
 */
function displayResult(result_form){   
    resultContainerElement.classList.remove('hide');
    
    let totoalpoints=0;
    let test_res={};
    test_res.id=[];
    test_res.res=[];
    test_res.points=[];

    //Delete the duplicate terms in test results
    //(Due to the existence of previous button, some test results will to stored in multiple times. 
    //Thus, we only need to keep the last submission of each question)
    for (let i = 0; i < result_form["id"].length; i++) {
        if ( test_res["id"].indexOf(result_form["id"][i]) === -1) {
            test_res["id"] .push(result_form["id"][i]);
            test_res["res"] .push(result_form["res"][i]);
            test_res["points"] .push(result_form["points"][i]);
        }else{
            test_res["id"][i-1]=result_form["id"][i];
            test_res["res"][i-1]=result_form["res"][i];
            test_res["points"][i-1]=result_form["points"][i];
        }
    }
    console.log(test_res);
    
    for (let i=0;i<test_res["res"].length;i++){
        //result_element.innerText="Question"+(i+1)+": "+result_form["res"][i];
        totoalpoints+=test_res["points"][i];
    }
    document.getElementById("q1").innerText = "Question1: "+test_res["res"][0];
    document.getElementById("q2").innerText = "Question2: "+test_res["res"][1];
    document.getElementById("q3").innerText = "Question3: "+test_res["res"][2];
    document.getElementById("q4").innerText = "Question4: "+test_res["res"][3];
    document.getElementById("q5").innerText = "Question5: "+test_res["res"][4];
    console.log(totoalpoints);
    result_element.innerText="Congratulations! You got "+totoalpoints+" points.";
}

/**
 * Define the countdown timer:
 * Display the number in minute and second parts in inverse order;
 * When the time is out the function submit() is called automatically
 */
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

/**
 * Send a GET HTTP request that contains "que_ID", "your_ans", "correct_ans" and "points" to the backend
 * and judgement results of each question is sent back to the frontend
 */
async function submit(){
    console.log("In submit!");

    try{
        let correct_ans;
        let your_ans;
        let que_id;
        let currentPoints;

        if(currentQuestionIndex <= (exam["Multiple-Choice"].length-1)){
            correct_ans = exam["Multiple-Choice"][currentQuestionIndex].CorrectAns;
            currentPoints = exam["Multiple-Choice"][currentQuestionIndex].Points;
            que_id = exam["Multiple-Choice"][currentQuestionIndex].Num;
            your_ans = document.getElementById("answer").value;
            
        } else{
            correct_ans = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].CorrectAns;
            currentPoints = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Points;
            que_id = exam["Fill-in"][currentQuestionIndex-lengthOfMultiple].Num;
            your_ans = document.getElementById("answer2").value;
        }

        let request = `http://127.0.0.1:5000/?que_id=${que_id}&your_ans=${your_ans}&correct_ans=${correct_ans}&points=${currentPoints}`;
        console.log("request: ", request);

        // Send an HTTP GET request to the backend
        const data = await axios.get(request);

        console.log("data.data: ", JSON.stringify(data.data, null, 2));

        if (data.data.result){
            result_form.id.push(que_id);
            result_form.res.push("Correct");
            result_form.points.push(currentPoints);
        }else{
            result_form.id.push(que_id);
            result_form.res.push("Wrong");
            result_form.points.push(0);  
        }
        
    } catch (error) {
        console.log("error: ", error);
    }

}

/**
 * Send a Get HTTP request to the backend and send the object of exam paper back to the frontend
 */
async function readJson(){
    console.log("Load json file!");
    let request = `http://127.0.0.1:5000/?quiz_ID=${1}`;
    console.log("request: ", request);
    const data = await axios.get(request);

    quiz = JSON.stringify(data.data, null, 2);
    console.log(quiz);
    //return quiz
    //Bug: Actually, this function has a return value to define the variable 'exam'. But, this function loadJson spends
    //too much time and causes some problems to read exam information in homepage (needs future improvments)
}