import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";

const levels = ["Starter", "Learner", "Explorer", "Achiever", "Champion", "Word Guru"];

const level_to_id = {
    "Starter": 1,
    "Learner": 2,
    "Explorer": 3,
    "Achiever": 4,
    "Champion": 5,
    "Word Guru": 6
}

const Game = () => {
    const [currentWord, setCurrentWord] = useState(null);
    const [level, setLevel] = useState(levels[0]);
    const [jumbledWord, setJumbledWord] = useState("");
    const [userAnswer, setUserAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        fetchWord();
    }, [level]);

    const fetchWord = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/v1/random_word_dict?level=${level}`);
            const wordData = response.data;
            setCurrentWord(wordData);
            setJumbledWord(shuffleWord(wordData.english_word));
            setUserAnswer("");
            setIsCorrect(false);
        } catch (error) {
            console.error("Error fetching word:", error);
        }
    };

    const shuffleWord = (word) => {
        let shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
        while (shuffled === word) {
            shuffled = word.split("").sort(() => Math.random() - 0.5).join("");
        }
        return shuffled;
    };

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
        if (e.target.value.toLowerCase() === currentWord.english_word.toLowerCase()) {
            setIsCorrect(true);
        }
    };

    const handleNextWord = () => {
        fetchWord();
    };

    const playAudio = async (language) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/v1/generate_audio_dict?word=${currentWord.english_word}&language=${language}&level=${level}`, {
                responseType: "blob"
            });
            const audioUrl = URL.createObjectURL(response.data);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>English Learning Game</h1>
            <h2>Level: {level}</h2>
            <select onChange={(e) => setLevel(e.target.value)} value={level}>
                {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                ))}
            </select>

            {currentWord && (
                <>
                    <div style={{ fontSize: "24px", margin: "20px" }}>
                        <p>Meaning in Hindi: {currentWord.meanings?.hi}</p>
                        <button onClick={() => playAudio("hi")}><FaVolumeUp /> Hindi Pronunciation</button>
                        <button onClick={() => playAudio("en")}><FaVolumeUp /> English Pronunciation</button>
                    </div>
                    <p style={{ fontSize: "32px", fontWeight: "bold" }}>Jumbled Word: {jumbledWord}</p>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={handleInputChange}
                        placeholder="Type your answer"
                        style={{ fontSize: "20px", padding: "10px", marginTop: "10px" }}
                    />
                    {isCorrect && <p style={{ color: "green", fontSize: "20px" }}>Correct! 🎉</p>}
                    <button onClick={handleNextWord} disabled={!isCorrect} style={{ marginTop: "10px", padding: "10px" }}>
                        Next Word
                    </button>
                </>
            )}
        </div>
    );
};

export default Game;
