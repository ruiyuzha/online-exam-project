"use strict";

const express = require("express");
const fs = require('fs');
const app = express();
// Load a json file
const exam = fs.readFileSync("/Users/apple/Desktop/online-exam-project/frontend/public/db.json")
let obj = {};
obj.table = [];

// We need cors middleware to bypass CORS security in browsers.
const cors = require("cors");

app.use(express.static("static"));
app.use(cors());

let port = 5000;

/**
 * Judge the correctness of your answer
 * @param {String} your_ans
 * @param {String} correct_ans
 */

function isCorrect(your_ans, correct_ans) {
    return (your_ans == correct_ans)
}

/**
 * A promise that resolves after t ms.
 * @param {Number} t
 */
const delay = function (t) {
    return new Promise((resolve) => setTimeout(resolve, t));
  };

/**
 * The default path
 */
app.get("/", async function (req, res) {
  if (req.query && Object.keys(req.query).length > 0) {
    if (req.query.quiz_ID == "1"){
      console.log('success');
      res.send(exam);
    }else{
      console.log("I got a query!");
      handleGet(res, res, req.query);
    }
  }
});


app.listen(port, (err) => {
  console.log(`Listening on port: ${port}`);
});
//-----------------------------------------------------------------------------



/**
 * Handles a Get request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} query
 */
async function handleGet(req, res, query) {
  let error = "NO_ERROR";
  let que_id;
  let your_ans;
  let correct_ans;
  let result;
  let points;

  console.log("query: ", JSON.stringify(query));
  // If there was a query (a query string was sent)
  if (
    query !== undefined &&
    query.your_ans !== undefined &&
    query.correct_ans !== undefined) {
    
    que_id = query.que_id;
    your_ans = query.your_ans;
    correct_ans = query.correct_ans;
    
    result = isCorrect(your_ans, correct_ans);
    if (result){
        console.log("Correct");
        points = query.points;
    }
    else{
        console.log("Wrong");
        points = "0";
    }
  } else {
    error = "ERROR: min_value or max_value not provided";
  }

  // Generate the output
  let output = {
    que_id: que_id,
    result: result,
    your_ans: your_ans,
    correct_ans: correct_ans,
    points: points,
    error: error,
  };

  // Convert output to JSON
  obj.table.push(output);
  let outputString = JSON.stringify(output, null, 2);
  console.log("outputString: ", outputString);

  // Save the results to a json file
  fs.writeFile('myresult.json', JSON.stringify(obj, null, 2), (err) => {
    if (err) throw err
    console.log('The file has been saved!')
  })

  // Let's generate some artificial delay!
  await delay(500);

  // Send it back to the frontend.
  res.send(outputString);
}
