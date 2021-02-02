import './App.css';
import { useState, useEffect } from 'react'
function App() {
  const TEXT_LIST = ["Đỏ", "Xanh Dương", "Vàng", "Xanh Lá"]

  const RED = "#ff0900"
  const BLUE = "#0079ff"
  const YELLOW = "#ffef00"
  const GREEN = "#00f11d"

  const TEXT_COLOR = [RED, BLUE, YELLOW, GREEN]
  const INIT_QUESTION = {
    title: "GO",
    color: RED
  }
  const INIT_SCORE = 0
  const INIT_LEVEL = 1

  const [question, setQuestion] = useState(INIT_QUESTION)
  const [score, setScore] = useState(INIT_SCORE)
  const [duration, setDuration] = useState(10)
  const [level, setLevel] = useState(INIT_LEVEL)
  const [isStart, setIsStart] = useState(false)
  const [gameStatus, setGameStatus] = useState(false)
  const [heightScore, setHeightScore] = useState(0)
  let timeout = null
  useEffect(() => {
    if (isStart) {
      timeout = setTimeout(() => {
        console.log("useEffect");
        gameOver("Time out !!!")
      }, duration * 1000)
    }
  }, [isStart])

  useEffect(() => {
      console.log("score", score);
    if (score >= 2000) {
      setLevel(4)
      setDuration(3)
    } 
    else 
    if (score >= 1000) {
      setLevel(3)
      setDuration(2)
    }
    else
    if (score >= 100) {
      setLevel(2)
      setDuration(4)
    } 
   
  }, [score])

  const gameOver = (content) => {
    setGameStatus(false)
    setLevel(1)
    setIsStart(false)
    setScore(0)
    setQuestion(INIT_QUESTION)
    alert( content ? content : "Game Over" )
  }

  const randomQuestion = () => {
    const text = getRandomInt(level)
    let color = getRandomInt(level)
    if(level > 1 ) {
      while (text === color) {
        color = getRandomInt(level)
      }
    }
    else {
      color = 0
    }
    const question = {
      title: TEXT_LIST[text],
      color: TEXT_COLOR[color]
    }
    console.log("question", question);
    setQuestion(question)
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const onClickGo = () => {
    if (gameStatus) return
    setGameStatus(true)
    randomQuestion()
    setIsStart(true)
  }
  const onClickAnswer = (answer) => {
    //  if(!isStart) return
    clearTimeout(timeout)
    setIsStart(false)
    // console.log("answer", answer);
    // console.log("question", question);
    // console.log("answer === question.color", answer === question.color);
    if (answer === question.color) {
      const newScore = score + 100
      if (newScore >= heightScore) {
        setHeightScore(newScore)
      }
      setScore(newScore)

      randomQuestion()
      setTimeout(() => {
        setIsStart(true)
      }, 100)
    }
    else {
      gameOver()
    }

   
  }

  const Item =({color})=> {
    return (
      <div className="answer" style={{ backgroundColor: color }} onClick={() => onClickAnswer(color)} />
    )
  }

  const renderGameAns = () => {
    const colorArr = []
    while (colorArr.length < level) {
      const ind = getRandomInt(level)
        if(colorArr.indexOf(TEXT_COLOR[ind])  < 0)  {
          colorArr.push(TEXT_COLOR[ind])
        }
    }
    return (
      <div className="center">
          {
            colorArr.map((item)=> 
             <Item  color={item} />
            )
          }
      </div>
    )

  }
  return (
    <div className="App">
      <h1> Chọn màu của chữ</h1>
      <h2> Highest score : {heightScore}</h2>
      <h2>Level: {level}</h2>
      <h3> Score: {score}</h3>

      {/* <h2 style={{color: question.color}} >{question.title}</h2> */}

      <h2 style={{ color: question.color, cursor: "pointer" }} onClick={onClickGo}>{question.title}</h2>

      {
        !gameStatus ?
          <span style={{ margin: 30 }}>Chọn vào vào ô có màu giống với màu của chữ, không phải nội dung chữ, đừng để lừa nhé ?</span>
          : 
          renderGameAns()
      }

      <div style={{ margin: 30 }}></div>


      <div className="ProgressBar outer">
        <div style={{animationDuration: duration + "s"}} className={isStart ? "ProgressBar inner start" : "ProgressBar inner"} />
      </div>

    </div>
  );
}

export default App;
