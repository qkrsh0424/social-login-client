import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const socialLoginDataConnect = () =>{
    return{
        naverLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/naver`, {
                params: {
                    token
                },
                withCredentials: true
            })
        },
        kakaoAuth: async function (params) {
            return await axios.post(`https://kauth.kakao.com/oauth/token`, params);
        },
        kakaoLogin: async function(token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/kakao`, {
                params: {
                    token
                },
                withCredentials: true
            })
        },
        googleAuth: async function (params) {
            return await axios.post(`https://oauth2.googleapis.com/token?` + params, {
                withCredentials:true
            })
        },
        googleLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/google`, {
                params: {
                    token
                },
                withCredentials: true
            })
        },
        facebookAuth: async function (params) {
            return await axios.get(`https://graph.facebook.com/v14.0/oauth/access_token?` + params, {
                // withCredentials: true
            })
        },
        facebookLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/facebook`, {
                params: {
                    token
                },
                withCredentials: true
            })
        }
    }
}

export{
    socialLoginDataConnect
}