import {AppBar, Toolbar, Menu, Typography, Button} from "@mui/material";
import iconImg from "../static/logo/icon.png";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


const styles = {
    iconImage : {
        width : 55,
        height : 55,
        marginRight : 20,
    },

    toolbarStyle : {
        height : 70,
    },

    titleText : {
        flexGrow : 1,
    },

    optionButton : {
        ml : 1,
        mr : 1,
    },
}


function TopBar(): React.ReactElement {

    const navigate = useNavigate();

    const onCheckButtonClick = useCallback(() => {
        navigate('/check');
    }, [navigate]);

    const onRandomClick = useCallback(() => {
        navigate('/random-problem');
    }, [navigate]);

    const onLogoClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <AppBar component = "nav" sx = {{bgcolor : "#f0f0f0"}}>
            <Toolbar sx = {styles.toolbarStyle}>
                <img src = {iconImg} alt = "Juan" style = {styles.iconImage} onClick = {onLogoClick}/>
                <Typography variant = "h5" component = "div" sx = {styles.titleText}>
                    这肯定不是一个刷题网站
                </Typography>
                <Button variant = "outlined" color = "primary" onClick = {onRandomClick} sx = {styles.optionButton}>
                    <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                        题否
                    </Typography>
                </Button>
                <Button variant = "outlined" color = "primary" onClick = {onCheckButtonClick} sx = {styles.optionButton}>
                    <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                        看看你的
                    </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;