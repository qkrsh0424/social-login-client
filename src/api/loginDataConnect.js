import axios from "axios"

const API_SERVER_ADDRESS = process.env.REACT_APP_API_HOST;

const loginDataConnect = () =>{
    return{
        postLogin: async function (loginData) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/login`, loginData, {
                withCredentials: true
            })
        },
        postSignup: async function (userInfo) {
            return await axios.post(`${API_SERVER_ADDRESS}/api/v1/signup`, userInfo, {
                withCredentials: true
            })
        }
    }
}

export{
    loginDataConnect
}