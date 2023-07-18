import { Contender } from "./types";
import { maxScoresAmount } from "./consants";
import { setLeaderBoardInLocalStorage } from "./localStorageHandler";

export const setLeaderBoard: (leaderBoard: Contender[], newContender: Contender) => Promise<Contender[]> = async (leaderBoard, newContender) => {
    leaderBoard.push(newContender);
    leaderBoard.sort((currentContender: Contender, nextContender: Contender) => nextContender.wpm - currentContender.wpm);

    if (leaderBoard.length > maxScoresAmount) {
        leaderBoard.pop();
    }

    setLeaderBoardInLocalStorage(leaderBoard);

    return leaderBoard;
}