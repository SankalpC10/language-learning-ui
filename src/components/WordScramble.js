// src/components/WordScramble.js
import React, { useState } from 'react';

const WordScramble = ({ jumbledWord, onGuessSubmit }) => {
    const [userGuess, setUserGuess] = useState('');

    const handleChange = (e) => setUserGuess(e.target.value);

    const handleSubmit = () => {
        onGuessSubmit(userGuess);
        setUserGuess('');
    };

    return (
        <div>
            <h3>Rearrange the letters:</h3>
            <div>{jumbledWord}</div>
            <input type="text" value={userGuess} onChange={handleChange} placeholder="Your answer..." />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default WordScramble;
