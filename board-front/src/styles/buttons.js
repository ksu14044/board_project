import { css } from "@emotion/react";

export const basicbutton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: none;
    border-radius: 0.7rem;
    padding: 0.6rem;
    background-color: transparent;
    
    font-size: 2.5rem;
    cursor: pointer;

    &:hover {
        background-color: #00000011;
    }

    &:active {
        background-color: #00000022;
    }
`;

export const emptyButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    padding: 0.6rem 1.2rem;
    background-color: transparent;
    font-size: 1.6rem;
    font-weight: 600;

`;