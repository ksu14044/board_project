/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';

function JoinPage(props) {
    const handleJoinOnClick = () => {
        
    };

    return (
        <div css={s.layout}>
            <div>
                <header>
                    <h1 css={s.title1}>Think it. Make it.</h1>
                    <h1 css={s.title2}>Log in to your Board account</h1>
                </header>
                <main>
                    <div css={s.ouath2Group}>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiGoogle /></div>
                                <span css={s.oauth2Text}>Continue with Google</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiNaver /></div>
                                <span css={s.oauth2Text}>Continue with Naver</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button}>
                                <div css={s.oauth2Icon}><SiKakao /></div>
                                <span css={s.oauth2Text}>Continue with Kakao</span>
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <ValidInput type={'text'} placeholder={'Enter your username...'} errorMessage={"사용자 이름을 사용할 수 없습니다."} />
                        <ValidInput type={'text'} placeholder={'email address...'} />
                        <ValidInput type={'text'} placeholder={'password...'} />
                        <ValidInput type={'text'} placeholder={'password check...'} />
                        
                        <p css={s.accountMessage}>
                            계정이 있으신가요? <Link to={"/auth/login"}>로그인</Link>
                        </p>
                    </div>
                    <div css={s.groupBox}>
                        <button css={s.accountButton} onClick={handleJoinOnClick}>Join</button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default JoinPage;