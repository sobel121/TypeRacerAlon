import React, { useMemo } from "react";
import "./TargetSentence.css"

interface TargetSentenceProps {
    done: string[],
    todo: string[], 
    currentWordDone: string, 
    currentWordTodo: string
};

export default function TargetSentence({done, todo, currentWordDone, currentWordTodo}: TargetSentenceProps) {
    const doneWords = useMemo(() => done.join(" ") + " ", [done]);
    const todoWords = useMemo(() => " " + todo.join(" "), [todo]);

    return (
        <span id="targetSentence">
            <span className="targetSentencePart" id="doneWords">{doneWords}</span>
            <span className="targetSentencePart" id="doneLettersInCurrentWord">{currentWordDone}</span>
            <span className="targetSentencePart" id="todoLettersInCurrentWord">{currentWordTodo}</span>
            <span className="targetSentencePart" id="todoWords">{todoWords}</span>
        </span>
    );
}