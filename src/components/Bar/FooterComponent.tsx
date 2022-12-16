import {AppBar, Toolbar, Menu, Typography, Button, MenuItem, Divider, Container, BottomNavigation} from "@mui/material";
import {useEffect} from "react";


const styles = {

    footerContainerStyle : {
        flexGrow : 0,
        backgroundColor : '#c0c0c0',
        minHeight : '60px',
        width : '100%',
        display : 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        p:'15px',
        mt:'60px',
    },

};


function FooterComponent(): React.ReactElement {

    useEffect(() => {

    }, []);
    
    return (
        <Container component="footer" maxWidth = {false} disableGutters = {true} sx={styles.footerContainerStyle}>
            <Typography variant="body2" sx={{color:'#606060'}}>{`Copyright © ${new Date().getFullYear()} RollCode`}</Typography>
        </Container>
    );
};

export default FooterComponent;
