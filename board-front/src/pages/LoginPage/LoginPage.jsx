/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useLoginMutation } from '../../mutations/authMutation';
import Swal from 'sweetalert2';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useuserMeQuery } from '../../queries/userQuery';

function LoginPage(props) {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    const loginUser = useuserMeQuery();

    const [ searchParams, setSearchParams ] = useSearchParams();
   
    const [ inputValue, setInputValue ] = useState({
        username: searchParams.get("username") || "",
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

    const handleLoginOnclick = async () => {
        try {
            const response = await loginMutation.mutateAsync(inputValue);
            const tokenName = response.data.name;
            const accessToken = response.data.token;
            setTokenLocalStorage(tokenName, accessToken);
            console.log(response);
            await Swal.fire({
                icon: "success",
                text: "로그인 성공",
                timer: 1000,
                position: "center",
                showConfirmButton: false,
            });
            loginUser.refetch();
            navigate("/");

        } catch (error) {
            console.log(error);
            Swal.fire({
                title: '로그인 실패',
                text: '사용자 정보를 다시 입력하세요.',
                icon: 'error',
                confirmButtonText: "확인",
                confirmButtonColor: "#e23323"
              })
        }
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
                        <button css={s.accountButton} onClick={handleLoginOnclick}>Login</button>
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