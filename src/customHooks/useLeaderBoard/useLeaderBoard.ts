import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "../../api/localStorageApi";
import { errorMessage } from "./strings";


export function useLeaderBoard(gameId: number) { 
    const { data } = useQuery([gameId.toString], getLeaderBoardFromLocalStorage, {
        onError: (err) => errorMessage + err,
    });   
                      
    return data;
}