import React, { useState } from 'react';

function WrongCounter() {
    const [wrongCount, setCount] = useState(0);

    const incrementCount = () => {
        setCount(wrongCount + 1);
    };
    
    incrementCount();

    return wrongCount;
}

export default WrongCounter;