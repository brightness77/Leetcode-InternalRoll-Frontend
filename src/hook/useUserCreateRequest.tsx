import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessages } from "../context/ConfigProvider";
import RunContext from "../context/RunContextProvider";


interface UserCreationStates {
    isSignUpLoading : boolean,
    signUpErrorMessage: string | null,
    onSignUpRequestStart: () => void,
    onSignUpErrorMsgClose: () => void,
    onSignUpRequestFailure: (response : any) => void,
    onSignUpRequestError: () => void,
    onSignUpRequestSuccess: (response: any) => void,
}

function useUserCreationRequest (
    parseResponse: (request: any) => {username: string | null}
) : UserCreationStates {

    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState<string | null>(null);
    const {setUsername} = useContext(RunContext);

    const onSignUpRequestStart = useCallback(() => {
        setIsSignUpLoading(true);
    }, []);

    const onSignUpErrorMsgClose = useCallback(() => {
        setSignUpErrorMessage(null);
    }, []);

    const onSignUpRequestFailure = useCallback((response : any) => {
        const parsedResponse = JSON.parse(response);

        if(parsedResponse.status === 400){
            if(parsedResponse.message === "Username already exists"){
                setSignUpErrorMessage("这个用户名被别人使用了, 换一个卷吧!"); 
            } else if (parsedResponse.message === "Email already exists"){
                setSignUpErrorMessage("这个邮箱被别人使用了, 换一个卷吧!");
            } else if (parsedResponse.message === "Bad username") {
                setSignUpErrorMessage("不合法的用户名!");
            } else {
                setSignUpErrorMessage(globalMessages.serverErrorMessage);
            }
        } else {
            setSignUpErrorMessage(globalMessages.serverErrorMessage);
        }

        setIsSignUpLoading(false);
    }, []);

    const onSignUpRequestError = useCallback(() => {
        setSignUpErrorMessage(globalMessages.serverErrorMessage);
        setIsSignUpLoading(false);
    }, []);

    const navigate = useNavigate();

    const onSignUpRequestSuccess = useCallback((response : any) => {
        setIsSignUpLoading(false);

        const {username} = parseResponse(response);
        if(username == null){
            setSignUpErrorMessage(globalMessages.serverErrorMessage);
            return;
        }

        setUsername(username);
        localStorage.setItem('username', username);

        //after successfully logged in, navigate to home page
        navigate('/');
    }, [navigate, parseResponse, setUsername]); 

    return {
        isSignUpLoading,
        signUpErrorMessage,
        onSignUpRequestStart,
        onSignUpErrorMsgClose,
        onSignUpRequestFailure,
        onSignUpRequestError,
        onSignUpRequestSuccess,
    }
}

export default useUserCreationRequest;
