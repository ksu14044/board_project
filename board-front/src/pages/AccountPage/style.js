import { css } from "@emotion/react";

export const container = css`
    padding: 0 4rem;
`;

export const title = css`
    font-size: 2rem;
    box-sizing: border-box;
    border-bottom: 0.1rem solid #dbdbdb;
    padding: 1rem 0 2rem;
    margin: 0;
    margin-bottom: 2rem;
`;

export const accountBox = css`
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
`;

export const profileImgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 3rem;

    & > img {
        width: 100%;
    }

    & > input[type="file"] {
        display: none;
    }
`;

export const nicknameTitle = css`
    font-size: 1.4rem;
    margin: 0 0 0.7rem;
    font-weight: 400;
    cursor: default;
`;

export const textInput = css`
    box-sizing: border-box;
    outline: none;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    padding: 1rem 1.5rem;
    width: 30rem;
`;

export const saveButton = css`
    margin-top: 0.5rem;
    box-sizing: border-box;
    background-color: #2383e2;
    border: none;
    border-radius: 0.5rem;
    color: #ffffff;
    padding: 0.7rem 2rem;
    cursor: pointer;

    &:active {
        background-color: #1b65af;
    }

    &:disabled {
        background-color: #eeeeee;
        cursor: default;
    }
`;

export const subTitle = css`
    font-size: 1.6rem;
    font-weight: 400;
    margin: 0;
`;

export const subContent = css`
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0.5rem 0;
    color: #777777;
`;

export const itemGroup = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const boardButton = css`
    box-sizing: border-box;
    border: 0.1rem solid #dbdbdb;
    border-radius: 0.5rem;
    padding: 0.7rem 2rem;
    background-color: #ffffff;
    cursor: pointer;

    &:hover {
        background-color: #fafafa;
    }

    &:active {
        background-color: #eeeeee;
    }
`;