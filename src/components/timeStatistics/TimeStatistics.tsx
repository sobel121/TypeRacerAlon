import React, { useEffect, useRef, useState, useMemo} from "react";
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
    const currentMinutes = useMemo(() => padOneDigitNumber(Math.floor(totalSeconds / 60)), [totalSeconds]);
    const currentSeconds = useMemo(() => padOneDigitNumber(totalSeconds % 60), [totalSeconds]);
    const wpm = useMemo(() => "" + (Math.floor(wordsWritten * 60 / totalSeconds) ? Math.floor(wordsWritten * 60 / totalSeconds) : 0), [totalSeconds, wordsWritten]);
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
                <label ref={wordsPerMinute}>{wpm}</label> wpm
            </div>
        </div>
    )
}