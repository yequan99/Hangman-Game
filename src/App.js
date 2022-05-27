import "./styles.css";
import { useEffect, useState } from 'react'
import styled from 'styled-components';

/* Styling custom button */
const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  margin: 5px 5px;
  &:hover{
    background-color: #283593;
  }
  &:disabled {
    background-color: #808080;
    cursor: unset
  }
`

const types = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

/* Creates an instance of a button */
function ToggleButton(props) {
  let disabled = props.used[props.index] || props.count <= 0 || props.isWin; //conditions for buttons to be disabled
  return (<Button disabled={ disabled } onClick = {() => {
    props.setUsed(prevUsed => prevUsed.map((used, i) => i === props.index ? true : used))
    if (props.word.indexOf(props.type) === -1) {  //if guessed letter is not found in word,
      props.setCount(prevCount => prevCount - 1) //decreases no. of turns left
    } 
    props.setGuess(prevGuess => {
      return prevGuess.map((letter, i) => {
        if (letter !== "_") { return letter } //if letter is guessed correctly
        if (props.word[i] === props.type) { return props.type }
        return "_" //if letter is guessed wrongly
      })
    })
  }}> 
  {props.type}
  </Button>)
}

/* Creates the rest of the buttons using map */
function ToggleButtons(props) {
  return <div>
    {types.map((type, i) => (
      <ToggleButton 
        key={i} 
        index={i}
        type={type} 
        isWin={props.isWin} 
        word={props.word} 
        setGuess={props.setGuess} 
        count={props.count} 
        setCount={props.setCount} 
        used={props.used} 
        setUsed={props.setUsed} /> 
    ))}
  </div>
}

export default function App() {
  const [ word, setWord ] = useState(""); // placeholder for word to be guessed
  const [ guess, setGuess ] = useState([]); //first word is variable, 2nd word is func that keeps track of state of variable
  const [ count, setCount ] = useState(6); // number of turns u can change
  const [ used, setUsed ] = useState(Array(26).fill(false));

  useEffect(() => {
    initialize();
  }, [])

  function initialize() {
    fetch('https://random-word-api.herokuapp.com/word') 
    .then(response => response.json()) //generates random word to use
    .then(data => {
      const word = data[0].toUpperCase(); //converts word to uppercase for comparison
      setWord(word);
      setGuess(Array(word.length).fill("_"));
      setCount(6);
      setUsed(Array(26).fill(false)); //disabled = false at the start (buttons are all clickable)
    });
  }

  function reset() {
    initialize();
  }

  function Figure(props) {
    let errors = props.counter;
    return (
      <svg height="250" width="200" className="figure-container">
          {/* <!-- Rod --> */}
          <line x1="60" y1="20" x2="140" y2="20" />
          <line x1="140" y1="20" x2="140" y2="50" />
          <line x1="60" y1="20" x2="60" y2="230" />
          <line x1="20" y1="230" x2="100" y2="230" />
  
          {/* <!-- Head --> */}
          {errors < 6 &&
          <circle cx="140" cy="70" r="20" />
          }
  
          {/* <!-- Body --> */}
          {errors < 5 &&
          <line x1="140" y1="90" x2="140" y2="150" />
          }
  
          {/* <!-- Arms --> */}
          {errors < 4 &&
          <line x1="140" y1="120" x2="120" y2="100" />
          }
          {errors < 3 &&
            <line x1="140" y1="120" x2="160" y2="100" />
          }
          
          {/* <!-- Legs --> */}
          {errors < 2 &&
          <line x1="140" y1="150" x2="120" y2="180" />
          }
          {errors < 1 &&
            <line x1="140" y1="150" x2="160" y2="180" />
          }
      </svg>
    )
  }

  let isWin = guess.reduce((x, y) => x && y !== "_", true)
  //checks if the entire word was guessed correctly

  return (
    <div className="App">
      <h1>Hangman Game</h1>
      <div className = "game">
        <p>Number of turns left: {count}</p>
        <p><Figure counter = {count} /></p>
        <p>Current guess:</p>
        {guess.map((letter, i) => <span key={i}>{letter} </span>)}
        <ToggleButtons
          isWin={isWin} 
          word={word} 
          setGuess={setGuess} 
          count={count} 
          setCount={setCount} 
          used={used} 
          setUsed={setUsed} />
        {count === 0 ? <p>No more turns :(</p> : ''}
        {isWin ? <p>You win!</p> : ''}
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
