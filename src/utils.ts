import { sentencesBank } from "./constants";

export const getRandomSentence = () => sentencesBank[Math.floor(Math.random() * sentencesBank.length)];
