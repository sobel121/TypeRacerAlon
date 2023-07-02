import React, { useRef, useState } from "react";
import { getRandomSentenceWords, isWordComplete } from "./utils";
import TargetSentence from "./TargetSentence";
require('./appContent.css')

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [todo, setTodo] = useState<string[]>(sentenceWords.current.slice(1));
    const [currentWordDone, setCurrentWordDone] = useState("");
    const [currentWordTodo, setCurrentWordTodo] = useState(sentenceWords.current[0]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (sentenceWords.current[currentTargetWordIndex].includes(event.currentTarget.value)) {        
            setCurrentWordDone(event.currentTarget.value);
            setCurrentWordTodo(sentenceWords.current[currentTargetWordIndex].slice(event.currentTarget.value.length));
        }
        
        if (isWordComplete(event.currentTarget.value, sentenceWords.current, currentTargetWordIndex)) {
            setDone((doneWords) => doneWords.concat(sentenceWords.current[currentTargetWordIndex]));
            setCurrentWordTodo(todo[0]);
            setTodo((todoWords) => todoWords.slice(1));
            
            setCurrentTargetWordIndex((index) => index + 1);
            event.currentTarget.value = "";
            setCurrentWordDone("")
            
            if (sentenceWords.current.length === currentTargetWordIndex + 1) {
                event.currentTarget.hidden = true;
            }
        }
        
    };

    const restartGame = () => {
        sentenceWords.current = getRandomSentenceWords();           
        setTodo(sentenceWords.current.slice(1));
        setCurrentWordTodo(sentenceWords.current[0]);
        setCurrentWordDone(" ");
        setDone([]);
        setCurrentTargetWordIndex(0);
        const typeTextArea = document.getElementById("textInputArea")! as HTMLInputElement;
        
        typeTextArea.hidden = false;
        typeTextArea.value = "";
        typeTextArea.focus();
    };

    return (
        <>
            <TargetSentence todo={todo} done={done} currentWordDone={currentWordDone} currentWordTodo={currentWordTodo} />
            <span id="intearctiveElements">
                <input type="textArea" onChange={handleInput} id="textInputArea"></input>
                <button onClick={restartGame} id="restartGameButton">restart game</button>
            </span>
        </>
    );
}
