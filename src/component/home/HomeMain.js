import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { socialLoginDataConnect } from '../../api/socialLoginDataConnect';
import qs from 'query-string';

const Container = styled.div`

`;

const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const KAKAO_REST_API_SECRET_KEY = process.env.REACT_APP_KAKAO_REST_API_SECRET_KEY;
const GOOGLE_REST_API_KEY = process.env.REACT_APP_GOOGLE_REST_API_KEY;
const GOOGLE_REST_API_SECRET_KEY = process.env.REACT_APP_GOOGLE_REST_API_SECRET_KEY;
const FACEBOOK_REST_API_KEY = process.env.REACT_APP_FACEBOOK_REST_API_KEY;
const FACEBOOK_REST_API_SECRET_KEY = process.env.REACT_APP_FACEBOOK_REST_API_SECRET_KEY;

const HomeMain = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = qs.parse(location.search);

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
    

    // 네이버 로그인
    const __reqNaverLogin = async (token) => {
        await socialLoginDataConnect().naverLogin(token)
            .then(res => {
                // alert('로그인');
            })
            .catch(err => {
                let res = err.response;
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
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    // 카카오 로그인
    const __reqKakaoLogin = async (token) => {
        await socialLoginDataConnect().kakaoLogin(token)
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                let res = err.response;
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
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqGoogleLogin = async (token) => {
        await socialLoginDataConnect().googleLogin(token)
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqFacebookAuth = async (params) => {
        return await socialLoginDataConnect().facebookAuth(params)
            .then(res => {
                return res.data.access_token;
            })
            .catch(err => {
                console.log(err);
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    const __reqFacebookLogin = async (token) => {
        await socialLoginDataConnect().facebookLogin(token)
            .then(res => {
                // console.log(res);
            })
            .catch(err => {
                let res = err.response;
                alert(res?.data?.memo);
            })
    }

    return(
        <Container>
            <div>
                Home화면^^
            </div>
        </Container>
    )
}

export default HomeMain;