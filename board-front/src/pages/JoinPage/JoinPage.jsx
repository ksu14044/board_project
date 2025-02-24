/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useInputValid } from '../../hooks/validInputHook';
import { useJoinMutation } from '../../mutations/authMutation';

function JoinPage(props) {

    const joinMutation = useJoinMutation();

    const usernameInputData = useInputValid({
        regexp: /^[a-zA-Z0-9_-]{3,15}$/,
        errorText: "사용할 수 없는 사용자 이름입니다."
    });

    const emailInputData = useInputValid({
        regexp: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorText: "사용할 수 없는 이메일 형식입니다."
    });

    const passwordInputData = useInputValid({
        regexp: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
        errorText: "사용할 수 없는 비밀번호입니다."
    });

    const passwordCheckInputData = useInputValid({
        regexp: new RegExp(`^${passwordInputData.value}$`),
        errorText: "비밀번호가 일치하지 않습니다."
    });

    const isErrors = () => {
        const errors = [
            !usernameInputData.value,
            !emailInputData.value,
            !passwordInputData.value,
            !passwordCheckInputData.value,
            !!usernameInputData.errorMessage,
            !!emailInputData.errorMessage,
            !!passwordInputData.errorMessage,
            !!passwordCheckInputData.errorMessage,
        ];

        return errors.includes(true);
    }

    const handleJoinOnClick = () => {
       if(isErrors()) {
            alert("가입 정보를 다시 확인해주세요.");
            return;
       }
       
    
       joinMutation.mutate({
            username: usernameInputData.value,
            email: emailInputData.value,
            password: passwordInputData.value
        });

        if(joinMutation.isError) {
            console.log(joinMutation.error);
        }
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
                        <ValidInput type={'text'} placeholder={'Enter your username...'}
                        name={"username"}
                        value={usernameInputData.value}
                        onChange={usernameInputData.handleOnChange}
                        onBlur={usernameInputData.handleOnBlur}
                        errorMessage={usernameInputData.errorMessage} />

                        <ValidInput type={'text'} placeholder={'email address...'} 
                        name={"email"}
                        value={emailInputData.value}
                        onChange={emailInputData.handleOnChange}
                        onBlur={emailInputData.handleOnBlur}
                        errorMessage={emailInputData.errorMessage}
                        />

                        <ValidInput type={'password'} placeholder={'password...'} 
                        name={"password"}
                        value={passwordInputData.value}
                        onChange={passwordInputData.handleOnChange}
                        onBlur={passwordInputData.handleOnBlur}
                        errorMessage={passwordInputData.errorMessage}
                        />

                        <ValidInput type={'password'} placeholder={'password check...'}
                        name={"passwordCheck"}
                        value={passwordCheckInputData.value}
                        onChange={passwordCheckInputData.handleOnChange}
                        onBlur={passwordCheckInputData.handleOnBlur}
                        errorMessage={passwordCheckInputData.errorMessage} />
                    
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