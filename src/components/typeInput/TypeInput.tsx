import React, { Dispatch, SetStateAction } from "react";
import { isWordComplete } from "./utils";
import { TextField } from "@mui/material";
import { textInputStyles, textInputPropsStyles } from "./styles";

interface TypeInputProps {
    sentenceWords: string[];
    currentTargetWordIndex: number;
    setDone: Dispatch<SetStateAction<string[]>>;
    setCurrentWordDoneCharacters: Dispatch<SetStateAction<string>>;
    setCurrentTargetWordIndex: Dispatch<SetStateAction<number>>;
    setResetTime: Dispatch<SetStateAction<number>>;
}

function TypeInput(
    {
        sentenceWords,
        currentTargetWordIndex,
        setDone,
        setCurrentWordDoneCharacters,
        setCurrentTargetWordIndex,
        setResetTime,
    }: TypeInputProps,
    textArea: React.ForwardedRef<HTMLInputElement>
) {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentText = event.currentTarget.value;

        if (sentenceWords[currentTargetWordIndex].startsWith(currentText)) {
            setCurrentWordDoneCharacters(currentText);
        }

        if (
            isWordComplete(currentText, sentenceWords, currentTargetWordIndex)
        ) {
            setDone((doneWords) =>
                doneWords.concat(sentenceWords[currentTargetWordIndex])
            );

            setCurrentTargetWordIndex((index) => index + 1);
            event.currentTarget.value = "";
            setCurrentWordDoneCharacters("");

            if (sentenceWords.length === currentTargetWordIndex + 1) {
                event.currentTarget.disabled = true;
                setResetTime(0);
            }
        }
    };

    return (
        <TextField
            sx={textInputStyles}
            variant="outlined"
            inputRef={textArea}
            onChange={handleInput}
            inputProps={textInputPropsStyles}
        ></TextField>
    );
}

export default TypeInput;
