import React, { useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";

// Tema tanýmlarý
export const lightTheme = {
    background: "gray",
    color: "#000000",
    buttonBackground: "#f0f0f0",
    containerBackground: "#fafafa", // Light theme container background
};

export const darkTheme = {
    background: "#121212",
    color: "#ffffff",
    buttonBackground: "#333333",
    containerBackground: "#333333", // Dark theme container background
};