import React, { useState } from "react";
import { getRandomSentence } from "./utils";

export default function App() {
    const [targetSentence, setTargetSentence] = useState(getRandomSentence());
    let sentenceWords = targetSentence.split(" ");
    let currentTargetWordIndex = 0;

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.currentTarget.value === sentenceWords[currentTargetWordIndex] + " " ||
            (e.currentTarget.value === sentenceWords[currentTargetWordIndex] &&
                sentenceWords.length === currentTargetWordIndex + 1)
        ) {
            currentTargetWordIndex++;
            e.currentTarget.value = "";
    
            if (sentenceWords.length === currentTargetWordIndex) {
                e.currentTarget.hidden = true;
            }
        }
    };

    const restartGame = () => {
        setTargetSentence(getRandomSentence());    
        sentenceWords = targetSentence.split(" ");
        currentTargetWordIndex = 0;
        document.getElementById("wordsInputArea")!.hidden = false;
    };

    return (
        <div>
            <h1>type racer</h1>
            <h2>{targetSentence}</h2>
            <input type="textArea" onKeyUp={handleInput} id="wordsInputArea"></input>
            <button onClick={restartGame}>restart game</button>
        </div>
    );
}

