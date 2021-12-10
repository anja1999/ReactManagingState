import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function getRandomNumber(){
  return Math.floor(Math.random() * 100);
}

function getRandomNumbersAndSum(){
  let v1 = getRandomNumber();
  let v2 = getRandomNumber();  
  let v3 = getRandomNumber();
  let sum = Math.floor(Math.random() * 3) + v1 + v2 + v3;  
  return [v1, v2, v3, sum];
  
}

const firstValues = getRandomNumbersAndSum();

function checkAnswer(currentState, isTrue){
  let resultIsCorrect = currentState.proposedAnswer === currentState.value1 + currentState.value2 + currentState.value3;
  if( (resultIsCorrect & isTrue)  | (!resultIsCorrect & !isTrue))
    return 1 ;
  return 0;
}

class App extends Component {
  
  state={
    numQuestions : 0,
    numCorrect : 0,
    value1 : firstValues[0],
    value2 : firstValues[1],
	value3 : firstValues[2],
	proposedAnswer : firstValues[3]
  }
  
  calculateResultAndSetNext = (isTrue) => {
    let nextValues = getRandomNumbersAndSum();
    this.setState((currentState)=>({
      numQuestions : currentState.numQuestions + 1,
      numCorrect : currentState.numCorrect  + checkAnswer(currentState, isTrue),
      value1 : nextValues[0],
      value2 : nextValues[1],
      value3 : nextValues[2],
      proposedAnswer:  nextValues[3]
    }))
  } 
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <div className="equation">
            <p className="text">{`${this.state.value1} + ${this.state.value2} + ${this.state.value3} = ${this.state.proposedAnswer}`}</p>
          </div>
          <button onClick = {() => this.calculateResultAndSetNext(true)}>True</button>
          <button onClick = {() => this.calculateResultAndSetNext(false)}>False</button>
          <p className="text">
            Your Score: {this.state.numCorrect}/{this.state.numQuestions}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
