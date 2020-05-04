# online-exam-project
This is the final project for EE599. The aim of this project is to create a website which allows users to take an online exam and submit their answers. In this project, I used NodeJS Express Library and fs module in the backend and Bootstrap and CSS in the frontend.

The frontend contains: 
 - a home page that shows some details of exam including the number of exam question and the duration of this exam
 - a web page that display each question and takes to inputs: `your-answer` and question information `que-ID`, `correct-answer`, `points` and sends them to the backend using HTTP GET request.
 - a countdown timer
 - a web page that shows your test results

The backend contains: 
 - a function to load db.json file(exam paper) and returns data to the frontend
 - a simple NodeJS server that processes the HTTP GET request, reads the parameters `your-ans` and `correct-ans` and decides whether your-ans is correct or not and returns the result back to the frontend.
 - a function to save your test result in a new json file
 
 

By default frontend listens on port 3000, and backend listens on port 5000.

# Install NodeJS

You can install NodeJs from [here](https://nodejs.org/en/download/).

# Running this package

To download and install:

```bash
git clone https://github.com/ruiyuzha/online-exam-project.git
npm install
```

## Running Backend:
```bash
cd backend
node app.js
```

You can test backend by installing and running [Postman](https://www.postman.com/downloads/):

<img alt="Backend" src="https://github.com/ruiyuzha/online-exam-project/blob/master/backend/backend-loadjson.png?raw=true" width="400">

<img alt="Backend" src="https://github.com/ruiyuzha/online-exam-project/blob/master/backend/backend-correctness.png?raw=true" width="400">


## Running Frontend:
```bash
cd frontend
node app.js
```

Then open your browser to http://localhost:3000:


## A demo video:

https://youtu.be/2JdqLB7rfUc


## Future Improvements

- Improvements on the current version: In the program, I define a variable `currentQuestionIndex` represents the question number: whenever you press the next button the `currentQuestionIndex` will increase 1 and whenever you press the previous button the `currentQuestionIndex` will decrease 1. This is not a good way. I should use the variable `que_ID` to locate these questions. 

- Add a login system allows multi-users: professors can be acted as an admin to upload exam paper and students can be acted as guest to answer these questions. In this way, the test results can be improved by saving these information of each user in different files.

- Add more functions to make this project more complete: 

  eg: send students answers to professor by email; send a notification to students before the exam starts

