import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "../../api/localStorageApi";
import { loadingMessage, errorMessage } from "./strings";


export function useLeaderBoard() { 
    const { isLoading, isError, error, data } = useQuery(['leaderBoard'], () => getLeaderBoardFromLocalStorage());   

    if (isLoading) {
        console.log(loadingMessage);
    }

    if (isError && error instanceof Error) {
        console.log(errorMessage + error.message);
    }
                      
    return data;
}