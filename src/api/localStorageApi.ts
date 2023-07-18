import { Contender } from "../customHooks/useUpdateLeaderBoard/types";

export const updateLeaderBoardInLocalStorage = (leaderBoard: Contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));

export const getLeaderBoardFromLocalStorage = () => JSON.parse(localStorage.getItem("leaderBoard") || '[]');

export const getCurrentGameIdFromLocalStorage = () => JSON.parse(localStorage.getItem("currentGameId") || '1');

export const setCurrentGameIdInLocalStorage = (gameId: number) => localStorage.setItem("currentGameId", JSON.stringify(gameId));