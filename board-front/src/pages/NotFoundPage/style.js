import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 4rem;
    width: 100%;
    flex-grow: 1;
    
    & > h1 {
        color: #d02121;
        font-size: 2rem;
        cursor: default;
    }

    & > p {
        font-size: 1rem;
        cursor: default;
    }
`;