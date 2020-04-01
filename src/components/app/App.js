import React from 'react';
import Questionnaire from '../questionnaire/questionnaire';
import './App.css';

const questions = [
  {
    question: "What is the name of your business and where is it based?",
    form: [{
      type: "text",
      label: "My business is called...",
      placeholder: "Your business name"
    },
    {
      type: "text",
      label: "And it is based in...",
      placeholder: "Type here or select an option below.",
      options: ["Southend-on-Sea", "Bristol"]
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

  const handleQuestionnaireSubmit = (e) => {
    console.log(e);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-title">Register your business</h3>
      </header>
      <Questionnaire questions={questions} onSubmit={(e) => handleQuestionnaireSubmit(e)} />
    </div>
  );
}

export default App;
