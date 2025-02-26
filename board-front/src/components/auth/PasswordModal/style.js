import { css } from "@emotion/react";

export const modalTop = css`
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    & > div {
        cursor: pointer;

        & > svg {
            fill: #bbbbbb;
            &:hover {
                fill: #999999;
            }
        }
    }
`;

export const header = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem 5rem;
`;

export const headerIcon = css`
    font-size: 3rem;
    & path {
        fill: #999999;
    }
`;

export const headerTitle = css`
    margin: 0.5rem;
    font-size: 1.6rem;
`;

export const headerMessage = css`
    text-align: center;
`;

export const inputGroup = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & > label {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    & > input {
        box-sizing: border-box;
        border: 0.1rem solid #dbdbdb;
        outline: none;
        font-size: 1.4rem;
        padding: 0.5rem;
        color: #666666;
        border-radius: 0.5rem;
    }
`;