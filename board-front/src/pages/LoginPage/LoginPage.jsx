/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';
import { SiGoogle, SiKakao, SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import { useLoginMutation, useSendAuthMailMutation } from '../../mutations/authMutation';
import Swal from 'sweetalert2';
import { setTokenLocalStorage } from '../../configs/axiosConfig';
import { useUserMeQuery } from '../../queries/userQuery';
import { useQueryClient } from '@tanstack/react-query';


function LoginPage(props) {
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();
    // const loginUser = useUserMeQuery();
    const queryClient = useQueryClient();
    const sendAuthMailMutation = useSendAuthMailMutation();

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

    const handleOAuth2LoginOnClick = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`
    }

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
            await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});
            navigate("/");

        } catch (error) {
            console.log(error.response.status);
            if(error.response.status === 401){
                const result = await Swal.fire({
                    title: '계정 활성화',
                    text: '계정을 활성화 하려면 등록하신 메일을 통해 계정 인증을 완료하세요. 다시 메일 전송이 필요하면 전송버튼을 클릭하세요.',
                    confirmButtonText: "전송",
                    confirmButtonColor: "#2389e2",
                    showCancelButton: true,
                    cancelButtonText: '취소',
                    cancelButtonColor: "#999999",
                  });
                  if(result.isConfirmed) {
                    await sendAuthMailMutation.mutateAsync(inputValue.username);
                    await Swal.fire({
                        title: '메일 전송 완료',
                        confirmButtonText: "확인",
                        confirmButtonColor: "#2389e2"
                      });
                  }
            } else {
                await Swal.fire({
                    title: '로그인 실패',
                    text: '사용자 정보를 다시 입력하세요.',
                    confirmButtonText: "확인",
                    confirmButtonColor: "#e23323"
                  })
            } 
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
                            <button css={s.oauth2Button} onClick={() => handleOAuth2LoginOnClick("google")}>
                                <div css={s.oauth2Icon}><SiGoogle /></div>
                                <span css={s.oauth2Text}>Continue with Google</span>
                            </button>
                        </div>
                        <div css={s.groupBox}>
                            <button css={s.oauth2Button} onClick={() => handleOAuth2LoginOnClick("naver")}>
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