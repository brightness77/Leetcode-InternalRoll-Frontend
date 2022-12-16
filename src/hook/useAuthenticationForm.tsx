import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessages } from "../context/ConfigProvider";
import RunContext from "../context/RunContextProvider";


interface AuthenticationFormStates {
    isLogInLoading : boolean,
    logInErrorMessage: string | null,
    onLogInRequestStart: () => void,
    onLogInErrorMsgClose: () => void,
    onLogInRequestFailure: (response : any) => void,
    onLogInRequestError: () => void,
    onLogInRequestSuccess: (response: any) => void,
}

function useAuthenticationForm (
    parseResponse: (request: any) => {username: string | null}
) : AuthenticationFormStates {

    const [isLogInLoading, setIsLogInLoading] = useState(false);
    const [logInErrorMessage, setLogInErrorMessage] = useState<string | null>(null);
    const {setUsername, setRole} = useContext(RunContext);


    //handlers
    const onLogInRequestStart = useCallback(() => {
        setIsLogInLoading(true);
    }, []);

    const onLogInErrorMsgClose = useCallback(() => {
        setLogInErrorMessage(null);
    }, []);

    const onLogInRequestFailure = useCallback((response : any) => {
        setLogInErrorMessage("用户名或密码不太对哦!");
        setIsLogInLoading(false);
    }, []);

    const onLogInRequestError = useCallback(() => {
        setLogInErrorMessage(globalMessages.serverErrorMessage);
        setIsLogInLoading(false);
    }, []);

    const navigate = useNavigate();

    const onLogInRequestSuccess = useCallback((response : any) => {
        console.log("Log in success!");
        setIsLogInLoading(false);

        const parsedResponse = JSON.parse(response);

        //check username
        const username = parsedResponse.username;

        //check role
        const role = parsedResponse.admin != null ? 'Admin' : null;

        console.log(role);

        if(parsedResponse.username == null){
            setLogInErrorMessage(globalMessages.serverErrorMessage);
            return;
        }


        setUsername(username);
        setRole(role);
        localStorage.setItem('username', username);
        if(role !== null){
            localStorage.setItem('role', role);
        }

        //after successfully logged in, navigate to previous page
        navigate(-1);
    }, [navigate, parseResponse, setUsername]); 

    return {
        isLogInLoading,
        logInErrorMessage,
        onLogInRequestStart,
        onLogInErrorMsgClose,
        onLogInRequestFailure,
        onLogInRequestError,
        onLogInRequestSuccess,
    }
}

export default useAuthenticationForm;
