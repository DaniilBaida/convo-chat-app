import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "./components/mode-toggle";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <App />
                <ModeToggle></ModeToggle>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
