import React from "react";

export default function TargetSentence({done, todo, currentWordDone, currentWordTodo}: {done: string[], todo: string[], currentWordDone: string, currentWordTodo: string}) {
    return (
        <span id="targetSentence">
            <span id="doneWords">{done.join(" ")}</span>
            <span id="doneLettersInCurrentWord">{currentWordDone}</span>
            <span id="todoLettersInCurrentWord">{currentWordTodo}</span>
            <span id="todoWords">{todo.join(" ")}</span>
        </span>
    );
}