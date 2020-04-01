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
    conditional: [0, 0],
    question: "Who runs %conditional% and what is their name?",
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
      <Questionnaire
        color= {{
          primaryColor: "#E2B8AE",
          secondaryColor: "#FBDBB8",
          neutralColor: "#FFFBD3",
        }}
        questions={questions}
        onSubmit={(e) => handleQuestionnaireSubmit(e)}
      />
    </div>
  );
}

export default App;
