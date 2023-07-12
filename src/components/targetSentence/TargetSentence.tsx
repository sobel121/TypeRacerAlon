import React from "react";
import { Box, Typography } from "@mui/material"
import { sentenceContainerStyles, doneWordsStyles, doneCharactesInCurrentWordStyles, todoCharactersInCurrentWordStyles, todoWordsStyles } from "./styles";
// import "./TargetSentence.css"

interface TargetSentenceProps {
    done: string[],
    todo: string[], 
    currentWordDone: string, 
    currentWordTodo: string
};

export default function TargetSentence({done, todo, currentWordDone, currentWordTodo}: TargetSentenceProps) {
    return (
        <Box sx={sentenceContainerStyles}>
            <Typography sx={doneWordsStyles}>{done.join(" ") + (done.length === 0 ? "" : " ")}</Typography>
            <Typography sx={doneCharactesInCurrentWordStyles}>{currentWordDone}</Typography>
            <Typography sx={todoCharactersInCurrentWordStyles}>{currentWordTodo}</Typography>
            <Typography sx={todoWordsStyles}>{" " + todo.join(" ")}</Typography>
        </Box>
    );
}