import React, { useRef, useState } from "react";
import {getRandomSentenceWords, getCurrentWordTodoCharacters, getTodoWords} from "./utils";
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import { restartGameText } from "./strings";
import "./appContent.css";

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [currentWordDoneCharacters, setCurrentWordDoneCharacters] = useState("");

    const restartGame = () => {
        sentenceWords.current = getRandomSentenceWords();
        setCurrentWordDoneCharacters("");
        setDone([]);
        setCurrentTargetWordIndex(0);

        if (textArea.current) {
            textArea.current.disabled = false;
            textArea.current.value = "";
            textArea.current.focus();
        }
    };

    return (
        <>
            <TargetSentence
                done={done}
                todo={getTodoWords(done.length + 1, sentenceWords.current)}
                currentWordDone={currentWordDoneCharacters}
                currentWordTodo={getCurrentWordTodoCharacters(
                    currentWordDoneCharacters.length,
                    sentenceWords.current[currentTargetWordIndex]
                )}
            />
            <span id="intearctiveElements">
                <TypeInput 
                    sentenceWords={sentenceWords.current} 
                    currentTargetWordIndex={currentTargetWordIndex} 
                    setDone={setDone} 
                    setCurrentWordDoneCharacters={setCurrentWordDoneCharacters} 
                    setCurrentTargetWordIndex={setCurrentTargetWordIndex}
                    ref={textArea}
                />
                <button onClick={restartGame} id="restartGameButton">{restartGameText}</button>
            </span>
        </>
    );
}
