import React, { useEffect, useRef, Dispatch, SetStateAction} from "react";
import { padOneDigitNumber } from "./utils";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { containerStyles, minutesElementStyles, secondsElementStyles, timeContainerStyles, wpmStyles } from "./styles";

interface TimerProps {
    resetTime: number,
    wordsWritten: number,
    totalSeconds: number
    setTotalSeconds: Dispatch<SetStateAction<number>>
};

export default function Timer({resetTime, wordsWritten, totalSeconds, setTotalSeconds}: TimerProps) {
    const wordsPerMinuteElement = useRef<HTMLLabelElement>(null);
    const currentMinutes = padOneDigitNumber(Math.floor(totalSeconds / 60));
    const currentSeconds = padOneDigitNumber(totalSeconds % 60);
    const wpm = "" + (Math.floor(wordsWritten * 60 / totalSeconds) ? Math.floor(wordsWritten * 60 / totalSeconds) : 0);
    let timer: NodeJS.Timer;
    
    const setTime = () => {
        setTotalSeconds((currentSeconds) => currentSeconds + 1);
    }
    
    useEffect(() => {
        if (resetTime) {
            timer = setInterval(setTime, 1000);
            setTotalSeconds(0);
        }
        
        return () => {
            clearInterval(timer);
        }
    }, [resetTime]);

    return (
        <Box sx={containerStyles}>
            <Box sx={timeContainerStyles}>
                <InputLabel sx={minutesElementStyles}>{currentMinutes}</InputLabel>:<InputLabel sx={secondsElementStyles}>{currentSeconds}</InputLabel>
            </Box>

            <Box>
                <InputLabel sx={wpmStyles}>{wpm}</InputLabel> wpm
            </Box>
        </Box>
    )
}