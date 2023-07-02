import { sentencesBank } from "./constants";

export const getRandomSentenceWords = () => sentencesBank[Math.floor(Math.random() * sentencesBank.length)].split(" ");

export const isWordComplete = (value: string, sentenceWords: string[], currentTargetWordIndex: number) => {
    return value === sentenceWords[currentTargetWordIndex] + " " 
    || (value ===sentenceWords[currentTargetWordIndex] && sentenceWords.length === currentTargetWordIndex + 1)
};
