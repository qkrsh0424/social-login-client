import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { csrfDataConnect } from '../../api/csrfDataConnect';
import { loginDataConnect } from '../../api/loginDataConnect';
import { setUserInfo } from '../../redux/action/user';

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

    .service-box{
        text-align: center;
    }

    .logout-btn {
        font-size: 14px;
        color: #000;
    }
`;

const HomeMain = () => {
    const dispatch = useDispatch();

    const __reqLogout = async () => {
        await csrfDataConnect().getCsrfToken();
        await loginDataConnect().postLogout()
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    dispatch(setUserInfo(null));
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

    const onActionLogout = async () => {
        await __reqLogout();
    }

    return(
        <Container>
            <div className='title'>Home화면^^</div>
            <div className='service-box'>
                <button className='logout-btn' type='button' onClick={onActionLogout}>로그아웃</button>
            </div>
        </Container>
    )
}

export default HomeMain;