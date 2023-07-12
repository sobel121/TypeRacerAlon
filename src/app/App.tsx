import React from "react";
import { title } from "./strings";
import AppContent from "../components/appContent";
import { Box, Typography } from "@mui/material";
import { titleStyles, appContainerStyles } from "./styles";

export default function App() {
    return (
        <Box sx={appContainerStyles}>
            {/* <h1 id="title">{title}</h1> */}
            <Typography sx={titleStyles}>{title}</Typography>
            <AppContent />
        </Box>
    );
}