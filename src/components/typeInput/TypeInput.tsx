import React, { useCallback } from "react";
import { isWordComplete } from "./utils";

interface TypeInputProps {
    sentenceWords: string[], 
    currentTargetWordIndex: number, 
    setDone: (callback: (value: string[]) => string[]) => void;
    setCurrentWordDoneCharacters: (value: string) => void;
    setCurrentTargetWordIndex: (callback: (value: number) => number) => void;
    textArea: React.ForwardedRef<HTMLInputElement>
}

function TypeInput({sentenceWords, currentTargetWordIndex, setDone, setCurrentWordDoneCharacters, setCurrentTargetWordIndex, textArea}:TypeInputProps) {
    const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const currentText = event.currentTarget.value;

        if (sentenceWords[currentTargetWordIndex].startsWith(currentText)) {
            setCurrentWordDoneCharacters(currentText);
        }

        if (isWordComplete(currentText, sentenceWords, currentTargetWordIndex)) {
            setDone((done) =>
                done.concat(sentenceWords[currentTargetWordIndex])
            );

            setCurrentTargetWordIndex((index) => index + 1);
            event.currentTarget.value = "";
            setCurrentWordDoneCharacters("");

            if (sentenceWords.length === currentTargetWordIndex + 1) {
                event.currentTarget.disabled = true;
            }
        }
    }, [currentTargetWordIndex]);

    return (
        <input type="textArea" onChange={handleInput} ref={textArea} id="textInputArea"></input>
    );
}

export default TypeInput;