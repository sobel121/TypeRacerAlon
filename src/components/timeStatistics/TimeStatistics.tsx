import React, { useEffect, useRef, Dispatch, SetStateAction } from "react";
import { padOneDigitNumber } from "./utils";
import { Box, Typography } from "@mui/material";
import {
    containerStyles,
    minutesElementStyles,
    secondsElementStyles,
    timeContainerStyles,
    wpmStyles,
} from "./styles";

interface TimerProps {
    resetTime: number;
    wordsWritten: number;
    totalSeconds: number;
    setTotalSeconds: Dispatch<SetStateAction<number>>;
}

export default function Timer({
    resetTime,
    wordsWritten,
    totalSeconds,
    setTotalSeconds,
}: TimerProps) {
    const currentMinutes = padOneDigitNumber(Math.floor(totalSeconds / 60));
    const currentSeconds = padOneDigitNumber(totalSeconds % 60);
    const wpm =
        "" +
        (Math.floor((wordsWritten * 60) / totalSeconds)
            ? Math.floor((wordsWritten * 60) / totalSeconds)
            : 0);
    let timer: NodeJS.Timer;

    const setTime = () => {
        setTotalSeconds((currentSeconds) => currentSeconds + 1);
    };

    useEffect(() => {
        if (resetTime) {
            timer = setInterval(setTime, 1000);
            setTotalSeconds(0);
        }

        return () => {
            clearInterval(timer);
        };
    }, [resetTime]);

    return (
        <Box sx={containerStyles}>
            <Box sx={timeContainerStyles}>
                <Typography sx={minutesElementStyles}>
                    {currentMinutes}
                </Typography>
                :
                <Typography sx={secondsElementStyles}>
                    {currentSeconds}
                </Typography>
            </Box>

            <Box>
                <Typography sx={wpmStyles}>{wpm}</Typography> wpm
            </Box>
        </Box>
    );
}
