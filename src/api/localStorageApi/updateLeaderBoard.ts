import { Contender } from "../../customHooks/useUpdateLeaderBoard/types";

export const updateLeaderBoardInLocalStorage = (leaderBoard: Contender[]) => localStorage.setItem("leaderBoard" ,JSON.stringify(leaderBoard));