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

export const createLeaderBoardObject = (sentenceWordsAmount: number, totalSeconds: number, currentGameId: number) => {  
    return {
        wpm: Math.floor((sentenceWordsAmount * 60) / totalSeconds),
        id: currentGameId,
    }
}