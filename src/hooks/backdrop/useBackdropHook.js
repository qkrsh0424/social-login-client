import { useState } from "react";
import styled from 'styled-components';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`

`;

const useBackdropHook = () => {
    const [open, setOpen] = useState(false);

    const onActionOpen = () => {
        setOpen(true);
    }

    const onActionClose = () => {
        setOpen(false);
    }

    return {
        open,
        onActionOpen,
        onActionClose
    }
}

const BackdropComponent = ({open, onClose}) => {
    return (
        <Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
                open={open}
                onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export { useBackdropHook, BackdropComponent };
