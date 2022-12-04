import {AppBar, Toolbar, Menu, Typography, Button} from "@mui/material";
import iconImg from "../static/img/icon_long.png";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalDimensions } from "../context/ConfigProvider";
import RunContext from "../context/RunContextProvider";
import LeetcodeRequest from "../utils/LeetcodeRequest";


const styles = {
    iconImage : {
        width : '150pt',
        height : '30pt',
        marginRight : 20,
    },

    toolbarStyle : {
        height : globalDimensions.topbarHeight,
    },

    appbarStyle : {
        bgcolor : "#ebebeb",
    },

    middleEmpty : {
        flexGrow : 1,
    },

    titleText : {
        
    },

    optionButton : {
        ml : 1,
        mr : 1,
        height : "40px",
    },
}


function TopBar(): React.ReactElement {

    const navigate = useNavigate();

    const {username, role, setUsername, setRole} = useContext(RunContext);

    const onCheckButtonClick = useCallback(() => {
        navigate('/check');
    }, [navigate]);

    const onRandomClick = useCallback(() => {
        navigate('/random-problem');
    }, [navigate]);

    const onLogoClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const onLogInClick = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const onSignUpClick = useCallback(() => {
        navigate('/signup');
    }, [navigate]);

    const onNameTextClick = useCallback(() => {
        //WIP
    }, [navigate, username]);

    const onAdminClick = useCallback(() => {
        if(role !== 'Admin'){
            navigate('/403');
        } else {
            navigate('/admin');
        }
    }, [navigate, role]);

    const onLogOutClick = useCallback(() => {
        localStorage.clear();
        setUsername(null);
        setRole(null);

        //send log out request
        new LeetcodeRequest(`logout`, 'POST')
            .send();

        navigate('/login');
    }, [navigate, username, role]);

    const usernameText = username;

    return (
        <AppBar component = "nav" sx = {styles.appbarStyle}>
            <Toolbar sx = {styles.toolbarStyle}>

                <img src = {iconImg} alt = "Juan" style = {styles.iconImage} onClick = {onLogoClick}/>

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

                {role === 'Admin' && (
                    <>
                    <Button variant = "outlined" color = "primary" onClick = {onAdminClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            Admin
                        </Typography>
                    </Button>
                    </>
                )}

                <Typography variant = "h5" component = "div" sx = {styles.middleEmpty} />

                {Boolean(username) && (
                    <>
                    <Button variant = "text" color = "secondary" onClick = {onNameTextClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            {usernameText}
                        </Typography>
                    </Button>

                    <Button variant = "text" color = "secondary" onClick = {onLogOutClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            登出
                        </Typography>
                    </Button>
                    </>
                )}

                {!Boolean(username) && (
                    <>
                    <Button variant = "text" color = "secondary" onClick = {onLogInClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            登录
                        </Typography>
                    </Button>

                    <Button variant = "text" color = "secondary" onClick = {onSignUpClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            注册
                        </Typography>
                    </Button>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
}

export default TopBar;