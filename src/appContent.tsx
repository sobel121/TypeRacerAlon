import React, { useRef, useState } from "react";
import { getRandomSentenceWords, isWordComplete } from "./utils";
import TargetSentence from "./TargetSentence";
require('./appContent.css')

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [todo, setTodo] = useState<string[]>(sentenceWords.current.slice(1));
    const [currentWordDone, setCurrentWordDone] = useState("");
    const [currentWordTodo, setCurrentWordTodo] = useState(sentenceWords.current[0]);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentText = event.currentTarget.value;

        if (sentenceWords.current[currentTargetWordIndex].includes(currentText)) {        
            setCurrentWordDone(currentText);
            setCurrentWordTodo(sentenceWords.current[currentTargetWordIndex].slice(currentText.length));
        }
        
        if (isWordComplete(currentText, sentenceWords.current, currentTargetWordIndex)) {
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
        
        if(textArea.current) {
            textArea.current.hidden = false
            textArea.current.value = ""; 
            textArea.current.focus();
        }
    };

    return (
        <>
            <TargetSentence todo={todo} done={done} currentWordDone={currentWordDone} currentWordTodo={currentWordTodo} />
            <span id="intearctiveElements">
                <input type="textArea" onChange={handleInput} ref={textArea} id="textInputArea"></input>
                <button onClick={restartGame} id="restartGameButton">restart game</button>
            </span>
        </>
    );
}
