import styled from 'styled-components';

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
`;

const HomeMain = () => {
    return(
        <Container>
            <div className='title'>
                Home화면^^
            </div>
        </Container>
    )
}

export default HomeMain;