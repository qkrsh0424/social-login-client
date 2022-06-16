import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import { socialLoginDataConnect } from '../../api/socialLoginDataConnect';

const Container = styled.div`
    padding-top: 20px;

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
        justify-content: center;
        align-items: center;
        display: flex;
        column-gap: 12px;
        margin: 0 auto;
    }

    .social-button {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
    }
`;

const REDIRECT_URI = "http://localhost:3000/home";
const AUTH_API_STATE=process.env.REACT_APP_AUTH_API_STATE;

/**
 * NAVER Social Login
 * 
 * Required Variable : response_type, client_id, redirect_uri, state
 */
const NAVER_REST_API_KEY = process.env.REACT_APP_NAVER_REST_API_KEY;
const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize";
const NAVER_AUTH_PARAMS = `?client_id=${NAVER_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=naver`}&response_type=code&state=${AUTH_API_STATE}`;

/**
 * KAKAO Social Login
 * 
 * Required Variable : client_id, redirect_uri, response_type
 */
const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_AUTH_PARAMS = `?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=kakao`}&response_type=code`;

/**
 * GOOGLE Social Login
 * 
 * Required Variable : client_id, redirect_uri, response_type, scope
 * Recommended Variable : access_type, state
 */
const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
const GOOGLE_AUTH_SCOPE = "email profile";
const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_PARAMS = `?client_id=${GOOGLE_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=google`}&response_type=code&scope=${GOOGLE_AUTH_SCOPE}&access_type=offline&state=${AUTH_API_STATE}`;

/**
 * FACEBOOK Social Login
 * 
 * Requried Variable : client_id, redirect_uri, state
 */
const FACEBOOK_REST_API_KEY = process.env.REACT_APP_FACEBOOK_REST_API_KEY;
const FACEBOOK_AUTH_URL = "https://www.facebook.com/v14.0/dialog/oauth";
const FACEBOOK_AUTH_PARAMS = `?client_id=${FACEBOOK_REST_API_KEY}&redirect_uri=${REDIRECT_URI + `?platform=facebook`}&state=${AUTH_API_STATE}`;

const SocialLoginComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);

    useEffect(() => {
        async function naverAuth() {
            const authToken = query.code;

            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }),{
                replace: true
            });

            props.onActionOpenBackdrop();
            await _onAction_NaverLogin(authToken);
            props.onActionCloseBackdrop();
        }

        async function kakaoAuth() {
            const authToken = query.code;
            
            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }), {
                replace: true
            });

            props.onActionOpenBackdrop();
            await _onAction_KakaoLogin(authToken);
            props.onActionCloseBackdrop();
        }

        async function googleAuth() {
            const authToken = query.code;

            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }), {
                replace: true
            });

            props.onActionOpenBackdrop();
            await _onAction_GoogleLogin(authToken);
            props.onActionCloseBackdrop();
        }

        async function facebookAuth() {
            const authToken = query.code;

            navigate(qs.stringifyUrl({
                url: location.pathname,
                query: ''
            }), {
                replace: true
            });

            props.onActionOpenBackdrop();
            await _onAction_FacebookLogin(authToken);
            props.onActionCloseBackdrop();
        }

        if(!query || !query.platform || !query.code) return;
        switch(query.platform) {
            case 'naver':
                naverAuth();
                break;
            case 'kakao':
                kakaoAuth();
                break;
            case 'google':
                googleAuth();
                break;
            case 'facebook':
                facebookAuth();
                break;
            default:
                return;
        }
    }, []);

    // 네이버 로그인
    const __reqNaverLogin = async (token) => {
        await socialLoginDataConnect().naverLogin(token)
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    navigate('/home');
                }
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
                if (res?.status === 200 && res?.data?.message === 'success') {
                    navigate('/home');
                }
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

    // 구글 로그인
    const __reqGoogleLogin = async (token) => {
        await socialLoginDataConnect().googleLogin(token)
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    navigate('/home');
                }
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

    // 페이스북 로그인
    const __reqFacebookLogin = async (token) => {
        await socialLoginDataConnect().facebookLogin(token)
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    navigate('/home');
                }
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

    const _onAction_NaverLogin = async (token) => {
        await __reqNaverLogin(token);
    }

    const _onAction_KakaoLogin = async (token) => {
        await __reqKakaoLogin(token);
    }

    const _onAction_GoogleLogin = async (token) => {
        await __reqGoogleLogin(token);
    }

    const _onAction_FacebookLogin = async (token) => {
        await __reqFacebookLogin(token);
    }

    return (
        <Container>
            <div className='social-login-box'>
                <hr />
                <div className='social-login-title'>간편로그인</div>
                <div className='social-login-wrapper'>
                    <div className='social-button'>
                        <a href={NAVER_AUTH_URL + NAVER_AUTH_PARAMS} target='_blank'><img src="/assets/naver_login.png" width='40' /></a>
                    </div>
                    <div className='social-button'>
                        <a href={KAKAO_AUTH_URL + KAKAO_AUTH_PARAMS} target='_blank'><img src="/assets/kakao_login.png" width='40' /></a>
                    </div>
                    <div className='social-button'>
                        <a href={GOOGLE_AUTH_URL + GOOGLE_AUTH_PARAMS} target='_blank'><img src="/assets/google_login.png" width='40' /></a>
                    </div>
                    <div className='social-button'>
                        <a href={FACEBOOK_AUTH_URL + FACEBOOK_AUTH_PARAMS} target='_blank'><img src="/assets/facebook_login.png" width='40' /></a>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SocialLoginComponent;