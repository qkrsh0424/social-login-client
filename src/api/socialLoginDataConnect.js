import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const socialLoginDataConnect = () => {
    return {
        naverLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/naver`, {
                params: {
                    token
                }
            })
        },
        kakaoLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/kakao`, {
                params: {
                    token
                }
            })
        },
        googleLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/google`, {
                params: {
                    token
                }
            })
        },
        facebookLogin: async function (token) {
            return await axios.get(`${API_SERVER_ADDRESS}/api/v1/social-login/facebook`, {
                params: {
                    token
                }
            })
        }
    }
}

export {
    socialLoginDataConnect
}