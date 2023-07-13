import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import {
    sentenceContainerStyles,
    doneWordsStyles,
    doneCharactesInCurrentWordStyles,
    todoCharactersInCurrentWordStyles,
    todoWordsStyles,
} from "./styles";
import { addSpacing } from "./utils";

interface TargetSentenceProps {
    done: string[];
    todo: string[];
    currentWordDone: string;
    currentWordTodo: string;
}

export default function TargetSentence({
    done,
    todo,
    currentWordDone,
    currentWordTodo,
}: TargetSentenceProps) {
    const doneWords = useMemo(() => done.join(" ") + addSpacing(done.length), [done]);
    const todoWords = useMemo(() => " " + todo.join(" "), [todo])

    return (
        <Box sx={sentenceContainerStyles}>
            <Typography sx={doneWordsStyles}>
                {doneWords}
            </Typography>
            <Typography sx={doneCharactesInCurrentWordStyles}>
                {currentWordDone}
            </Typography>
            <Typography sx={todoCharactersInCurrentWordStyles}>
                {currentWordTodo}
            </Typography>
            <Typography sx={todoWordsStyles}>{todoWords}</Typography>
        </Box>
    );
}
