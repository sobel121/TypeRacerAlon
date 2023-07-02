import React from "react";

interface TargetSentenceProps {done: string[], todo: string[], currentWordDone: string, currentWordTodo: string};

export default function TargetSentence({done, todo, currentWordDone, currentWordTodo}: TargetSentenceProps) {
    return (
        <span id="targetSentence">
            <span id="doneWords">{done.join(" ")}</span>
            <span id="doneLettersInCurrentWord">{currentWordDone}</span>
            <span id="todoLettersInCurrentWord">{currentWordTodo}</span>
            <span id="todoWords">{todo.join(" ")}</span>
        </span>
    );
}