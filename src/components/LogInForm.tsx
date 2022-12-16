import { Alert, Box, Button, Checkbox, CircularProgress, Container, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { globalStyles } from "../context/ConfigProvider";
import useAuthenticationForm from "../hook/useAuthenticationForm";
import loginImg from "../static/img/four_1.jpeg"
import LeetcodeFormRequest from "../utils/LeetcodeFormRequest";
import LeetcodeRequest from "../utils/LeetcodeRequest";



const styles = {

    loginImgStyle : {
        width : '100%',
    },

    textFieldStyle : {
        
    },
}


function LogInForm() : React.ReactElement {

    //input fields
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [rememberMeInput, setRememberMeInput] = useState(false);

    //input field handlers
    const onUsernameInputChange = useCallback((e : any) => {
        setUsernameInput(e.target.value);
    }, []);

    const onPasswordInputChange = useCallback((e : any) => {
        setPasswordInput(e.target.value);
    }, []);

    const onRememberMeInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMeInput(event.target.checked);
    }, []);


    //importing hooks
    const {
        isLogInLoading,
        logInErrorMessage,
        onLogInRequestStart,
        onLogInErrorMsgClose,
        onLogInRequestFailure,
        onLogInRequestError,
        onLogInRequestSuccess,
    } = useAuthenticationForm(() => {
        return {
            username : usernameInput,
        };
    });



    
    //check role
    const onLoginSuccess = useCallback(() => {

        new LeetcodeRequest(`users/currentUser`, 'GET')
            .onStart(onLogInRequestStart)
            .onSuccess(onLogInRequestSuccess)
            .onFailure(onLogInRequestFailure)
            .onError(onLogInRequestError)
            .send();

    }, [onLogInRequestFailure, onLogInRequestError, onLogInRequestSuccess, usernameInput]);


    //submit login info
    const onSubmit = useCallback((e : any) => {
        new LeetcodeFormRequest(`login?username=${usernameInput}&password=${passwordInput}`, "POST")
            .onStart(onLogInRequestStart)
            .onSuccess(onLoginSuccess)
            .onFailure(onLogInRequestFailure)
            .onError(onLogInRequestError)
            .send();
        e.preventDefault();
    }, [onLogInRequestFailure, onLogInRequestError, onLogInRequestSuccess, usernameInput, passwordInput]);



    return(
        <Container component="main" maxWidth = "xs" sx={globalStyles.component.mainContainer.parentWithGap}>
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withoutMargin}>
                <Box component='img' src={loginImg} alt="Welcome" style={styles.loginImgStyle} />

                <Box sx={{
                    mt: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p:'20px',
                }}>
                    <Typography variant="h4">
                        欢迎回到内卷中心!
                    </Typography>

                    {isLogInLoading && <CircularProgress color = "primary" variant='indeterminate' sx={{margin:1, }} />}
                    {logInErrorMessage != null && (
                        <Alert onClose={onLogInErrorMsgClose} severity="error" sx = {{mt: 2}}>
                            {logInErrorMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit}>

                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            onChange = {onUsernameInputChange}
                            variant="outlined"
                            sx = {styles.textFieldStyle}
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            onChange = {onPasswordInputChange}
                            variant="outlined"
                            sx = {styles.textFieldStyle}
                        />

                        <FormControlLabel control={
                            <Checkbox checked={rememberMeInput} onChange={onRememberMeInputChange}></Checkbox>
                        } label="Remember Me (目前还没有啥用)" />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2}}
                        >
                            <Typography variant="body1">
                                回家刷题啦
                            </Typography>
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Container>
    );

};

export default LogInForm;
