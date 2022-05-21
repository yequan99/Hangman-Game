import React, { useState } from "react";
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

const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const indexing = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

function ToggleButton(){
  const [disable, setDisable] = useState(indexing);
  return <div>
    {letters.map((letter, index) => (
        <Button  disabled= { disable[index] } onClick = { () => {
            const newState = [...disable]
            newState[index] = true
            setDisable(newState)
        } }> 
            {letter}
        </Button>
    ))}
  </div>
}

export default ToggleButton;