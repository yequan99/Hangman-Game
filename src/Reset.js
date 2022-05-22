import GuessWord from "./GuessWord";
import styled from 'styled-components';

const Buttons = styled.button`
  background-color: #3f51b5;
  width: 80px;
  height: 40px;
  color: white;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  margin: 5px 5px;
  &:hover{
    background-color: #283593;
  }
`

function Reset(){
    return <div>
        <Buttons onClick={() => {
            GuessWord()
        }}>
            Restart
        </Buttons>
    </div>
}

export default Reset;