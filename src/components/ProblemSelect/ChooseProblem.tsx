import { Theme } from "@emotion/react";
import { Button, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, LinearProgress, Link, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useCallback, useState } from "react";
import { globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import { useNavigate } from "react-router-dom";
import ProblemEntry from "./ProblemEntryComponent";


const styles = {

    radioStyle : {
        
    },

    questionTitleStyle : {
        mr:'50px',
        flexGrow : 1,
    },

    formTitleStyle : {
        m:'10px',
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




function ChooseProblem(): React.ReactElement {

    const nagivate = useNavigate();

    //input states
    const [inputFrontendID, setIinputFrontendID] = useState(0);

    //variables
    const [problemEntryResponse, setProblemEntryResponse] = useState<any>(null);

    //status
    const [statusMessage, setStatusMessage] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState(false);



    //handlers
    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {
        //console.log("Succeed!");

        setIsLoading(false);

        try{
            const parsedResponse = JSON.parse(response);
            if(parsedResponse === null){
                setStatusMessage(globalMessages.invalidProblemMessage);
            } else {
                setProblemEntryResponse(parsedResponse);
            }
        } catch(e){
            setStatusMessage(globalMessages.serverErrorMessage);
        }

    }, []);


    const onRequestFailure = useCallback((e : any, status : number) => {
        //console.log("Failure!");

        setIsLoading(false);

        if(status === 504) {
            setStatusMessage(globalMessages.serverErrorMessage);
        } else if (status === 401) {
            setStatusMessage(globalMessages.loginRequiredMessage);
        } else if (status === 400) {
            setStatusMessage(globalMessages.invalidProblemMessage);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }

    }, []);


    const onRequestError = useCallback(() => {
        //console.log("Error!");

        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);

    }, []);


    const onSubmit = useCallback(() => {

        new LeetcodeRequest(`problem/id/${inputFrontendID}`, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
            
    }, [onRequestStart, onRequestSuccess, onRequestFailure, onRequestError, inputFrontendID]);


    //input changes
    const onFrontendIDChange = useCallback((e: any) => {
        setIinputFrontendID(e.target.value);
    }, [inputFrontendID]);



    return (
        <Container component = "main" maxWidth="lg" disableGutters sx = {globalStyles.component.mainContainer.flexRowAlignFlexStart.withGap}>

            <Container maxWidth={false} disableGutters sx = {globalStyles.component.subContainer.flexColumnAlignCenter.withMargin}>
                <Paper variant="outlined" elevation={10} sx={globalStyles.component.mainPaper.withMargin}>
                    <List sx={{ alignItems:'center', }}>

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="h4" sx={styles.formTitleStyle}>Search Problem</Typography>
                        </ListItem>

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="body1" sx={styles.questionTitleStyle}>{texts_en.problemFrontendID}</Typography>

                            <TextField
                                sx={styles.selectionStyle}
                                margin="normal"
                                id="proficiencyLow"
                                label={texts_en.problemFrontendID_short}
                                defaultValue="0"
                                value={inputFrontendID}
                                onChange = {onFrontendIDChange}
                                variant="outlined"
                            />
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Button variant = "contained" color = "primary" onClick = {onSubmit} sx = {{width: 200, height: 50, margin : 1,}}>
                                <Typography variant="h5">Search</Typography>
                            </Button>
                        </ListItem>

                    </List>
                </Paper>
            </Container>

            <Container maxWidth={false} disableGutters sx = {globalStyles.component.subContainer.flexColumnAlignCenter.withMargin}>
                <ProblemEntry 
                    isLoading={isLoading} 
                    statusMessage={statusMessage} 
                    problemEntryResponse={problemEntryResponse}
                 />
            </Container>


        </Container>
    );
};

export default ChooseProblem;
