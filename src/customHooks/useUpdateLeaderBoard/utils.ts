import { Contender } from "./types";
import { maxScoresAmount } from "./consts";
import { updateLeaderBoardInLocalStorage } from "../../api/localStorageApi";

export const updateLeaderBoard: (leaderBoard: Contender[], newContender: Contender) => Promise<Contender[]> = async (leaderBoard, newContender) => {
    leaderBoard.push(newContender);
    leaderBoard.sort((currentContender: Contender, nextContender: Contender) => nextContender.wpm - currentContender.wpm);

    if (leaderBoard.length > maxScoresAmount) {
        leaderBoard.pop();
    }

    updateLeaderBoardInLocalStorage(leaderBoard);

    return leaderBoard;
}