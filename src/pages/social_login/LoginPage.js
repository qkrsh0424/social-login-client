import styled from 'styled-components';
import LoginComponent from '../../component/login/LoginMain';

const Container = styled.div`

`;

const socialLoginPage = () => {
    return (
        <Container>
            <LoginComponent></LoginComponent>
        </Container>
    )
}

export default socialLoginPage;