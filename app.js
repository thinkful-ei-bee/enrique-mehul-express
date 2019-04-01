'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
	  console.log('Express server is listening on port 8000!');

  res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/sum', (req, res) => {
  //1. get values from the request
  const value1 = req.query.a;
  const value2 = req.query.b;

  //2. validate the values
  if(!value1 || isNaN(value1)) {
    //3. name was not provided
    return res.status(400).send('Please provide a valid number');
  }

  if(!value2 || isNaN(value2)) {
    //3. race was not provided
    return res.status(400).send('Please provide a valid number');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = parseInt(value1) + parseInt(value2);

  //6. send the response 
  res.send(''+ greeting +'');
});


app.get('/cipher', (req, res) => {
  //1. get values from the request
  const text = req.query.text;
  let shift = req.query.shift;
  if(!text){
    return res.status(400).send('Please provide text to cipher');
  }
  if(!shift || isNaN(shift)) {
    //3. race was not provided
    return res.status(400).send('Please provide a valid number');
  }
  shift = parseInt(shift);
  let cipher_text='';
  for(let x = 0; x<text.length; x++){
    let curr_char = text.charCodeAt(x);
    //we know letter is lower case
    if(96<curr_char && curr_char <123 && + curr_char+shift> 122){
      let diff = curr_char+shift - 122;
      cipher_text += String.fromCharCode(96+diff);
    }
    //if letter is uppercase 
    else if(64<curr_char && curr_char <91 && + curr_char+shift> 90){
      let diff = curr_char+shift - 90;
      cipher_text += String.fromCharCode(64+diff);
    }
    else{
      cipher_text += String.fromCharCode(text.charCodeAt(x)+shift); 
    }

  }
  //6. send the response 
  res.send(cipher_text);
});



app.get('/lotto', (req, res) => {
  //1. get values from the request
  let num_arr = req.query.num;
 
  if(!num_arr) {
    return res
      .status(400)
      .send('numbers is required');
  }

  if(!Array.isArray(num_arr)){
    return res.status(400).send('Must return array');
  }

  if(num_arr.length!==6){
    return res.status(400).send('Did not pick 6 numbers');
  }
  
  let numbers = [];
  for (let x =0; x<num_arr.length;x++){
    if(isNaN(num_arr[x]) || parseInt(num_arr[x]) > 20 || parseInt(num_arr[x] <1))
    {
      return res.status(400).send('one lotto number is not a number');      
    }
    numbers.push(parseInt(num_arr[x]));
  }

  num_arr = numbers;

  let lotto = [];
  for (let x =0; x<num_arr.length;x++){
    lotto.push(Math.floor(Math.random()*20)+1);
  }
  let count = 0;
  for (let x =0; x<lotto.length;x++){
    let temp = lotto[x];
    if(num_arr.indexOf(temp)!== -1)
    { console.log('here');
      count++;
    }
  }
  
  if(count <4){
    res.send(count + 'Sorry you lose');
  }
  else if(count ===4){
    res.send('congrats you win a free ticket');
  }
  else if(count === 5){
    res.send('you win $100');
  }
  else if(count === 6){
    res.send('you could have won the mega millions');
  }
  
});