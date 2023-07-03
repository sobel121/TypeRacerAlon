import React, { useRef, useState } from "react";
import {
    getRandomSentenceWords,
    isWordComplete,
    getCurrentWordTodoCharacters,
    getTodoWords,
} from "./utils";
import TargetSentence from "./TargetSentence";
import "./appContent.css";

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [currentWordDoneCharacters, setCurrentWordDoneCharacters] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentText = event.currentTarget.value;

        if (sentenceWords.current[currentTargetWordIndex].includes(currentText)) {
            setCurrentWordDoneCharacters(currentText);
        }

        if (isWordComplete(currentText,sentenceWords.current,currentTargetWordIndex)) {
            setDone((doneWords) =>
                doneWords.concat(sentenceWords.current[currentTargetWordIndex])
            );

            setCurrentTargetWordIndex((index) => index + 1);
            event.currentTarget.value = "";
            setCurrentWordDoneCharacters("");

            if (sentenceWords.current.length === currentTargetWordIndex + 1) {
                event.currentTarget.disabled = true;
            }
        }
    };

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
                todo={getTodoWords(done.length + 1, sentenceWords.current)}
                done={done}
                currentWordDone={currentWordDoneCharacters}
                currentWordTodo={getCurrentWordTodoCharacters(
                    currentWordDoneCharacters.length,
                    sentenceWords.current[currentTargetWordIndex]
                )}
            />
            <span id="intearctiveElements">
                <input type="textArea" onChange={handleInput} ref={textArea} id="textInputArea"></input>
                <button onClick={restartGame} id="restartGameButton">restart game</button>
            </span>
        </>
    );
}
