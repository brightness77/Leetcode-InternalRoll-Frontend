import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Box, Container } from "@mui/system";
import { Alert, Button, CircularProgress, TextField, Typography } from "@mui/material";
import welcomeImg from "../static/img/Squirtles.png";
import LeetcodeFormRequest from "../utils/LeetcodeFormRequest";
import useAuthenticationFormSignUp from "../hook/useAuthenticationFormSignUp";
import LeetcodeRequest from "../utils/LeetcodeRequest";


const styles = {

    welcomeStyle : {
        width : 400,
        height : 320,
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


    //request handling
    const {
        isLoading,
        errorMessage,
        onRequestStart,
        onErrorMsgClose,
        onRequestError,
        onRequestFailure,
        onRequestSuccess,
    } = useAuthenticationFormSignUp(() => {
        return {
            username : usernameInput,
        };
    });

    //get user ip since start
    useEffect(() => {
        getUserIP();
    }, []);


    const onUserCreationSuccess = useCallback(() => {
        new LeetcodeFormRequest(`login?username=${usernameInput}&password=${passwordInput}`, "POST")
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    } , [onRequestStart, onRequestSuccess, onRequestError, onRequestFailure, usernameInput, passwordInput]);


    const onSubmit = useCallback((e : any) => {
        getUserIP();
        let payload = {
            username : usernameInput,
            password : passwordInput,
            email : emailInput,
            clientHost : ip,
        };
        new LeetcodeRequest('users/create', 'POST')
            .setPayload(payload)
            .onStart(onRequestStart)
            .onSuccess(onUserCreationSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
        e.preventDefault();
    }, [onRequestFailure, onRequestError, onRequestStart, onUserCreationSuccess, usernameInput, emailInput, passwordInput]);



    return(
        <Container component="main" maxWidth = "xs">
            <img src={welcomeImg} alt="Welcome" style={styles.welcomeStyle} />

            <Box sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant="h3" color="primary">
                    欢迎加入内卷大家庭!
                </Typography>

                {isLoading && <CircularProgress color = "primary" variant='indeterminate' sx={{margin:1}} />}
                {errorMessage != null && (
                    <Alert onClose={onErrorMsgClose} severity="error" sx = {{mt: 2}}>
                        {errorMessage}
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
                        <Typography variant="body1">
                            立即加入
                        </Typography>
                    </Button>
                </Box>

            </Box>
        </Container>
    );
}

export default SignUpForm;
