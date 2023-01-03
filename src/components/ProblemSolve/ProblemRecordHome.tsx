import { Alert, Box, Button, CircularProgress, Container, Divider, Link, List, ListItem, Paper, Slider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import pika from "../../static/img/thoughtful-pikachu.gif";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import { Navigate, useNavigate } from "react-router-dom";
import ProficiencyBarExistLarge from "../Model/ProficiencyBarExistLarge";
import ProblemSolveRecordList from "./ProblemSolveRecordListComponent";



const styles = {

    imgStyle : {
        width : '300px',
        height : '180px',
    },

    radioStyle : {
        
    },

    listItemLeftStyle : {
        mr:'50px',
        width:'35%',
        flexGrow : 0,
    },

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    formTitleStyle : {
        m:'10px',
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

    proficiencyButtonStyle : {
        height:'70px',
        width:'500px',
    }

};





function ProblemRecord(
    { titleSlug } : { titleSlug : (string | undefined), }
) : React.ReactElement {

    const navigate = useNavigate();

    //status variables
    const [isProblemLoading, setIsProblemLoading] = useState(false);
    const [problemStatusMessage, setProblemStatusMessage] = useState<string | null>(null);

    //problem variables
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState({});
    const [problemURL, setProblemURL] = useState('https://www.google.com');

    //problem record variables
    const [recordAcceptedCount, setRecordAcceptedCount] = useState(0);
    const [recordAverageProficiency, setRecordAverageProficiency] = useState(0);
    const [recordRecentProficiency, setRecordRecentProficiency] = useState(0);


    //problem solve record variables
    const [isSolveLoading, setIsSolveLoading] = useState(false);

    const [solveProficiency, setSolveProficiency] = useState(-1);
    const [solveStatusMessage, setSolveStatusMessage] = useState<string | null>(null);




    //problem & problem record handlers
    const onProblemRequestStart = useCallback(() => {

        setIsProblemLoading(true);
        setProblemStatusMessage(null);

    }, []);

    const onProblemRequestSuccess = useCallback((e: any) => {
        //console.log('success');

        const parsedResponse = JSON.parse(e);
        
        //set title
        setProblemTitle(parsedResponse.problemEntry.frontendID + ". " + parsedResponse.problemEntry.title);

        //set url
        setProblemURL(parsedResponse.problemEntry.url);

        //set diff
        if(parsedResponse.problemEntry.difficulty == 1){
            setProblemDifficulty('Easy');
            setProblemDiffStyle(globalStyles.diffText.easy);
        } else if (parsedResponse.problemEntry.difficulty == 2){
            setProblemDifficulty('Medium');
            setProblemDiffStyle(globalStyles.diffText.medium);
        } else {
            setProblemDifficulty('Hard');
            setProblemDiffStyle(globalStyles.diffText.hard);
        }

        //set record
        setRecordAcceptedCount(parsedResponse.acceptedCount);
        setRecordAverageProficiency(parsedResponse.averageProficiency);
        setRecordRecentProficiency(parsedResponse.recentProficiency);

        setIsProblemLoading(false);
        setProblemStatusMessage(null);

    }, []);

    const onProblemRequestFailure = useCallback((e: any, status: number) => {
        console.log('failure');

        if(status === 504) {
            setProblemStatusMessage(globalMessages.serverErrorMessage);
        } else if (status === 500) {
            setProblemStatusMessage(globalMessages.needRefreshMessage);
        } else if (status === 401) {
            setProblemStatusMessage(globalMessages.loginRequiredMessage);
        } else if (status === 400) {
            let parsedResponse = JSON.parse(e);
            if(parsedResponse.message === 'No result found!'){
                setProblemStatusMessage(globalMessages.invalidProblemMessage);
            } else {
                setProblemStatusMessage(globalMessages.serverErrorMessage);
            }
        } else {
            setProblemStatusMessage(globalMessages.serverErrorMessage);
        }

        setIsProblemLoading(false);
    }, []);

    const onProblemRequestError = useCallback(() => {
        //console.log('error');
        setProblemStatusMessage(globalMessages.serverErrorMessage);

        setIsProblemLoading(false);
    }, []);





    //problem solve record handlers
    const onSolveProficiencyChange = useCallback((
        event: React.MouseEvent<HTMLElement>,
        value: number | null, ) => {

        if(value !== null){
            setSolveProficiency(value);
        }
    }, [solveProficiency]);


    const onSolveErrorMsgClose = useCallback(() => {
        setSolveStatusMessage(null);
    }, [solveStatusMessage]);


    const onSolveStart = useCallback(() => {

        setSolveStatusMessage(null);
        setIsSolveLoading(true);
    }, []);

    const onSolveSuccess = useCallback((e: any) => {
        console.log('success');

        setSolveProficiency(-1);
        setSolveStatusMessage("提交成功! 离上岸又近了一步!");
        setIsSolveLoading(false);

        fetchRecord(titleSlug);
        
    }, []);

    const onSolveFailure = useCallback((e: any, status: number) => {
        console.log('failure');

        if(status === 504) {
            setSolveStatusMessage(globalMessages.serverErrorMessage);
        } else if (status === 401) {
            setSolveStatusMessage(globalMessages.loginRequiredMessage);
        } else if (status === 400) {
            let parsedResponse = JSON.parse(e);
            if(parsedResponse.message === 'Problem does not exists!'){
                setSolveStatusMessage(globalMessages.invalidProblemMessage);
            } else if (parsedResponse.message === 'Invalid proficiency!'){
                setSolveStatusMessage("Proficiency must be between 0 to 5!");
            } else {
                setSolveStatusMessage(globalMessages.serverErrorMessage);
            }
        } else {
            setSolveStatusMessage(globalMessages.serverErrorMessage);
        }

        setIsSolveLoading(false);
    }, []);

    const onSolveError = useCallback(() => {
        console.log('error');

        setSolveStatusMessage(globalMessages.serverErrorMessage);
        setIsSolveLoading(false);
    }, []);


    const onSubmitSolve = useCallback(() => {
        new LeetcodeRequest(`problemsolverecord/createsolve/${titleSlug}?proficiency=${solveProficiency}`, 'POST')
        .onStart(onSolveStart)
        .onSuccess(onSolveSuccess)
        .onFailure(onSolveFailure)
        .onError(onSolveError)
        .send();
    }, [solveProficiency]);



    //request to backend
    const fetchRecord = useCallback((titleSlug : (string | undefined)) => {
        new LeetcodeRequest(`problemrecord/record/${titleSlug}`, 'GET')
        .onStart(onProblemRequestStart)
        .onSuccess(onProblemRequestSuccess)
        .onFailure(onProblemRequestFailure)
        .onError(onProblemRequestError)
        .send();

        console.log('Request sent');
    }, [titleSlug]);

    useEffect(() => {
        fetchRecord(titleSlug);
    }, [titleSlug]);




    return (
        <Container component = "main" maxWidth="lg" disableGutters sx = {globalStyles.component.mainContainer.flexRowAlignFlexStart.withGap}>

            <Container maxWidth={false} disableGutters sx={globalStyles.component.subContainer.flexColumnAlignCenter.withMargin}>
                <Paper variant="outlined" elevation={10} sx={globalStyles.component.mainPaper.withMargin}>

                    <List sx={globalStyles.component.list.listParent}>
                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Box border={'1px'} borderColor={'secondary'} component='img' src = {pika} alt = "ROLL!" sx = {styles.imgStyle} />
                        </ListItem>

                        <Divider variant="middle" />

                        {isProblemLoading && 
                            <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                                <CircularProgress color = "primary" sx={{ m:'1px' }} />
                            </ListItem>
                        }

                        {(!isProblemLoading && problemStatusMessage == null) &&
                            //show success information here
                            <div>
                                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                                    <Link color="text.primary" href={problemURL} target="_blank" variant="body1" sx={{mt : 1}}>
                                        {problemTitle}
                                    </Link>
                                </ListItem>

                                <Divider variant="middle" />

                                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                                    <Typography variant="body1" sx={problemDiffStyle}>
                                        {problemDifficulty}
                                    </Typography>
                                </ListItem>

                                <Divider variant="middle" />

                                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>

                                    <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                        {texts_en.recordACCount}
                                    </Typography>

                                    <Typography variant="body1" sx={styles.listItemRightStyle}>
                                        {recordAcceptedCount}
                                    </Typography>

                                </ListItem>

                                <Divider variant="middle" />

                                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>

                                    <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                        {texts_en.recordAverageProficiency}
                                    </Typography>

                                    <div style={styles.listItemRightStyle}>
                                        <ProficiencyBarExistLarge defaultValue={recordAverageProficiency} />
                                    </div>

                                </ListItem>

                                <Divider variant="middle" />

                                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>

                                    <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                    {texts_en.recordRecentProficiency}
                                    </Typography>

                                    <div style={styles.listItemRightStyle}>
                                        <ProficiencyBarExistLarge defaultValue={recordRecentProficiency} />
                                    </div>

                                </ListItem>
                            </div>
                        }

                        {problemStatusMessage != null &&
                            //show status information here
                            <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                                <Typography variant="body1" sx={{mt : 1}}>
                                    {problemStatusMessage}
                                </Typography>
                            </ListItem>
                        }
                        
                    </List>
                </Paper>

                <ProblemSolveRecordList titleSlug={titleSlug} isProblemLoading={isProblemLoading} />
            </Container>
            

            <Container maxWidth={false} disableGutters sx={globalStyles.component.subContainer.flexColumnAlignCenter.withMargin}>
                <Paper variant="outlined" elevation={10} sx={globalStyles.component.mainPaper.withMargin}>

                    {problemStatusMessage == null && <div>
                    <List sx={{ alignItems:'center', justifyItems:'center'}}>

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="h4" sx={{}}>New Solve Record!</Typography>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>

                            <div style={styles.listItemRightStyle} >
                                <ToggleButtonGroup
                                    value={solveProficiency}
                                    exclusive
                                    onChange={onSolveProficiencyChange}
                                    orientation='vertical'
                                >
                                    <ToggleButton value={0} sx={styles.proficiencyButtonStyle}>
                                        <SentimentDissatisfiedIcon fontSize="large" sx={solveProficiency == 0 ? {color:'darkred'} : {}}/>
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>完全没有做出来</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={1} sx={styles.proficiencyButtonStyle}>
                                        <LooksOneIcon fontSize="large" sx={solveProficiency == 1 ? {color:'red'}: {}} />
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>有想法但没写出来</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={2} sx={styles.proficiencyButtonStyle}>
                                        <LooksTwoIcon fontSize="large" sx={solveProficiency == 2 ? {color:'orange'}: {}} />
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>写出来但没有全过</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={3} sx={styles.proficiencyButtonStyle}>
                                        <Looks3Icon fontSize="large" sx={solveProficiency == 3 ? {color:'gold'}: {}} />
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>基本所有case都过了</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={4} sx={styles.proficiencyButtonStyle}>
                                        <Looks4Icon fontSize="large" sx={solveProficiency == 4 ? {color:'YellowGreen'}: {}} />
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>掌握的不错, 差一点就秒了</Typography>
                                    </ToggleButton>
                                    <ToggleButton value={5} sx={styles.proficiencyButtonStyle}>
                                        <Looks5Icon fontSize="large" sx={solveProficiency == 5 ? {color:'LimeGreen'}: {}} />
                                        <Typography variant="body1" sx={styles.listItemRightStyle}>这什么弱智题也配让我做</Typography>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>

                        </ListItem>

                        {isSolveLoading && 
                            <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                                <CircularProgress color = "primary" sx={{ m:'1px' }} />
                            </ListItem>
                        }

                        {solveStatusMessage != null && (
                            <Alert onClose={onSolveErrorMsgClose} severity="error" sx = {{mt: 2}}>
                                {solveStatusMessage}
                            </Alert>
                        )}

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Button variant="contained" sx={{mt: 1}} onClick={onSubmitSolve} disabled={solveProficiency < 0 || solveProficiency > 5} >
                                <Typography>Submit Record</Typography>
                            </Button>
                        </ListItem>
                        
                    </List>
                    </div>}
                </Paper>
            </Container>

        </Container>
    );
}

export default ProblemRecord;
