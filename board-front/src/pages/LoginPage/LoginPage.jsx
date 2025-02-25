/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useSearchParams } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useLoginMutation } from '../../mutations/authMutation';

function LoginPage(props) {
    const loginMutation = useLoginMutation();
    const [ searchParams, setSearchParams ] = useSearchParams();
   
    const [ inputValue, setInputValue ] = useState({
        username: searchParams.get("username"),
        password: "",
    });
    
    const handleInputOnChange = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value,
        })
    }
    const [ inputValidError, setInputValidError ] = useState({
        username: false,
        password: false,
    })

    const isErrors = () => {

        const isEmpty = Object.values(inputValue).map(value => !!value).includes(false);
        const isValid = Object.values(inputValidError).includes(true);
        console.log(isEmpty);
        console.log(isValid);
        return isEmpty || isValid;
    }

    const handleLoginOnClick = () => {
        if(isErrors()) {
            alert("회원 정보를 다시 입력하세요.")
            return;
        }

        loginMutation.mutateAsync({
            username: inputValue.username,
            password: inputValue.password,
        }).then(response => {
            console.log(response);
            
            alert("로그인 성공 제발")
        }).catch(error => {
            if(error.status == 400) {
                
                setInputValidError(prev => ({
                    ...prev,
                    username: true,
                }))
            }
            if(error.status == 500) {
                alert("사용자를 찾을 수 없습니다.")
            }
        })
    }



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
                       
                        <ValidInput type={"text"} placeholder={"Enter your username..."}
                            name={"username"}
                            value={inputValue.username}
                            regexp={/^[a-zA-Z0-9_-]{3,15}$/}
                            errorMessage= { "사용할 수 없는 사용자 이름입니다."}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                        <ValidInput type={"password"} placeholder={"password..."}
                            name={"password"}
                            value={inputValue.password}
                            regexp={/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,}$/}
                            errorMessage= { "사용할 수 없는 비밀번호입니다."}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    
                        <p css={s.accountMessage}>
                            계정이 없으신다면 지금 가입하세요. <Link to={"/auth/join"}>회원가입</Link>
                        </p>
                    </div>
                    <div css={s.groupBox}>
                        <button css={s.accountButton} onClick={handleLoginOnClick}>Login</button>
                    </div>
                </main>
                <footer>
                    <p css={s.footerAgreement}>
                        이메일을 사용하여 계정을 구분하고 다른 사용자들에게 게시글을 공유합니다.
                        계속 진행하려면 약관 및 개인정보 보호정책을 이해하고 동의한다는 것을 인정해야합니다.
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default LoginPage;