import { ReactNode, useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import RunContext from "../context/RunContextProvider";


export const AdminRoute = ({children} : {children: any}) => {
    const {role} = useContext(RunContext);

    if(role === "Admin"){
        return children;
    } else {
        return <Navigate to="/403" />
    }

};

