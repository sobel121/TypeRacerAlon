import { useQuery } from "@tanstack/react-query";
import { getLeaderBoardFromLocalStorage } from "../../api/localStorageApi";
import { errorMessage } from "./strings";


export function useLeaderBoard(gameId: number) { 
    const { data, isError, error } = useQuery([gameId.toString()], getLeaderBoardFromLocalStorage);   

    if (isError && error instanceof Error) {
        alert(errorMessage + error.message);
    }
                      
    return data;
}