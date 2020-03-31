import React, { useState, useEffect } from 'react';
import './App.css';

function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState();

  const listener = e => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
}

function Form1() {
  return (
    <div>Im form 1</div>
  )
}

function Form2() {
  return (
    <div>Im form 2</div>
  )
}

function Form3() {
  return (
    <div>Im form 3</div>
  )
}

const questions = [
  {
    question: "How are you?",
    form: <Form1 />
  },
  {
    question: "No really?",
    form: <Form2 />
  },
  {
    question: "Hit me?",
    form: <Form3 />
  }
]

function Questionnaire(props) {
  const questions = props.questions;
  const [ questionTop, setQuestionTop ] = useState("64px");
  const [ progress, setProgress ] = useState("");
  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  let scrollY = useScroll().scrollY;

  useEffect(() => {
    scrollTop(scrollY);
  }, [scrollY]);

  useEffect(() => {
    handleProgress(currentQuestion);
  }, [currentQuestion])

  const scrollTop = (scrollY) => {
    if (scrollY <= 64 && scrollY >= 0) {
      const scroll = 64 - scrollY;
      return setQuestionTop(String(scroll) + "px");
    }
  }

  const renderNavButtons = () => {
    if (currentQuestion === 0) {
      return (
        <div className="primary-button" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          <p>Get Started!</p>
        </div>
      )
    }
    return (
      <div className="nav row space-between">
        <div className="secondary-button" onClick={() => setCurrentQuestion(currentQuestion - 1)}>
          <p>Back</p>
        </div>
        <div className="primary-button" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          <p>Continue</p>
        </div>
      </div>
    )
  }

  const handleProgress = (currentQuestion) => {
    const totalQs = questions.length;
    const currentProgress = currentQuestion + 1;
    const percentage = String((currentProgress / (totalQs + 1)) * 100) + "%";
    return setProgress(percentage);
  }

  if (currentQuestion === questions.length) {
    return (
      <h2>Thank you!</h2>
    )
  }

  return (
    <div className="questionnaire">
      <div className="question-container align-center" style={{top: questionTop}}>
        <h2>{questions[currentQuestion].question}</h2>
        <div className="progress-bar" style={{width: progress}}></div>
      </div>
      <div className="answer-container align-center">
        <div className="container align-center">
          {questions[currentQuestion].form}
        </div>
      </div>
      <div className="nav-container align-center">
        <div className="container align-center">
          {renderNavButtons()}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="App-title">Support Local</h3>
      </header>
      <Questionnaire questions={questions} />
    </div>
  );
}

export default App;
