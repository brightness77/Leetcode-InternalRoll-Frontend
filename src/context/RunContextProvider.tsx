import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";


export type Role = 'Leader' | 'Admin';


export interface IRunContext {
    username: string | null;
    role: Role | null;
    setUsername: (username: string | null) => void;
    setRole: (role: Role | null) => void;
}

//template empty function
const anEmptyFunction = () => {};

const emptyContext: IRunContext = {
    username : null,
    role : null,
    setUsername : anEmptyFunction,
    setRole : anEmptyFunction,
}


const RunContext: React.Context<IRunContext> = React.createContext(emptyContext);

export default RunContext;


interface Props {
    children: React.ReactElement;
}

export function RunContextProvider({
    children
}: Props): React.ReactElement {

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);

    //fetch user log info from local storage
    const onRequestSuccess = useCallback((response : any) => {
        if(!Boolean(response)) {
            return;
        }
        response = JSON.parse(response);

        //check username
        const username = response.username;

        //check role
        const role = response.admin != null ? 'Admin' : null;

        setUsername(username);
        setRole(role);
    }, [setUsername]);

    const onRequestFailureOrError = useCallback((response : any) => {
        //reset log in information
        setUsername(null);
        setRole(null);

    }, [setUsername]);

    useEffect(() => {
        const userFromStorage = localStorage.getItem('username');
        // if(userFromStorage != null){
        //     new LeetcodeRequest(`users/${userFromStorage}`, 'GET')
        //         .onSuccess(onReqeustSuccess)
        //         .send();
        // }

        if(userFromStorage != null){
            new LeetcodeRequest(`users/currentUser`, 'GET')
                .onSuccess(onRequestSuccess)
                .onFailure(onRequestFailureOrError)
                .onError(onRequestFailureOrError)
                .send();
        }
    }, []);

    const initialValue: IRunContext = {username, role, setUsername, setRole};

    return (
        <RunContext.Provider value={initialValue}>
            {children}
        </RunContext.Provider>
    );
}
