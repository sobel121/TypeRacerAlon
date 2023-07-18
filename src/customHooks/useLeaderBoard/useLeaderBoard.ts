import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "./localStorageHandler";

export function useLeaderBoard() { 
    const { isLoading, isError, error, data } = useQuery(['leaderBoard'], () => getLeaderBoardFromLocalStorage());   

    if (isLoading) {
        console.log("Loading...");
    }

    if (isError && error instanceof Error) {
        console.log("An error occured: " + error.message);
    }
                      
    return data;
}