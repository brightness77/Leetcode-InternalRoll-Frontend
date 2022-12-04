import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessages } from "../context/ConfigProvider";
import RunContext from "../context/RunContextProvider";


interface AuthenticationFormStates {
    isLoading : boolean,
    errorMessage: string | null,
    onRequestStart: () => void,
    onErrorMsgClose: () => void,
    onRequestFailure: (response : any) => void,
    onRequestError: () => void,
    onRequestSuccess: (response: any) => void,
}

function useAuthenticationFormSignUp (
    parseResponse: (request: any) => {username: string | null}
) : AuthenticationFormStates {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {setUsername} = useContext(RunContext);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
    }, []);

    const onErrorMsgClose = useCallback(() => {
        setErrorMessage(null);
    }, []);

    const onRequestFailure = useCallback((response : any) => {
        const parsedResponse = JSON.parse(response);

        if(parsedResponse.status === 400){
            if(parsedResponse.message === "Username already exists"){
                setErrorMessage("这个用户名被别人使用了, 换一个卷吧!"); 
            } else if (parsedResponse.message === "Email already exists"){
                setErrorMessage("这个邮箱被别人使用了, 换一个卷吧!");
            }
        } else {
            setErrorMessage(globalMessages.serverErrorMessage);
        }

        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        setErrorMessage(globalMessages.serverErrorMessage);
        setIsLoading(false);
    }, []);

    const navigate = useNavigate();

    const onRequestSuccess = useCallback((response : any) => {
        setIsLoading(false);

        const {username} = parseResponse(response);
        if(username == null){
            setErrorMessage(globalMessages.serverErrorMessage);
            return;
        }

        setUsername(username);
        localStorage.setItem('username', username);

        //after successfully logged in, navigate to home page
        navigate('/');
    }, [navigate, parseResponse, setUsername]); 

    return {
        isLoading,
        errorMessage,
        onRequestStart,
        onErrorMsgClose,
        onRequestFailure,
        onRequestError,
        onRequestSuccess,
    }
}

export default useAuthenticationFormSignUp;
