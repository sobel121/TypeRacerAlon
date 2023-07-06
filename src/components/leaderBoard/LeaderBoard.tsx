import React from "react";
import { contender } from "../appContent/appContent";
import { leaderBoardText, leaderBoardTableHeaderText } from "./strings";
import "./LeaderBoard.css";

interface LeaderBoardProps {
    leaderBoard: contender[]
};

export default function LeaderBoard({leaderBoard}: LeaderBoardProps) {
    return leaderBoard.length !== 0 ? (
        <div  id="leaderBoardContainer">
            <h1 id="leaderBoardTitle">{leaderBoardText}</h1>
            <table id="leaderBoard">
                <thead>
                    <tr>
                        <th>{leaderBoardTableHeaderText}</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoard.map((contender) => {
                        return (
                            <tr key={contender.id}>
                                <td>{ contender.wpm }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    ) : "";
}