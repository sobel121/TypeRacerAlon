import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import {getRandomSentenceWords, getCurrentWordTodoCharacters, getTodoWords} from "./utils";
import { getLeaderBoardFromLocalStorage, setLeaderBoardInLocalStorage, getCurrentGameIdFromLocalStorage, setCurrentGameIdInLocalStorage } from "./localStorageHandler";
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import Timer from "../timeStatistics";
import DisplayLeaderBoardIfNotEmpty from "../leaderBoard";
import { restartGameText } from "./strings";
import "./appContent.css";

export interface contender {
    wpm: number;
    id: number;
}

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const nameInput = useRef<HTMLInputElement>(null);
    const [leaderBoard, setLeaderBoard] = useState<contender[]>(getLeaderBoardFromLocalStorage());
    const [currentGameId, setCurrentGameId] = useState<number>(getCurrentGameIdFromLocalStorage());
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

    const createLeaderBoardObject = () => {
        return {
            wpm: Math.floor(sentenceWords.current.length * 60 / totalSeconds),
            id: currentGameId
        };
    };

    useEffect(() => {
        if (resetTime === 0) {
            setLeaderBoard((currentLeaderBoard) => {
                const tempLeaderBoard = Object.assign([], currentLeaderBoard);
                tempLeaderBoard.push(createLeaderBoardObject());
                
                return tempLeaderBoard;
            });
        }
    }, [resetTime]);

    useEffect(() => {        
        if (leaderBoard.length !== 0) {
            setCurrentGameId((currentId) => currentId + 1);
            
            setLeaderBoard((unsortedLeaderBoard) => unsortedLeaderBoard.sort((currentContender, nextContender) => nextContender.wpm - currentContender.wpm));
            
            if (leaderBoard.length >= 6) {
                setLeaderBoard((overSizedLeaderBoard) => overSizedLeaderBoard.slice(0, 5));
            }
            
            setCurrentGameIdInLocalStorage(currentGameId);
            setLeaderBoardInLocalStorage(leaderBoard);
        }
    }, [leaderBoard]);

    return (
        <>
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
                <DisplayLeaderBoardIfNotEmpty
                    leaderBoard={leaderBoard}
                />
            </span>
        </>
    );
}
