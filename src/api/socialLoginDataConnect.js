import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const socialLoginDataConnect = () => {
    return {
        naverLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/naver`, {
                params: {
                    token
                },
                withCredentials: true
            })
        },
        kakaoLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/kakao`, {
                params: {
                    token
                },
                withCredentials: true
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

export {
    socialLoginDataConnect
}