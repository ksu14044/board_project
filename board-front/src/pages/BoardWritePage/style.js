import { css } from "@emotion/react";

export const quillEditor = css`
    flex-grow: 1;
    box-sizing: border-box;
    height: 60rem;
    width: 100%;

    .ql-toolbar {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: none;
        border-bottom: 0.1rem solid #dbdbdb;
    }
    
    .ql-container {
        height: 85%;
        border: none;
    }
`;

export const quillTop = css`
    display: flex;

    & > input {
        box-sizing: border-box;
        flex-grow: 1;
        margin-right: 1rem;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 0 1.5rem;
        outline: none;
    }
`;

export const saveButton = css`
    box-sizing: border-box;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #fafafa;
    cursor: pointer;
    margin-right: 1rem;
    &:hover {
        background-color: #eeeeee;
    }
    &:active {
        background-color: #dddddd;
    }
`;
