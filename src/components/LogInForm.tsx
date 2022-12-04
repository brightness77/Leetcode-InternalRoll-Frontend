import { Alert, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import loginImg from "../static/img/four_1.jpeg"
import LeetcodeFormRequest from "../utils/LeetcodeFormRequest";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import { Role } from "../context/RunContextProvider";
import RunContext from "../context/RunContextProvider";
import { useNavigate } from "react-router-dom";
import { globalMessages } from "../context/ConfigProvider";


const styles = {

    loginImgStyle : {
        height : 220,
        width : 400,
    },

    textFieldStyle : {
        
    },
}


function LogInForm() : React.ReactElement {

    //input fields
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    //variables
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {setUsername, setRole} = useContext(RunContext);


    //input changes
    const onUsernameInputChange = useCallback((e : any) => {
        setUsernameInput(e.target.value);
    }, []);

    const onPasswordInputChange = useCallback((e : any) => {
        setPasswordInput(e.target.value);
    }, []);


    //context
    const navigate = useNavigate();

    //handlers
    const onRequestStart = useCallback(() => {
        setIsLoading(true);
    }, []);

    const onErrorMsgClose = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const onRequestFailure = useCallback((response : any) => {
        setErrorMessage("用户名或密码不太对哦!");
        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        setErrorMessage(globalMessages.serverErrorMessage);
        setIsLoading(false);
    }, []);


    const onRequestSuccess = useCallback((response : any) => {
        console.log("Log in success!");
        setIsLoading(false);

        const parsedResponse = JSON.parse(response);

        //check username
        const username = parsedResponse.username;

        //check role
        const role = parsedResponse.admin != null ? 'Admin' : null;

        console.log(role);

        if(parsedResponse.username == null){
            setErrorMessage(globalMessages.serverErrorMessage);
            return;
        }


        setUsername(username);
        setRole(role);
        localStorage.setItem('username', username);
        if(role !== null){
            localStorage.setItem('role', role);
        }

        //after successfully logged in, navigate to home page
        navigate('/');
    }, [navigate]);

    
    //check role
    const onLoginSuccess = useCallback(() => {
        new LeetcodeRequest(`users/currentUser`, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, [onRequestFailure, onRequestError, onRequestFailure, usernameInput]);


    //submit login info
    const onSubmit = useCallback((e : any) => {
        new LeetcodeFormRequest(`login?username=${usernameInput}&password=${passwordInput}`, "POST")
            .onStart(onRequestStart)
            .onSuccess(onLoginSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
        e.preventDefault();
    }, [onRequestFailure, onRequestError, onRequestStart, usernameInput, passwordInput]);



    return(
        <Container component="main" maxWidth = "xs">
            <img src={loginImg} alt="Welcome" style={styles.loginImgStyle} />

            <Box sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant="h3" color="primary">
                    欢迎回到内卷中心!
                </Typography>

                {isLoading && <CircularProgress color = "primary" variant='indeterminate' sx={{margin:1, }} />}
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

};

export default LogInForm;
