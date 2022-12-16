import { Theme } from "@emotion/react";
import { Button, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, LinearProgress, Link, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useCallback, useState } from "react";
import { globalMessages, texts_en } from "../../context/ConfigProvider";
import twoImg from "../../static/img/20exp.jpg";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import { useNavigate } from "react-router-dom";


const styles = {

    mainContainerStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        mt: '2%',
    },

    imgStyle : {
        width : '500px',
        height : '320px',
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

    questionRowListStyle : {
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




function ChooseProblem(): React.ReactElement {

    const nagivate = useNavigate();

    //input states
    const [inputFrontendID, setIinputFrontendID] = useState(0);

    //display props
    const [problemTitle, setProblemTitle] = useState(globalMessages.serverErrorMessage);
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState(styles.easyDiff);
    const [problemNagivation, setProblemNagivation] = useState('/random-problem');

    //display statusMessage
    const [statusMessage, setStatusMessage] = useState('');

    //status states
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);



    //handlers

    const onProblemButtonClick = useCallback(() => {
        nagivate(problemNagivation);
    }, [problemNagivation]);


    const onRequestSuccess = useCallback((response : any) => {
        console.log("Succeed!");

        const parsedResponse = JSON.parse(response);
        setIsLoading(false);

        if(parsedResponse === null){
            setIsSuccess(false);

            setStatusMessage('怎么肥四,一道题都没有找到!');
        } else {
            setIsSuccess(true);

            setProblemTitle(parsedResponse.frontendID + ". " + parsedResponse.title);
            if(parsedResponse.difficulty == 1){
                setProblemDifficulty('Easy');
                setProblemDiffStyle(styles.easyDiff);
            } else if (parsedResponse.difficulty == 2){
                setProblemDifficulty('Medium');
                setProblemDiffStyle(styles.mediumDiff);
            } else {
                setProblemDifficulty('Hard');
                setProblemDiffStyle(styles.hardDiff);
            }

            setProblemNagivation(`/problemsolve/${parsedResponse.titleSlug}`);

            let tagStrings = '';
            parsedResponse.topicTags.forEach(function (value : string) {
                //console.log('Parsed topic tags of ' + value);
                tagStrings += (value + ', ');
            });
            //setProblemTopicTags(tagStrings);
        }
    }, [statusMessage]);


    const onRequestFailure = useCallback((e : any, status : number) => {
        console.log("Failure!");

        setIsLoading(false);
        setIsSuccess(false);

        if(status === 504) {
            setStatusMessage(globalMessages.serverErrorMessage);
        } else if (status === 401) {
            setStatusMessage(globalMessages.loginRequiredMessage);
        } else if (status === 400) {
            setStatusMessage("没有找到符合条件的题!");
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }

    }, [statusMessage, setStatusMessage]);


    const onRequestError = useCallback(() => {
        console.log("Error!");

        setIsLoading(false);
        setIsSuccess(false);

        setStatusMessage(globalMessages.serverErrorMessage);

    }, [problemTitle, problemDifficulty]);


    const onSubmit = useCallback(() => {
        setIsLoading(true);

        //console.log(newPayload);

        new LeetcodeRequest(`problem/id/${inputFrontendID}`, 'GET')
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, [onRequestSuccess, onRequestFailure, onRequestError, inputFrontendID]);


    //input changes
    const onFrontendIDChange = useCallback((e: any) => {
        setIinputFrontendID(e.target.value);
    }, [inputFrontendID]);



    return (
        <Container component = "main" maxWidth={false} sx = {styles.mainContainerStyle}>

            <Paper variant="outlined" elevation={10} sx={styles.paperStyle}>
                <List sx={{ alignItems:'center', }}>

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="h4" sx={styles.formTitleStyle}>Search Problem</Typography>
                    </ListItem>

                    <ListItem sx = {styles.questionRowListStyle}>
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

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Button variant = "contained" color = "primary" onClick = {onSubmit} sx = {{width: 200, height: 50, margin : 1,}}>
                            <Typography variant="h5">Search</Typography>
                        </Button>
                    </ListItem>

                </List>
            </Paper>


            <Paper variant="outlined" elevation={10} sx={styles.paperStyle}>

                <List sx={{ alignItems:'center', justifyItems:'center'}}>
                    <ListItem sx = {styles.questionRowListStyle}>
                        <Box border={'1px'} borderColor={'secondary'} component='img' src = {twoImg} alt = "ROLL!" sx = {styles.imgStyle} />
                    </ListItem>

                    <Divider variant="middle" />

                    {isLoading && <div>

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Skeleton width={'90%'} height={'40px'} animation="wave" />
                        </ListItem>

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Skeleton width={'40%'} height={'40px'} animation="wave" />
                        </ListItem>

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Skeleton width={'50%'} height={'40px'} animation="wave" />
                        </ListItem>

                        <ListItem sx = {styles.questionRowListStyle}>
                            <LinearProgress color = "primary" sx={{ m:'10px' , width: '90%'}} />
                        </ListItem>

                    </div>}

                    {(!isLoading && isSuccess) &&
                        //show success information here
                        <div>

                            <ListItem sx = {styles.questionRowListStyle}>
                                <Typography variant="body1" sx={{mt : 1}}>
                                    {problemTitle}
                                </Typography>
                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.questionRowListStyle}>
                                <Typography variant="body1" sx={problemDiffStyle}>
                                    {problemDifficulty}
                                </Typography>
                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.questionRowListStyle}>
                                <Button variant="contained" sx={{mt: 1}} onClick={onProblemButtonClick}>
                                    <Typography variant='h5'>Solve Problem!</Typography>
                                </Button>
                            </ListItem>

                        </div>
                    }

                    {(!isLoading && !isSuccess) &&
                        //show status information here
                        <div>

                            <ListItem sx = {styles.questionRowListStyle}>
                                <Typography variant="body1" sx={{mt : 1}}>
                                    {statusMessage}
                                </Typography>
                            </ListItem>

                        </div>
                    }
                    
                </List>
            </Paper>
        </Container>
    );
};

export default ChooseProblem;
