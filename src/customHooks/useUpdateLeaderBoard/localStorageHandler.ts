import { Contender } from "./types";

export const updateLeaderBoardInLocalStorage = (leaderBoard: Contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));