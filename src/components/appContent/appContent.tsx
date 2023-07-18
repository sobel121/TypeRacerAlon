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
    getCurrentGameIdFromLocalStorage,
    setCurrentGameIdInLocalStorage,
} from "../../api/localStorageApi"
import TargetSentence from "../targetSentence";
import TypeInput from "../typeInput";
import Timer from "../timeStatistics";
import { restartGameText } from "./strings";
import LeaderBoard from "../leaderBoard";
import { Box, Button } from "@mui/material";
import { interactiveElementsStyles, restartButtonStyles } from "./styles";
import useLeaderBoard from "../../customHooks/useLeaderBoard";
import useUpdateLeaderBoard from "../../customHooks/useUpdateLeaderBoard";
import { createLeaderBoardContender } from "./utils";

export default function AppContent() {
    const sentenceWords = useRef<string[]>(getRandomSentenceWords());
    const textArea = useRef<HTMLInputElement>(null);
    const [currentGameId, setCurrentGameId] = useState<number>(
        getCurrentGameIdFromLocalStorage()
    );
    const [totalSeconds, setTotalSeconds] = useState(0);
    const leaderBoard = useLeaderBoard(currentGameId);
    const {mutate: updateLeaderBoard} = useUpdateLeaderBoard(createLeaderBoardContender(sentenceWords.current.length, totalSeconds, currentGameId), leaderBoard)
    
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

    useEffect(() => {        
        if (resetTime === 0) {
            setCurrentGameId((currentId) => currentId + 1);
            setCurrentGameIdInLocalStorage(currentGameId);
            updateLeaderBoard(createLeaderBoardContender(sentenceWords.current.length, totalSeconds, currentGameId));
        }
    }, [resetTime]);

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
                    ref={textArea}
                    setResetTime={setResetTime}
                />
                <Button onClick={restartGame} sx={restartButtonStyles}>
                    {restartGameText}
                </Button>
            </Box>
            {leaderBoard && leaderBoard.length !== 0 && (
                <LeaderBoard leaderBoard={leaderBoard} />
            )}
        </>
    );
}
