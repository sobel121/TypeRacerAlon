import React, { useEffect, useRef, Dispatch, SetStateAction} from "react";
import { padOneDigitNumber } from "./utils";
import "./TimeStatistics.css";

interface TimerProps {
    resetTime: number,
    wordsWritten: number,
    totalSeconds: number
    setTotalSeconds: Dispatch<SetStateAction<number>>
};

export default function Timer({resetTime, wordsWritten, totalSeconds, setTotalSeconds}: TimerProps) {
    const minutesElement = useRef<HTMLLabelElement>(null);
    const secondsElement = useRef<HTMLLabelElement>(null);
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
        <div id="timeStatisticsContainer">
            <div id="timerContainer">
                <label id="minutes" ref={minutesElement}>{currentMinutes}</label>:<label id="seconds" ref={secondsElement}>{currentSeconds}</label>
            </div>
            <div id="typingSpeedContainer">
                <label ref={wordsPerMinuteElement}>{wpm}</label> wpm
            </div>
        </div>
    )
}