import { Button, Divider, LinearProgress, List, ListItem, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactElement, useCallback, useState } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import { globalMessages } from "../../context/ConfigProvider";


const styles = {

    mainContainerStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        mt: '2%',
    },

    imgStyle : {
        width : '300px',
        height : '180px',
    },

    listStyle : {
        alignment : 'center',
    },

    easyDiff : {
        fontWeight: 'bold',
        color : '#3ac81d',
    },

    mediumDiff : {
        fontWeight: 'bold',
        color : '#d2900c'
    },

    hardDiff : {
        fontWeight: 'bold',
        color : '#d2230c'
    },

    paperStyle : {
        m:'20px',
        p:'10px',
        width:'600px',
        minHeight:'200px',
        borderRadius:'0px', 
    },

    radioStyle : {
        
    },

    questionTitleStyle : {
        mr:'50px',
        flexGrow : 1,
    },

    formTitleStyle : {
        m:'10px',
    },

    listItemStyle : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },

    selectionStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    shortSelectionStyle : {
        flexGrow : 1,
        m : '1pt',
        maxWidth : '150px',
    },

    MenuProps : {
        PaperProps: {
            style: {
                minHeight: '200px',
                maxHeight: '400px',
                width: '250px',
            },
        },
    },

};





function AllUserListComponent({parsedResponse} : {parsedResponse: object[]}) : ReactElement {

    return (
        <div>
            {parsedResponse.map((userEntry : any) => (<div>
                <ListItem sx={styles.listItemStyle}>
                    <Typography variant="body2">
                        {userEntry.id} {userEntry.email} {userEntry.username} {userEntry.utcRegisterTime} {userEntry.registerIPAddress}
                    </Typography>
                </ListItem>
                <Divider variant="middle" />
            </div>))}
        </div>
    );
};




function AdminComponent() : ReactElement {

    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<any>('Idle');



    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage('Please wait');
    }, []);

    const onRequestSuccess = useCallback((e: any) => {
        setIsLoading(false);

        setStatusMessage(e);
    }, []);

    const onRequestFailure = useCallback((e: any, status: number) => {
        setIsLoading(false);

        if(status === 504){
            setStatusMessage(globalMessages.serverErrorMessage);
        } else if (status === 403){
            setStatusMessage(globalMessages.forbiddenMessage);
        } else if (status === 401){
            setStatusMessage(globalMessages.loginRequiredMessage);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }


    }, []);

    const onRequestError = useCallback(() => {
        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);
    }, []);

    const onAllUserRequestSuccess = useCallback((response: any) => {
        setIsLoading(false);

        //console.log(response);
    
        const parsedResponse : object[] = JSON.parse(response);

        console.log(parsedResponse);

        setStatusMessage(<AllUserListComponent parsedResponse={parsedResponse} />);
    }, []);




    const onUpdateAllNew = useCallback(() => {
        new LeetcodeRequest('problem/updatenew', 'GET')
        .onStart(onRequestStart)
        .onSuccess(onRequestSuccess)
        .onFailure(onRequestFailure)
        .onError(onRequestError)
        .send();

    }, [onRequestStart, onRequestSuccess, onRequestFailure, onRequestError]);


    const onForceUpdateAll = useCallback(() => {
        new LeetcodeRequest('problem/forceupdateall', 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();

    }, [onRequestStart, onRequestSuccess, onRequestFailure, onRequestError]);


    const onAllUsersList = useCallback(() => {
        new LeetcodeRequest('admin/allusers', 'GET')
            .onStart(onRequestStart)
            .onSuccess(onAllUserRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();

    }, [onRequestStart, onAllUserRequestSuccess, onRequestFailure, onRequestError]);


    return (
        <Container sx={styles.mainContainerStyle}>

            <Paper sx={styles.paperStyle}>
                <List sx={styles.listStyle}>
                    
                    <ListItem sx={styles.listItemStyle}>
                        <Typography variant="h3">权限狗命令</Typography>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={styles.listItemStyle}>
                        <Button
                            variant="contained"
                            sx={{m:1}}
                            onClick={onUpdateAllNew}
                        >
                            <Typography variant="body1">
                                更新所有新问题
                            </Typography>
                        </Button>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={styles.listItemStyle}>
                        <Button
                            variant="contained"
                            sx={{m:1}}
                            onClick={onForceUpdateAll}
                        >
                            <WarningIcon sx={{mr:'5px'}} />
                            <Typography variant="body1">
                                强制更新所有问题
                            </Typography>
                            <WarningIcon sx={{ml:'5px'}} />
                        </Button>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={styles.listItemStyle}>
                        <Button
                            variant="contained"
                            sx={{m:1}}
                            onClick={onAllUsersList}
                        >
                            <Typography variant="body1">
                                全部用户
                            </Typography>
                        </Button>
                    </ListItem>

                </List>
            </Paper>

            <Paper sx={styles.paperStyle}>
                <List sx={styles.listStyle}>

                    {isLoading && <ListItem sx={styles.listItemStyle}>
                        <LinearProgress sx={{margin:1, width:'90%'}} />
                    </ListItem>}

                    {statusMessage !== null && <ListItem sx={styles.listItemStyle}>
                        <Typography variant="h3">{statusMessage}</Typography>
                    </ListItem>}

                </List>
            </Paper>

        </Container>
    );
};

export default AdminComponent;
