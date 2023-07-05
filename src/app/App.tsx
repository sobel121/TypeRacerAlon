import React from "react";
import "./App.css";

import { title } from "./strings";
import AppContent from "../components/appContent";

export default function App() {
    return (
        <div id="appContainer">
            <h1 id="title">{title}</h1>
            <AppContent />
        </div>
    );
}