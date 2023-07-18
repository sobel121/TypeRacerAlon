import { Contender } from "./types";
import { useMutation } from "@tanstack/react-query";
import { setLeaderBoard } from "./utils";

export function useUpdateLeaderBoard(newContender: Contender, leaderBoard: Contender[]) {
    return useMutation<Contender[], Error | null, Contender, void>({
        mutationKey: ["setLeaderBoard", String(newContender.id)],
        mutationFn: (newContender) => setLeaderBoard(leaderBoard, newContender),
    })
}