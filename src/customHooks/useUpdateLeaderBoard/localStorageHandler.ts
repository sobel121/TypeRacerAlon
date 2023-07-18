import { Contender } from "./types";

export const setLeaderBoardInLocalStorage = (leaderBoard: Contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));