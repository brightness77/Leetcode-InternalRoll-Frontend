import {AppBar, Toolbar, Menu, Typography, Button, MenuItem, Divider} from "@mui/material";
import iconImg from "../../static/img/icon_long.png";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalDimensions } from "../../context/ConfigProvider";
import RunContext from "../../context/RunContextProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
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


    //bar buttons
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

    const onAdminClick = useCallback(() => {
        if(role !== 'Admin'){
            navigate('/403');
        } else {
            navigate('/admin');
        }
    }, [navigate, role]);


    // username menu buttons
    const onNameTextClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }, [username, anchorEl]);

    const onNameMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [anchorEl]);

    const onMyProfileClick = useCallback(() => {
        navigate(`/profile/${username}`);
        onNameMenuClose();
    }, [anchorEl]);

    const onMyRecordClick = useCallback(() => {
        navigate('/my/record/All');
        onNameMenuClose();
    }, [anchorEl]);

    const onMyProficiencyClick = useCallback(() => {
        navigate('/my/proficiency');
        onNameMenuClose();
    }, [anchorEl]);

    const onMyTopicClick = useCallback(() => {
        navigate('/my/topic');
        onNameMenuClose();
    }, [anchorEl]);

    const onMyStudyListClick = useCallback(() => {
        navigate('/my/studylist');
        onNameMenuClose();
    }, [anchorEl]);

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
                        Problem
                    </Typography>
                </Button>

                <Button variant = "outlined" color = "primary" onClick = {onRandomClick} sx = {styles.optionButton}>
                    <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                        Random Problem
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
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>My Profile</Typography>
                        </MenuItem>

                        <MenuItem onClick={onMyRecordClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Problem Record</Typography>
                        </MenuItem>

                        <MenuItem onClick={onMyTopicClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Topics</Typography>
                        </MenuItem>

                        <MenuItem onClick={onMyProficiencyClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Proficiencies</Typography>
                        </MenuItem>

                        <MenuItem onClick={onMyStudyListClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Studylist</Typography>
                        </MenuItem>
                        
                        <Divider />

                        <MenuItem onClick={onLogOutClick}>
                            <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>Log Out</Typography>
                        </MenuItem>

                    </Menu>
                </div> )}

                {!Boolean(username) && (
                    <>
                    <Button variant = "text" color = "secondary" onClick = {onLogInClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            Log In
                        </Typography>
                    </Button>

                    <Button variant = "text" color = "secondary" onClick = {onSignUpClick} sx = {styles.optionButton}>
                        <Typography variant = "topbarButtom" component = "div" sx = {styles.titleText}>
                            Sign Up
                        </Typography>
                    </Button>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
}

export default TopBar;