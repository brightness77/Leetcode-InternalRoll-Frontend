import {AppBar, Toolbar, Menu, Typography, Button, MenuItem, Divider} from "@mui/material";
import iconImg from "../static/img/icon_long.png";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalDimensions } from "../context/ConfigProvider";
import RunContext from "../context/RunContextProvider";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);



    const onCheckButtonClick = useCallback(() => {
        navigate('/check');
    }, [navigate]);

    const onRandomClick = useCallback(() => {
        navigate('/random-problem');
    }, [navigate]);

    const onChooseClick = useCallback(() => {
        navigate('/choose-problem');
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

    const onNameTextClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, [username, anchorEl]);

    const onNameMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [anchorEl]);

    const onMyProfileClick = useCallback(() => {
        
        onNameMenuClose();
    }, [anchorEl]);

    const onMyRecordClick = useCallback(() => {
        navigate('/my/record');
        onNameMenuClose();
    }, [anchorEl]);

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

                <Button variant = "outlined" color = "primary" onClick = {onChooseClick} sx = {styles.optionButton}>
                    <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                        做题
                    </Typography>
                </Button>

                <Button variant = "outlined" color = "primary" onClick = {onRandomClick} sx = {styles.optionButton}>
                    <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                        抽题
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

                {Boolean(username) && ( <div>
                    <Button variant = "text" color = "secondary" onClick = {onNameTextClick} sx = {styles.optionButton}>
                        <AccountCircleIcon fontSize="large" sx={{mr:'10px'}} />
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            {usernameText}
                        </Typography>
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={onNameMenuClose} MenuListProps={{'aria-labelledby': 'basic-button',}}>

                        <MenuItem onClick={onMyProfileClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Profile</Typography>
                        </MenuItem>

                        <MenuItem onClick={onMyRecordClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>刷题记录</Typography>
                        </MenuItem>

                        <Divider />

                        <MenuItem onClick={onLogOutClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>登出</Typography>
                        </MenuItem>

                    </Menu>
                </div> )}

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