import * as React from "react";

export interface IRunContext {

}

const emptyContext: IRunContext = {

}

const RunContext: React.Context<IRunContext> = React.createContext(emptyContext);

interface Props {
    children: React.ReactElement;
}

export function RunContextProvider({
    children
}: Props): React.ReactElement {

const initialValue: IRunContext = {};

    return (
        <RunContext.Provider value = {initialValue}>
            {children}
        </RunContext.Provider>
    );
}

export default RunContextProvider;