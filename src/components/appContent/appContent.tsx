import React, { useCallback, useMemo, useRef, useState } from "react";
import {getRandomSentenceWords, getCurrentWordTodoCharacters, getTodoWords} from "./utils";
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import Timer from "../timeStatistics";
import { restartGameText } from "./strings";
import "./appContent.css";

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [currentWordDoneCharacters, setCurrentWordDoneCharacters] = useState("");
    const [resetTime, setResetTime] = useState(1);

    const restartGame = useCallback(() => {
        sentenceWords.current = getRandomSentenceWords();
        setCurrentWordDoneCharacters("");
        setDone([]);
        setCurrentTargetWordIndex(0);

        if (textArea.current) {
            textArea.current.disabled = false;
            textArea.current.value = "";
            textArea.current.focus();
        }        
        
        setResetTime((state) => state === 0 ? 1 : state * -1);

    }, []);

    const todoWords = useMemo(
        () => getTodoWords(done.length + 1, sentenceWords.current),
        [done]
    );

    const currentWordTodoLetters = useMemo(
        () =>
            getCurrentWordTodoCharacters(
                currentWordDoneCharacters.length,
                sentenceWords.current[currentTargetWordIndex]
            ),
        [currentWordDoneCharacters, sentenceWords.current]
    );

    return (
        <>
            <Timer
                resetTime={resetTime}
                wordsWritten={currentTargetWordIndex}
            />
            <TargetSentence
                done={done}
                todo={todoWords}
                currentWordDone={currentWordDoneCharacters}
                currentWordTodo={currentWordTodoLetters}
            />
            <span id="intearctiveElements">
                <TypeInput
                    sentenceWords={sentenceWords.current}
                    currentTargetWordIndex={currentTargetWordIndex}
                    setDone={setDone}
                    setCurrentWordDoneCharacters={setCurrentWordDoneCharacters}
                    setCurrentTargetWordIndex={setCurrentTargetWordIndex}
                    textArea={textArea}
                    setResetTime={setResetTime}
                />
                <button onClick={restartGame} id="restartGameButton">
                    {restartGameText}
                </button>
            </span>
        </>
    );
}
