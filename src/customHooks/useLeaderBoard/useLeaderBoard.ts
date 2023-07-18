import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "../../api/localStorageApi/getLeaderBoard";
import { errorMessage } from "./strings";


export function useLeaderBoard(gameId: number) { 
    const { data } = useQuery([gameId.toString], getLeaderBoardFromLocalStorage, {
        onError: (err) => {
            throw new Error(errorMessage + err)
        },
    });   
                      
    return data;
}