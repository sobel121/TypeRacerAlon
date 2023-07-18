import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "../../api/localStorageApi";
import { loadingMessage, errorMessage } from "./strings";


export function useLeaderBoard() { 
    const { data } = useQuery(['leaderBoard'], () => getLeaderBoardFromLocalStorage(), {
        onError: (err) => errorMessage + err,
    });   
                      
    return data;
}