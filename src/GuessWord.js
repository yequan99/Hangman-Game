import React, { useState } from 'react';
import { RandomWords} from './RandomWords';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #3f51b5;
  width: 40px;
  height: 40px;
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
const word = RandomWords();
const alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const indexing = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]


function GuessWord(){
    const counter = 0;
    const [disable, setDisable] = useState(indexing);
    const [correctGuesses, setCorrectGuesses] = useState([])  
    const [wrongCount, setCount] = useState(0);  

    const incrementCount = () => {
        setCount(wrongCount + 1);
    };

    const maskedWord = word.split('').map(letter => 
    correctGuesses.includes(letter) ? letter : "_").join(" ");
    
    return <div>
        <h1 style={{textAlign: "center"}}>{maskedWord}</h1>
        {!maskedWord.includes("_") && <h1 style={{textAlign: "center"}}>You won!</h1>}
        {alphabets.map((alphabet, index) => (
        <Button disabled= { disable[index] } key={index} onClick={() => {
            const newState = [...disable]
            newState[index] = true
            setDisable(newState)
            if (word.includes(alphabet)) {
                setCorrectGuesses([...correctGuesses, alphabet])
            }
            else {
                // WrongCounter();
                incrementCount();
                // <Figure GuessWord={wrongCount}/>
            }
        }}>
            {alphabet}
        </Button>))}
        {wrongCount}
    </div>
};

export default GuessWord;