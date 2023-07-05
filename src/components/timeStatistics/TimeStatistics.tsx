import React, { useEffect, useRef, useState} from "react";
import { padOneDigitNumber } from "./utils";
import "./TimeStatistics.css";

interface TimerProps {
    resetTime: number,
    wordsWritten: number
};

export default function Timer({resetTime, wordsWritten}: TimerProps) {
    const minutesElement = useRef<HTMLLabelElement>(null);
    const secondsElement = useRef<HTMLLabelElement>(null);
    const wordsPerMinute = useRef<HTMLLabelElement>(null);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const currentMinutes = padOneDigitNumber(Math.floor(totalSeconds / 60));
    const currentSeconds = padOneDigitNumber(totalSeconds % 60);
    let timer: NodeJS.Timer;
    let sec = 0;
    
    const setTime = () => {
        setTotalSeconds((currentSeconds) => currentSeconds + 1);
    }
    
    useEffect(() => {
        timer = setInterval(setTime, 1000);

        if (resetTime === 0) {
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer);
            setTotalSeconds(0);
        }
    }, [resetTime]);

    useEffect(() => {    
        if (wordsPerMinute.current && totalSeconds !== 0) {
            wordsPerMinute.current.innerText = "" + Math.floor(wordsWritten * 60 / totalSeconds);
        }
    }, [totalSeconds]);

    return (
        <div id="timeStatisticsContainer">
            <div id="timerContainer">
                <label id="minutes" ref={minutesElement}>{currentMinutes}</label>:<label id="seconds" ref={secondsElement}>{currentSeconds}</label>
            </div>
            <div id="typingSpeedContainer">
                <label ref={wordsPerMinute}>0</label> wpm
            </div>
        </div>
    )
}