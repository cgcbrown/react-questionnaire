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
  const { current, total, color } = props;
  const [ progress, setProgress ] = useState("");

  useEffect(() => {
    handleProgress();
  }, [current])

  const handleProgress = () => {
    const percentage = String(((current + 1) / (total + 1)) * 100) + "%";
    return setProgress(percentage);
  }

  return (
    <div className="progress-bar" style={{width: progress, backgroundColor: color}}></div>
  )
}

function Questionnaire(props) {
  const { primaryColor, secondaryColor, neutralColor } = props.color;
  const [ questions, setQuestions ] = useState(props.questions)
  const [ questionTop, setQuestionTop ] = useState("64px");

  const [ currentQuestion, setCurrentQuestion ] = useState(0);
  const [ currentAnswers, setCurrentAnswers ] = useState([]);
  const [ buttonDisabled, setButtonDisabled ] = useState(true);

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

  const isButtonDisabled = (answers) => {
    if (questions[currentQuestion].form.length === answers.length) {
      let empty;
      for (var i = 0; i < answers.length; i++) {
        if (answers[i] === undefined || answers[i] === "") {
          empty = true;
          break
        };
      }

      if (!empty) {
        return false
      }
    }
    return true;
  }

  const handleNext = () => {
    if (!buttonDisabled) {
      let newQuestions = [...questions];
      for (let i = 0; i < currentAnswers.length; i++) {
        newQuestions[currentQuestion].form[i].answer = currentAnswers[i];
      }
      if (currentQuestion === questions.length - 1) {
        props.onSubmit(newQuestions);
      }
      setQuestions(newQuestions);
      setCurrentAnswers([]);
      setButtonDisabled(true);
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const handleBack = () => {
    const questionIndex = currentQuestion - 1;
    const previousAnswers = [];
    questions[questionIndex].form.forEach((input) => {
      previousAnswers.push(input.answer);
    })
    setCurrentAnswers(previousAnswers);
    setCurrentQuestion(questionIndex);
    setButtonDisabled(false);
  }

  const handleAnswerInput = (key, value) => {
    let newAnswers = [...currentAnswers];
    newAnswers[key] = value;
    setCurrentAnswers(newAnswers);

    if (isButtonDisabled(newAnswers)) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false);
    }
  }

  const renderQuestion = () => {
    const currentQ = questions[currentQuestion];
    let questionText = questions[currentQuestion].question;

    //Search for index conditional text
    if (currentQ.conditional) {
      const index = questionText.indexOf("%conditional%");
      if (index !== -1) {
        // Get first part of text
        let start = questionText.slice(0, index);
        // Use conditional array to get previous answer
        let conditional = questions[currentQ.conditional[0]].form[currentQ.conditional[1]].answer;
        // Get last bit of text
        let end = questionText.slice(index + 13);
        questionText = start + conditional + end;
      }
    }
  
    return questionText;
  }

  const renderNavButtons = () => {
    if (currentQuestion === 0) {
      return (
        <div
          className={"primary-button " + (buttonDisabled ? "disabled" : null)}
          style={{backgroundColor: primaryColor}}
          onClick={() => handleNext()}
        >
          <p>Get Started!</p>
        </div>
      )
    }
    return (
      <div className="nav row space-between">
        <div
          className="secondary-button"
          onClick={() => handleBack()}
          style={{borderColor: primaryColor, backgroundColor: secondaryColor}}
        >
          <p style={{color: primaryColor}}>Back</p>
        </div>
        <div
          className={"primary-button " + (buttonDisabled ? "disabled" : null)}
          style={{backgroundColor: primaryColor}}
          onClick={() => handleNext()}
        >
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
            style={{borderColor: primaryColor}}
            onChange={(e) => handleAnswerInput(key, e.target.value)}
          />
          { input.options && input.options.map((option) => {
            return (
              <div
                className="secondary-button"
                onClick={() => handleAnswerInput(key, option)}
                style={{borderColor: primaryColor}}
              >
                <p>{option}</p>
              </div>
            )
          })}
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
      <header className="header" style={{backgroundColor: secondaryColor}}>
        <h3>Register your business</h3>
      </header>
      <div
        className="question-container align-center"
        style={{top: questionTop, backgroundColor: neutralColor}}
      >
        <h2>{renderQuestion()}</h2>
        <ProgressBar current={currentQuestion} total={questions.length} color={primaryColor} />
      </div>
      <div className="answer-container align-center">
        <form className="container align-center">
          {questions[currentQuestion].form.map((input, key) => {
            return renderInput(input, key)
          })}
        </form>
      </div>
      <div className="nav-container align-center" style={{backgroundColor: secondaryColor}}>
        <div className="container align-center">
          {renderNavButtons()}
        </div>
      </div>
    </div>
  )
}

export default Questionnaire;