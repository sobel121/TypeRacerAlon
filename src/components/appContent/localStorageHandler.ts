import { contender } from "./appContent"

export const getLeaderBoardFromLocalStorage = () => JSON.parse(localStorage.getItem("leaderBoard")!) || [];

export const setLeaderBoardInLocalStorage = (leaderBoard: contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));