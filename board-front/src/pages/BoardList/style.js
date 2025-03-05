import { css } from "@emotion/react";

export const container = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

`;

export const header = css`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 0.1rem solid #dbdbdb;
    align-items: center;
`;

export const title = css`
    display: flex;

    & > h2 {
        margin: 0.5rem 0;
        font-size: 2rem;
    }
`;

export const searchItems = css`
    display: flex;

`;

export const searchInputBox = css`
    position: relative;
    margin-left: 1rem;
    height: 3rem;

    & > input {
        height: 100%;
        box-sizing: border-box;
        border: 0.1rem solid #dbdbdb;
        width: 20rem;
        padding: 0 5rem 0 1rem;
        border-radius: 0.4rem;
        outline-color: #2684ff;
        font-size: 1.3rem;
    }

    & > button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0rem;
    }
`;

export const main = css`
    padding: 1rem;

`;

export const boardListContainer = css`
    padding: 0;
    margin: 0;
    list-style-type: none;

    & > li:nth-of-type(1) {
        background-color: #fafafa;
    }

    & > li {
        display: flex;
        height: 3rem;
        align-items: center;
        cursor: default;

        &:not(:nth-of-type(1)):hover {
            border-radius: 0.7rem;
            background-color: #eeeeee;
            cursor: pointer;
        }

        & > div{
            font-size: 1.4rem;
            box-sizing: border-box;
            
        }

        & > div:not(& > div:nth-last-of-type(1)){
            margin-right: 1rem;
            border-right: 0.1rem solid #dbdbdb;
        }
        
        & > div:nth-of-type(1) {
            width: 8rem;
            padding-left: 1rem;
        }
        & > div:nth-of-type(2) {
            flex-grow: 1;
            display: block;
            width: 13.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 1rem;
        }
        & > div:nth-of-type(3) {
            width: 15rem;
        }
        & > div:nth-of-type(4) {
            width: 5rem;
        }
        & > div:nth-of-type(5) {
            width: 10rem;
        }
    }
`;

export const boardWriter = css`
    display: flex;
`;

export const boardCounts = css`
    display: flex;

    & > span {
        position: relative;
        margin-right: 1rem;
        cursor: default;

        &:hover > span {
            display: block;
        }

        & > span {
            position: absolute;
            display: none;
            transform: translateX(-50%);
            left: 50%;
            border-radius: 0.5rem;
            background-color: #fafafa;
            padding: 0.3rem 0.5rem;
            font-size: 1.4rem;
            
        }
    }
`;

export const footer = css`
    padding: 1rem;
`;
