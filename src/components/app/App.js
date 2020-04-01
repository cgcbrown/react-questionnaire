import React from 'react';
import Questionnaire from '../questionnaire/questionnaire';
import './App.css';

const questions = [
  {
    question: "How are you?",
    form: [{
      type: "text",
      label: "Let me know how you are",
      placeholder: "How I am"
    },
    {
      type: "text",
      label: "On a scale of one to ten",
      placeholder: "twenty."
    }
  ]
  },
  {
    question: "No really?",
    form: [{
      type: "text",
      label: "How you are really..",
      placeholder: "I am actually.."
    }]
  },
  {
    question: "Hit me?",
    form: [{
      type: "text",
      label: "Should I hit?",
      placeholder: "No"
    }]
  }
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-title">Register your business</h3>
      </header>
      <Questionnaire questions={questions} />
    </div>
  );
}

export default App;
