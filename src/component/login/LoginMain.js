import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
    .login-box {
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        width: 40%;

        .title {
            width: 100%;
            font-weight: 500;
            font-size: 1.4rem;
            text-align: center;
            margin-bottom: 40px;
        }

        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }

    .form-wrapper {
        margin-bottom: 4%;
    }

    .flex-box {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    input {
        width: 100%;
        padding: 12px;
        border-width: 0;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-sizing: border-box;
    }

    button {
        width: 100%;
        padding: 12px;
        background: #000;
        border:1px solid #000;
        border-radius: 5px;
        color:white;
        font-weight: 600;
        font-size: 1rem;
    }

    .social-login-box {
        text-align: center;
    }

    .social-login-title {
        position: relative;
        padding: 10px;
        top: -30px;
        display: inline-block;
        background-color: white;
    }

    .social-login-wrapper {
        width: 50%;
        justify-content: center;
        display: flex;
        column-gap: 12px;
        margin: 0 auto;
    }

    .naver-login-box {
        :hover{
            cursor: pointer;
        }
    }

    .social-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border: 0;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
        cursor: pointer;
    }

    .service-box{
        text-align: right;
        margin-bottom: 5%;
    }

    .signup-button {
        font-size: 14px;
        color: #000;
    }
`;

const REDIRECT_URI = "http://localhost:3000/home";

const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_NEEDS_AGREMENTS = "account_email,profile_nickname";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=kakao`}&response_type=code&scope=${KAKAO_NEEDS_AGREMENTS}`;

const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
const GOOGLE_NEEDS_AGREMENTS = "email profile";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=google`}&response_type=code&scope=${GOOGLE_NEEDS_AGREMENTS}&access_type=offline`;

const FACEBOOK_REST_API_KEY = process.env.REACT_APP_FACEBOOK_REST_API_KEY;
const FACEBOOK_AUTH_URL = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${FACEBOOK_REST_API_KEY}&redirect_uri=http://localhost:3000/home?platform=facebook&state=hihi`;

const LoginMain = () => {

    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: NAVER_REST_API_KEY,
            callbackUrl: "http://localhost:3000/home?platform=naver",
            isPopup: true,
            loginButton: {color:"green", type:1, height:40},
            callbackHandle: true
        });
        naverLogin.init();
    }, []);

    return(
        <Container>
            <div className='login-box'>
                <form className='form-wrapper'>
                    <div className='title'>Login</div>
                    <div className='flex-box'>
                        <div>
                            <input type='text'></input>
                        </div>
                        <div>
                            <input type='password'></input>
                        </div>
                        <div>
                            <button type='submit'>로그인</button>
                        </div>
                    </div>
                </form>
                <div className='service-box'>
                    <a href='#' className='signup-button'>회원가입</a>
                </div>
                <div className='social-login-box'>
                    <hr />
                    <div className='social-login-title'>간편로그인</div>
                    <div className='social-login-wrapper'>
                        <div className='social-button'>
                            <div id='naverIdLogin' className='naver-login-box'>
                            </div>
                        </div>
                        <div className='social-button'>
                            <a href={KAKAO_AUTH_URL} target='_brank'><img src="/assets/kakao_login.png" width='40' /></a>
                        </div>
                        <div className='social-button'>
                            <a className='login-logo' href={GOOGLE_AUTH_URL} target='_brank'><img src="/assets/google_login.png" width='40' /></a>
                        </div>
                        <div className='social-button'>
                            <a className='login-logo' href={FACEBOOK_AUTH_URL} target='_brank'><img src="/assets/facebook_login.png" width='40' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default LoginMain;