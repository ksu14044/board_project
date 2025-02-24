/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useInputValid } from '../../hooks/validInputHook';
import { useJoinMutation } from '../../mutations/authMutation';

function JoinPage(props) {
    const navigate = useNavigate();

    const joinMutation = useJoinMutation();

    const [ inputValue, setInputValue ] = useState({
        username: "",
        email: "",
        password: "",
        passwordCheck: "",
    });

    const [ inputValidError, setInputValidError ] = useState({
        username: false,
        email: false,
        password: false,
        passwordCheck: false,
    });

    const handleInputOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const isErrors = () => {
        
        const isEmpty = Object.values(inputValue).map(value => !!value).includes(false);
        const isValid = Object.values(inputValidError).includes(true);

        return isEmpty || isValid;
    }

    const handlePasswordOnFocus = () => {
        setInputValue(prev => ({
            ...prev,
            password: "",
            passwordCheck: "",
        }))
    }

    const handleJoinOnClick = () => {
       if(isErrors()) {
            alert("가입 정보를 다시 확인해주세요.");
            return;
       }
       
    
       joinMutation.mutateAsync({
            username: inputValue.username,
            email: inputValue.email,
            password: inputValue.password,
        }).then(response => {
            console.log(response);
            alert("가입해 주셔서 감사합니다.")
            navigate(`/auth/login?username=${response.data.username}`)
        }).catch(error => {
            if(error.status === 400) {
                setInputValidError(prev => ({
                    ...prev,
                    username: true,
                }));
            }
        });

        
        
        
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
                            value={inputValue.username}
                            regexp={/^[a-zA-Z0-9_-]{3,15}$/}
                            errorMessage= { "사용할 수 없는 사용자 이름입니다."} 
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}/>
                        <ValidInput type={'text'} placeholder={'email address...'}
                            name={"email"}
                            value={inputValue.email}
                            regexp={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                            errorMessage= { "사용할 수 없는 이메일입니다."} 
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}/>
                        <ValidInput type={'password'} placeholder={'password...'}
                            name={"password"}
                            value={inputValue.password}
                            regexp={/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,}$/}
                            errorMessage= { "사용할 수 없는 비밀번호입니다."} 
                            onChange={handleInputOnChange}
                            onFocus={handlePasswordOnFocus}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}/>
                        <ValidInput type={'password'} placeholder={'password check...'}
                            name={"passwordCheck"}
                            value={inputValue.passwordCheck}
                            regexp={new RegExp(`^${inputValue.password}$`)}
                            errorMessage= { "비밀번호가 일치하지 않습니다."} 
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}/>    
                    
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