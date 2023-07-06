import { contender } from "./appContent"

export const getLeaderBoardFromLocalStorage = () => JSON.parse(localStorage.getItem("leaderBoard") || '[]');

export const setLeaderBoardInLocalStorage = (leaderBoard: contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));

export const getCurrentGameIdFromLocalStorage = () => JSON.parse(localStorage.getItem("currentGameId") || '1');

export const setCurrentGameIdInLocalStorage = (gameId: number) => localStorage.setItem("currentGameId", JSON.stringify(gameId));