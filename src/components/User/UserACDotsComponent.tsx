import { List, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container/Container";
import Divider from "@mui/material/Divider/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalColors, globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";


const styles = {

    titleTextStyle : {
        flexGrow : 1,
        mt:'5px',
        mb:'5px',
    },

    timeTextStyle : {
        flexGrow : 0,
        width: '200px',
        mt:'5px',
        mb:'5px',
    },

    skeletonStyle : {
        width : '90%',
        mt:'5px',
        mb:'5px',
    },

};



function UserACDots(
    {username} : {username : (string | undefined)}
) : React.ReactElement {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    
    const [records, setRecords] = useState<[]>([]);

    const skeletonLength = 11;



    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response: any) => {
        try {
            const parsedResponse = JSON.parse(response);
            //console.log(parsedResponse);

            setRecords(parsedResponse.content);
            //console.log(records);

        } catch (e) {
            setRecords([]);
        }

        setIsLoading(false);
        setStatusMessage(null);
    }, []);

    const onRequestFailure = useCallback((response: any, status: number) => {
        //console.log("Failure");
        const parsedResponse = JSON.parse(response);
        if(response.message === 'Username not found'){
            setStatusMessage(globalMessages.usernameNotFoundMessage);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }

        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        //console.log("Error");
        setStatusMessage(globalMessages.serverErrorMessage);

        setIsLoading(false);
    }, []);


    useEffect(() => {
        const url = `users/recentsolve/${username}`;

        new LeetcodeRequest(url, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, []);

    return (
        <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
            <List sx={globalStyles.component.list.listParent}>

                {isLoading && <div>
                    {[...Array(skeletonLength)].map(() => (
                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Skeleton animation="wave" sx={styles.skeletonStyle} />
                        </ListItem>
                    ))}
                </div>}

                {statusMessage != null && 
                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant='h5'>{statusMessage}</Typography>
                </ListItem>}

                {statusMessage == null && <div>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant='h5'>User AC Counts</Typography>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant='body1'>Ask Teacher Miao Miao!</Typography>
                    </ListItem>

                </div>}

            </List>
        </Paper>
    );
};

export default UserACDots;
