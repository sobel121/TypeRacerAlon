import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo
} from "react";
import {
    getRandomSentenceWords,
    getCurrentWordTodoCharacters,
    getTodoWords,
} from "./utils";
import {
    getLeaderBoardFromLocalStorage,
    setLeaderBoardInLocalStorage,
    getCurrentGameIdFromLocalStorage,
    setCurrentGameIdInLocalStorage,
} from "./localStorageHandler";
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import Timer from "../timeStatistics";
import { restartGameText } from "./strings";
import { Contender } from "./types";
import { maxScoresAmount } from "./consants";
import LeaderBoard from "../leaderBoard";
import { Box, Button } from "@mui/material";
import { interactiveElementsStyles, restartButtonStyles } from "./styles";

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [leaderBoard, setLeaderBoard] = useState<Contender[]>(
        getLeaderBoardFromLocalStorage()
    );
    const [currentGameId, setCurrentGameId] = useState<number>(
        getCurrentGameIdFromLocalStorage()
    );
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [currentTargetWordIndex, setCurrentTargetWordIndex] = useState(0);
    const [done, setDone] = useState<string[]>([]);
    const [currentWordDoneCharacters, setCurrentWordDoneCharacters] =
        useState("");
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

    const createLeaderBoardObject = useCallback(() => {
        return {
            wpm: Math.floor((sentenceWords.current.length * 60) / totalSeconds),
            id: currentGameId,
        };
    }, [sentenceWords.current.length, totalSeconds]);

    useEffect(() => {
        if (resetTime === 0) {
            setLeaderBoard((currentLeaderBoard) => [
                ...currentLeaderBoard,
                createLeaderBoardObject(),
            ]);
        }
    }, [resetTime]);

    useEffect(() => {
        if (leaderBoard.length !== 0) {
            setCurrentGameId((currentId) => currentId + 1);

            setLeaderBoard((unsortedLeaderBoard) =>
                unsortedLeaderBoard.sort(
                    (currentContender, nextContender) =>
                        nextContender.wpm - currentContender.wpm
                )
            );

            if (leaderBoard.length >= maxScoresAmount + 1) {
                setLeaderBoard((overSizedLeaderBoard) =>
                    overSizedLeaderBoard.slice(0, maxScoresAmount)
                );
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
                todo={todoWords}
                currentWordDone={currentWordDoneCharacters}
                currentWordTodo={currentWordTodoLetters}
            />
            <Box sx={interactiveElementsStyles}>
                <TypeInput
                    sentenceWords={sentenceWords.current}
                    currentTargetWordIndex={currentTargetWordIndex}
                    setDone={setDone}
                    setCurrentWordDoneCharacters={setCurrentWordDoneCharacters}
                    setCurrentTargetWordIndex={setCurrentTargetWordIndex}
                    textArea={textArea}
                    setResetTime={setResetTime}
                />
                <Button onClick={restartGame} sx={restartButtonStyles}>
                    {restartGameText}
                </Button>
            </Box>
            {leaderBoard.length !== 0 && (
                <LeaderBoard leaderBoard={leaderBoard} />
            )}
        </>
    );
}
