import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { loginDataConnect } from '../../api/loginDataConnect';
import { checkEmailFormat, comparePassword } from '../../utils/regexUtils';

const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 30%;

    @media screen and (max-width: 992px) {
        width: 100%;
    }

    .form-wrapper {
        margin-bottom: 4%;
    }

    .title {
        width: 100%;
        font-weight: 500;
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 40px;
    }

    .flex-box {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
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
`;

const SignupMain = () => {
    const [userInfo, dispatchUserInfo] = useReducer(userInfoReducer, initialUserInfo);
    const navigate = useNavigate();
    const location = useLocation();

    const onChangeInputValue = (e) => {
        dispatchUserInfo({
            type: 'CHANGE_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        });
    }
    
    const _onSubmit_postSignup = async (e) => {
        e.preventDefault();

        if (!checkEmailFormat(userInfo.username)) {
            alert('이메일 형식을 확인해 주세요.');
            return;
        }
        if (!comparePassword(userInfo.password, userInfo.passwordCheck)) {
            alert('비밀번호와 비밀번호확인 값을 동일하게 입력해주세요.')
            return;
        }

        await __reqPostSignup();
    }

    const __reqPostSignup = async () => {
        await loginDataConnect().postSignup(userInfo)
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    alert('가입이 완료되었습니다. ^-^');
                    navigate('/');
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

    return (
        <Container>
            <form className='form-wrapper' onSubmit={(e) => _onSubmit_postSignup(e)}>
                <div className='title'>회원가입</div>
                <div className='flex-box'>
                    <div>
                        <label>이메일</label>
                        <input
                            type='text'
                            name='username'
                            value={userInfo.username || ''}
                            onChange={onChangeInputValue}
                            placeholder='example@piaar.com'
                            required
                        ></input>
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input
                            type='password'
                            name='password'
                            value={userInfo.password || ''}
                            onChange={onChangeInputValue}
                            placeholder='******'
                            required
                        ></input>
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input
                            type='password'
                            name='passwordCheck'
                            value={userInfo.passwordCheck || ''}
                            onChange={onChangeInputValue}
                            placeholder='******'
                            required
                        ></input>
                    </div>
                    <div>
                        <label>이름</label>
                        <input
                            type='text'
                            name='name'
                            value={userInfo.name || ''}
                            onChange={onChangeInputValue}
                            placeholder='홍길동'
                            required
                        ></input>
                    </div>
                    <div>
                        <button type='submit'>가입하기</button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default SignupMain;

const initialUserInfo = {
    username: '',
    password: '',
    name: ''
};

const userInfoReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialUserInfo;
        default: return { ...state }
    }
}