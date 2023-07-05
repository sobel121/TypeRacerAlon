import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import {getRandomSentenceWords, getCurrentWordTodoCharacters, getTodoWords} from "./utils";
import { getLeaderBoardFromLocalStorage, setLeaderBoardInLocalStorage } from "./localStorageHandler";
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import Timer from "../timeStatistics";
import { restartGameText } from "./strings";
import "./appContent.css";

export interface contender {
    name: string;
    wpm: number;
}

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const leaderBoard = useRef<contender[]>(getLeaderBoardFromLocalStorage());
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [currentWordDoneCharacters, setCurrentWordDoneCharacters] = useState("");
    const [resetTime, setResetTime] = useState(1);

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

        setResetTime((state) => state === 0 ? 1 : state * -1);
    };

    const leaderBoardObject = () => {
        return {
            name: nameInput.current ? nameInput.current.value : "",
            wpm: Math.floor(sentenceWords.current.length * 60 / totalSeconds)
        };
    };

    useEffect(() => {        
        if (resetTime === 0) {
                leaderBoard.current.push(leaderBoardObject());
                leaderBoard.current.sort((currentContender, nextContender) => nextContender.wpm - currentContender.wpm);

                if (leaderBoard.current.length >= 6) {
                    leaderBoard.current.pop();
                }
            
            setLeaderBoardInLocalStorage(leaderBoard.current);
        }
    }, [resetTime])

    return (
        <>
            <input type="textArea" placeholder="Enter your name" id="nameInput" ref={nameInput}></input>
            <Timer
                resetTime={resetTime}
                wordsWritten={currentTargetWordIndex}
                totalSeconds={totalSeconds}
                setTotalSeconds={setTotalSeconds}
            />
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
                    setResetTime={setResetTime}
                    ref={textArea}
                />
                <button onClick={restartGame} id="restartGameButton">{restartGameText}</button>
            </span>
        </>
    );
}
