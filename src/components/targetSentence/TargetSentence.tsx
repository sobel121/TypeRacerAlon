import React from "react";
import "./TargetSentence.css"

interface TargetSentenceProps {
    done: string[],
    todo: string[], 
    currentWordDone: string, 
    currentWordTodo: string
};

export default function TargetSentence({done, todo, currentWordDone, currentWordTodo}: TargetSentenceProps) {
    return (
        <span id="targetSentence">
            <span className="targetSentencePart" id="doneWords">{done.join(" ") + " "}</span>
            <span className="targetSentencePart" id="doneLettersInCurrentWord">{currentWordDone}</span>
            <span className="targetSentencePart" id="todoLettersInCurrentWord">{currentWordTodo}</span>
            <span className="targetSentencePart" id="todoWords">{" " + todo.join(" ")}</span>
        </span>
    );
}