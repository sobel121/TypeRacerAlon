import React from "react";
import { isWordComplete } from "./utils";

interface TypeInputProps {
    sentenceWords: string[], 
    currentTargetWordIndex: number, 
    setDone: React.Dispatch<React.SetStateAction<string[]>>, 
    setCurrentWordDoneCharacters: React.Dispatch<React.SetStateAction<string>>, 
    setCurrentTargetWordIndex: React.Dispatch<React.SetStateAction<number>>
}

function TypeInput({sentenceWords, currentTargetWordIndex, setDone, setCurrentWordDoneCharacters, setCurrentTargetWordIndex}:TypeInputProps, textArea: React.ForwardedRef<HTMLInputElement>) {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentText = event.currentTarget.value;

        if (sentenceWords[currentTargetWordIndex].startsWith(currentText)) {
            setCurrentWordDoneCharacters(currentText);
        }

        if (isWordComplete(currentText, sentenceWords, currentTargetWordIndex)) {
            setDone((doneWords) =>
                doneWords.concat(sentenceWords[currentTargetWordIndex])
            );

            setCurrentTargetWordIndex((index) => index + 1);
            event.currentTarget.value = "";
            setCurrentWordDoneCharacters("");

            if (sentenceWords.length === currentTargetWordIndex + 1) {
                event.currentTarget.disabled = true;
            }
        }
    };

    return (
        <input type="textArea" onChange={handleInput} ref={textArea} id="textInputArea"></input>
    );
}

export default TypeInput;