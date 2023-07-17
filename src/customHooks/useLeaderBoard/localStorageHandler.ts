import { Contender } from "./types";

export const getLeaderBoardFromLocalStorage = () => JSON.parse(localStorage.getItem("leaderBoard") || '[]');

export const setLeaderBoardInLocalStorage = (leaderBoard: Contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));