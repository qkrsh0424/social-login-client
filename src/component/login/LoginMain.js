import styled from 'styled-components';
import { useEffect, useReducer, useState } from 'react';
import { loginDataConnect } from '../../api/loginDataConnect';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import { socialLoginDataConnect } from '../../api/socialLoginDataConnect';

const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 40%;

    @media screen and (max-width: 992px) {
        width: 100%;
    }

    .title {
        width: 100%;
        font-weight: 500;
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 40px;
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
const FACEBOOK_AUTH_URL = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${FACEBOOK_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=facebook`}&state=hihi`;

// const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REST_API_SECRET_KEY = process.env.REACT_APP_KAKAO_REST_API_SECRET_KEY;
// const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
const GOOGLE_REST_API_SECRET_KEY = process.env.REACT_APP_GOOGLE_REST_API_SECRET_KEY;
// const FACEBOOK_REST_API_KEY = process.env.REACT_APP_FACEBOOK_REST_API_KEY;
const FACEBOOK_REST_API_SECRET_KEY = process.env.REACT_APP_FACEBOOK_REST_API_SECRET_KEY;

const LoginMain = () => {
    const [loginData, dispatchLoginData] = useReducer(loginDataReducer, initialLoginDataReducer);
    const navigate = useNavigate();

    const location = useLocation();
    // const navigate = useNavigate();
    const query = qs.parse(location.search);

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

    useEffect(() => {
        async function naverAuth() {
            const hash = location.hash;
            if(!hash) return;
            if(!query || !query.platform) return;
            if(query.platform !== 'naver') return;
            
            const token = location.hash.split('=')[1].split('&')[0];
            if(!token) return;

            await __reqNaverLogin(token);

            // hash값 제거
            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }),
            {
                replace: true
            })
        }

        async function kakaoAuth() {
            if(!query || !query.platform || !query.code) return;
            if(query.platform !== 'kakao') return;
            const auth_token = query.code;
            
            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }),{
                replace: true
            });

            const body = qs.stringify({
                grant_type: "authorization_code",
                client_id: KAKAO_REST_API_KEY,
                redirect_uri: "http://localhost:3000/home?platform=kakao",
                code: auth_token,
                client_secret: KAKAO_REST_API_SECRET_KEY
            });

            // 인증토큰발급
            window.Kakao.init(KAKAO_REST_API_KEY);
            await __reqKakaoAuth(body);
            
            // 카카오 로그인
            const ac_token = window.Kakao.Auth.getAccessToken();
            await __reqKakaoLogin(ac_token);
            return;
        }

        async function googleAuth() {
            if (!query || !query.platform || !query.code) return;
            if (query.platform !== 'google') return;
            const auth_token = query.code;

            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }), {
                replace: true
            });

            const params = qs.stringify({
                grant_type: "authorization_code",
                client_id: GOOGLE_REST_API_KEY,
                redirect_uri: "http://localhost:3000/home?platform=google",
                code: auth_token,
                client_secret: GOOGLE_REST_API_SECRET_KEY,
            });

            let ac_token = await __reqGoogleAuth(params);
            await __reqGoogleLogin(ac_token);
        }

        async function facebookAuth() {
            if (!query || !query.platform || !query.code) return;
            if (query.platform !== 'facebook') return;
            const auth_token = query.code;

            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }), {
                replace: true
            });

            const params = qs.stringify({
                client_id: FACEBOOK_REST_API_KEY,
                redirect_uri: "http://localhost:3000/home?platform=facebook",
                code: auth_token,
                client_secret: FACEBOOK_REST_API_SECRET_KEY,
            });

            let ac_token = await __reqFacebookAuth(params);
            await __reqFacebookLogin(ac_token);
        }

        naverAuth();
        kakaoAuth();
        googleAuth();
        facebookAuth();
    }, []);

    const _onSubmit_postLogin = async (e) => {
        e.preventDefault();

        await __reqPostLogin();
    }

    // 피아르 로그인
    const __reqPostLogin = async () => {
        await loginDataConnect().postLogin(loginData)
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    navigate('/');
                }
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const onChangeLoginData = (e) => {
        dispatchLoginData({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }

    // 네이버 로그인
    const __reqNaverLogin = async (token) => {
        await socialLoginDataConnect().naverLogin(token)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    // 카카오 인증토큰 발급
    const __reqKakaoAuth = async (params) => {
        await socialLoginDataConnect().kakaoAuth(params)
            .then(res => {
                window.Kakao.Auth.setAccessToken(res.data.access_token);
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    // 카카오 로그인
    const __reqKakaoLogin = async (token) => {
        await socialLoginDataConnect().kakaoLogin(token)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    // 카카오 인증토큰 발급
    const __reqGoogleAuth = async (params) => {
        return await socialLoginDataConnect().googleAuth(params)
            .then(res => {
                return res.data.access_token;
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const __reqGoogleLogin = async (token) => {
        await socialLoginDataConnect().googleLogin(token)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const __reqFacebookAuth = async (params) => {
        return await socialLoginDataConnect().facebookAuth(params)
            .then(res => {
                return res.data.access_token;
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    const __reqFacebookLogin = async (token) => {
        await socialLoginDataConnect().facebookLogin(token)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                let res = err?.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }
                alert(res?.data?.memo);
            })
    }

    return (
        <Container>
            <form className='form-wrapper' onSubmit={(e) => _onSubmit_postLogin(e)}>
                <div className='title'>Login</div>
                <div className='flex-box'>
                    <div>
                        <input type='text' name='username' onChange={(e) => onChangeLoginData(e)} value={loginData?.username || ''}></input>
                    </div>
                    <div>
                        <input type='password' name='password' onChange={(e) => onChangeLoginData(e)} value={loginData?.password || ''}></input>
                    </div>
                    <div>
                        <button type='submit'>로그인</button>
                    </div>
                </div>
            </form>
            <div className='service-box'>
                <a href='/signup' className='signup-button'>회원가입</a>
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
        </Container>
    )
}

export default LoginMain;

const initialLoginDataReducer = null;

const loginDataReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialLoginDataReducer;
        default: return { ...state }
    }
}