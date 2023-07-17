import { sentencesBank } from "../../assets/sentenceBank";

export const getRandomSentenceWords = () =>
    sentencesBank[Math.floor(Math.random() * sentencesBank.length)].split(" ");

export const getCurrentWordTodoCharacters = (
    doneCharactersLength: number,
    currentWord: string
) => (currentWord ? currentWord.substring(doneCharactersLength) : "");

export const getTodoWords = (
    doneWordsAmount: number,
    sentenceWords: string[]
) => sentenceWords.slice(doneWordsAmount);

export const createLeaderBoardObject = (sentenceWords: string[], totalSeconds: number, currentGameId: number) => {  
    return {
        wpm: Math.floor((sentenceWords.length * 60) / totalSeconds),
        id: currentGameId,
    }
}