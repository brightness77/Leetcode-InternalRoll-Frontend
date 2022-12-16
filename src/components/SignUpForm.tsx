import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Box, Container } from "@mui/system";
import { Alert, Button, CircularProgress, TextField, Typography, Paper } from "@mui/material";
import welcomeImg from "../static/img/Squirtles.png";
import LeetcodeFormRequest from "../utils/LeetcodeFormRequest";
import useAuthenticationForm from "../hook/useAuthenticationForm";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import useUserCreationRequest from "../hook/useUserCreateRequest";
import { globalStyles } from "../context/ConfigProvider";


const styles = {

    welcomeStyle : {
        width : '100%',
    },

    textFieldStyle : {
        
    },
};

function SignUpForm() : React.ReactElement {

    //input fields
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [ip, setIP] = useState('');


    const onUsernameInputChange = useCallback((e : any) => {
        setUsernameInput(e.target.value);
    }, []);

    const onPasswordInputChange = useCallback((e : any) => {
        setPasswordInput(e.target.value);
    }, []);

    const onEmailInputChange = useCallback((e : any) => {
        setEmailInput(e.target.value);
    }, []);



    //IP fetching
    //creating function to load ip address from the API
    const getUserIP = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }


    //import login hooks
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

    //import sign up hooks
    const{
        isSignUpLoading,
        signUpErrorMessage,
        onSignUpRequestStart,
        onSignUpErrorMsgClose,
        onSignUpRequestFailure,
        onSignUpRequestError,
        onSignUpRequestSuccess,
    } = useUserCreationRequest(() => {
        return {
            username : usernameInput,
        };
    });


    //get user ip since start
    useEffect(() => {
        getUserIP();
    }, []);



    const onSignUpSuccess = useCallback(() => {
        //login after signup

        new LeetcodeFormRequest(`login?username=${usernameInput}&password=${passwordInput}`, "POST")
            .onStart(onLogInRequestStart)
            .onSuccess(onSignUpRequestSuccess)
            .onFailure(onLogInRequestFailure)
            .onError(onLogInRequestError)
            .send();
    } , [onLogInRequestStart, onLogInRequestSuccess, onLogInRequestError, onLogInRequestFailure, usernameInput, passwordInput]);


    const onSubmit = useCallback((e : any) => {
        //register info submit process

        getUserIP();
        let payload = {
            username : usernameInput,
            password : passwordInput,
            email : emailInput,
            clientHost : ip,
        };
        new LeetcodeRequest('users/create', 'POST')
            .setPayload(payload)
            .onStart(onSignUpRequestStart)
            .onSuccess(onSignUpSuccess)
            .onFailure(onSignUpRequestFailure)
            .onError(onSignUpRequestError)
            .send();
        e.preventDefault();
    }, [onSignUpRequestFailure, onSignUpRequestError, onSignUpRequestStart, onSignUpSuccess, usernameInput, emailInput, passwordInput]);



    return(
        <Container component="main" maxWidth = "xs" sx={globalStyles.component.mainContainer.parentWithGap}>
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withoutMargin}>
                <Box component='img' src={welcomeImg} alt="Welcome" style={styles.welcomeStyle} />

                <Box sx={{
                    mt: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p:'20px',
                }}>
                    <Typography variant="h4" color="primary">欢迎加入内卷大家庭!</Typography>

                    {isSignUpLoading && <CircularProgress color = "primary" variant='indeterminate' sx={{margin:1}} />}
                    {signUpErrorMessage != null && (
                        <Alert onClose={onSignUpErrorMsgClose} severity="error" sx = {{mt: 2}}>
                            {signUpErrorMessage}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onSubmit}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            onChange = {onEmailInputChange}
                            variant="outlined"
                            sx = {styles.textFieldStyle}
                        />

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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 2}}
                        >
                            <Typography variant="body1">立即加入</Typography>
                        </Button>
                    </Box>

                </Box>
            </Paper>
        </Container>
    );
}

export default SignUpForm;
