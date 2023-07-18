import { sentencesBank } from "../../assets/sentenceBank";

export const getRandomSentenceWords = () =>
    sentencesBank[Math.floor(Math.random() * sentencesBank.length)].split(" ");

export const getCurrentWordTodoCharacters = (
    doneCharactersLength: number,
    currentWord: string
) => (currentWord ? currentWord.substring(doneCharactersLength) : "");

export const createLeaderBoardContender = (sentenceWordsAmount: number, totalSeconds: number, currentGameId: number) => {  
    return {
        wpm: Math.floor((sentenceWordsAmount * 60) / totalSeconds),
        id: currentGameId,
    }
}