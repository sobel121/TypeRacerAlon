import { Contender } from "./types";
import { useMutation } from "@tanstack/react-query";
import { updateLeaderBoard } from "./utils";

export function useUpdateLeaderBoard(newContender: Contender, leaderBoard: Contender[]) {
    return useMutation<Contender[], Error | null, Contender, void>({
        mutationKey: ["updateLeaderBoard", String(newContender.id)],
        mutationFn: (newContender) => updateLeaderBoard(leaderBoard, newContender),
    })
}