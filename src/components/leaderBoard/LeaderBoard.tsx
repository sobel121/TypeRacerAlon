import React from "react";
import { Contender } from "../appContent/types";
import { leaderBoardText, leaderBoardTableHeaderText } from "./strings";
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell} from "@mui/material";
import { tableContainerStyles, tableTitleStyles, leaderBoardStyles, tableCellStyles } from "./styles";

interface LeaderBoardProps {
    leaderBoard: Contender[]
};

export default function LeaderBoard({leaderBoard}: LeaderBoardProps) {
    return (
        <Box sx={tableContainerStyles}>
            <Typography sx={tableTitleStyles}>{leaderBoardText}</Typography>
            <Table sx={leaderBoardStyles}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={tableCellStyles}>{leaderBoardTableHeaderText}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderBoard.map((contender) => {
                        return (
                            <TableRow key={contender.id}>
                                <TableCell sx={tableCellStyles}>{contender.wpm}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}