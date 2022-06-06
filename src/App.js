import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LoginMain from './component/login/LoginMain';
import HomeMain from './component/home/HomeMain';
import SignupMain from './component/signup/SignupMain';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from './redux/action/user';
import { useEffect } from 'react';
import { userDataConnect } from './api/userDataConnect';

const AppContainer = styled.div`
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s; /* Firefox */
    -webkit-animation: fadein 1.5s; /* Safari and Chrome */
    -o-animation: fadein 1.5s; /* Opera */
`;

function App() {
  const userRdx = useSelector(state => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    async function userCheckInit() {
      await userDataConnect().loginCheck()
        .then(res => {
          if (res.status == 200 && res.data.message == 'loged') {
            dispatch(setUserInfo(res.data.data))
          }
        })
        .catch(err => {
          console.log(err.response);
        })
    }
    userCheckInit();
  }, [location])

  return (
    <AppContainer>
      {userRdx.userInfo ? (
        <Routes>
          <Route path="*" element={<HomeMain />} />
          <Route path="/home" element={<HomeMain />} />
          <Route path="/signup" element={<SignupMain />} />
        </Routes>
      ) :
      (
        <Routes>
          <Route path="*" element={<LoginMain />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/signup" element={<SignupMain />} />
        </Routes>
      )
      }
    </AppContainer>
  );
}

export default App;
