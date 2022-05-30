import './App.css';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LoginMain from './component/login/LoginMain';
import HomeMain from './component/home/HomeMain';

const AppContainer = styled.div`
    animation: fadein 1.5s;
    -moz-animation: fadein 1.5s; /* Firefox */
    -webkit-animation: fadein 1.5s; /* Safari and Chrome */
    -o-animation: fadein 1.5s; /* Opera */
`;

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/home" element={<HomeMain />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
