import React, { useEffect, useState } from 'react';
import './questionnaire.css';

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

function ProgressBar(props) {
  const { current, total } = props;
  const [ progress, setProgress ] = useState("");

  useEffect(() => {
    handleProgress();
  }, [current])

  const handleProgress = () => {
    const percentage = String(((current + 1) / (total + 1)) * 100) + "%";
    return setProgress(percentage);
  }

  return (
    <div className="progress-bar" style={{width: progress}}></div>
  )
}

function Questionnaire(props) {
  const [ questions, setQuestions ] = useState(props.questions)
  const [ questionTop, setQuestionTop ] = useState("64px");

  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  const [ currentAnswers, setCurrentAnswers ] = useState([]);

  let scrollY = useScroll().scrollY;

  useEffect(() => {
    scrollTop(scrollY);
  }, [scrollY]);

  const scrollTop = (scrollY) => {
    if (scrollY <= 64 && scrollY >= 0) {
      const scroll = 64 - scrollY;
      return setQuestionTop(String(scroll) + "px");
    }
  }

  const handleNext = () => {
    let newQuestions = [...questions];
    for (let i = 0; i < currentAnswers.length; i++) {
      newQuestions[currentQuestion].form[i].answer = currentAnswers[i];
    }
    setQuestions(newQuestions);
    console.log(newQuestions);
    setCurrentAnswers([]);
    setCurrentQuestion(currentQuestion + 1);
  }

  const handleBack = () => {
    const questionIndex = currentQuestion - 1;
    const previousAnswers = [];
    questions[questionIndex].form.forEach((input) => {
      previousAnswers.push(input.answer);
    })
    setCurrentAnswers(previousAnswers);
    setCurrentQuestion(questionIndex);
  }

  const handleAnswerInput = (key, value) => {
    let newAnswers = [...currentAnswers];
    newAnswers[key] = value;
    return setCurrentAnswers(newAnswers);
  }

  const renderNavButtons = () => {
    if (currentQuestion === 0) {
      return (
        <div
          className="primary-button"
          onClick={() => handleNext()}
        >
          <p>Get Started!</p>
        </div>
      )
    }
    return (
      <div className="nav row space-between">
        <div className="secondary-button" onClick={() => handleBack()}>
          <p>Back</p>
        </div>
        <div className="primary-button" onClick={() => handleNext()}>
          <p>Continue</p>
        </div>
      </div>
    )
  }

  const renderInput = (input, key) => {
    if (input.type === 'text') {
      return (
        <div className="input-container" key={key}>
          <label htmlFor={key} >
            {input.label}
          </label>
          <input
            id={key}
            type={'text'}
            placeholder={input.placeholder || ""}
            value={currentAnswers[key] || ""}
            className="text-input"
            onChange={(e) => handleAnswerInput(key, e.target.value)}
          />
        </div>
      )
    }
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
        <ProgressBar current={currentQuestion} total={questions.length} />
      </div>
      <div className="answer-container align-center">
        <form className="container align-center">
          {questions[currentQuestion].form.map((input, key) => {
            return renderInput(input, key)
          })}
        </form>
      </div>
      <div className="nav-container align-center">
        <div className="container align-center">
          {renderNavButtons()}
        </div>
      </div>
    </div>
  )
}

export default Questionnaire;