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
    question: "Who runs %conditional% and do you have a picture of them?",
    form: [{
      type: "text",
      label: "The business is ran by..",
      placeholder: "Business owner's name.."
    }]
  },
  {
    conditional: [0, 0],
    question: "Now tell us more about %conditional%...",
    form: [{
      type: "text",
      label: "What sector is your business in?",
      placeholder: "Type sector or select from below",
      options: ["Services", "Food and Drink", "Homeware", "Arts and Crafts"]
    }]
  },
  {
    conditional: [0, 0],
    question: "Now tell us more about %conditional%...",
    form: [
      {
        type: "textarea",
        label: "What does the business do?",
        placeholder: "The business is a..",
      },
      {
        type: "textarea",
        label: "Why do you do it?",
        placeholder: "The business was set up because...",
      },
      {
        type: "textarea",
        label: "What makes the business unique?",
        placeholder: "We are unique because...",
      }
    ]
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
          primaryColor: "#1B4965",
          secondaryColor: "#62B6CB",
          neutralColor: "#D3EDFF",
        }}
        questions={questions}
        onSubmit={(e) => handleQuestionnaireSubmit(e)}
      />
    </div>
  );
}

export default App;
