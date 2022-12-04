import { Alert, Box, Button, CircularProgress, Container, Divider, Link, List, ListItem, Paper, Slider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { globalMessages } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import pika from "../../static/img/thoughtful-pikachu.gif";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import Looks6Icon from '@mui/icons-material/Looks6';
import { TIMEOUT } from "dns";
import { Navigate, useNavigate } from "react-router-dom";


const styles = {

    mainContainerStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        mt: '5%',
    },

    imgStyle : {
        width : '300px',
        height : '180px',
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

    listItemLeftStyle : {
        mr:'50px',
        flexGrow : 0,
    },

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
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
        width:'550px',
    }

};




function ProficiencyBarExist (
    { defaultValue } : { defaultValue : number }
) : ReactElement {

    const roundedValue = Math.round(defaultValue);

    return (
        <ToggleButtonGroup
            value={roundedValue}
            exclusive
            disabled
            sx={styles.listItemRightStyle}
        >
            <ToggleButton value={0}>
                <SentimentDissatisfiedIcon fontSize={roundedValue == 0 ? "large" : "medium"} sx={roundedValue == 0 ? {color:'darkred'} : {}}/>
            </ToggleButton>
            <ToggleButton value={1}>
                <LooksOneIcon fontSize={roundedValue == 1 ? "large" : "medium"} sx={roundedValue == 1 ? {color:'red'}: {}} />
            </ToggleButton>
            <ToggleButton value={2}>
                <LooksTwoIcon fontSize={roundedValue == 2 ? "large" : "medium"} sx={roundedValue == 2 ? {color:'orange'}: {}} />
            </ToggleButton>
            <ToggleButton value={3}>
                <Looks3Icon fontSize={roundedValue == 3 ? "large" : "medium"} sx={roundedValue == 3 ? {color:'gold'}: {}} />
            </ToggleButton>
            <ToggleButton value={4}>
                <Looks4Icon fontSize={roundedValue == 4 ? "large" : "medium"} sx={roundedValue == 4 ? {color:'YellowGreen'}: {}} />
            </ToggleButton>
            <ToggleButton value={5}>
                <Looks5Icon fontSize={roundedValue == 5 ? "large" : "medium"}sx={roundedValue == 5 ? {color:'LimeGreen'}: {}} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};





function ProblemRecord(
    { titleSlug } : { titleSlug : (string | undefined), }
) : React.ReactElement {

    const navigate = useNavigate();

    //status variables
    const [isProblemLoading, setIsProblemLoading] = useState(false);
    const [isProblemSuccess, setIsProblemSuccess] = useState(false);

    //problem variables
    const [problemStatusMessage, setProblemStatusMessage] = useState(globalMessages.invalidProblemMessage);
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState(styles.easyDiff);
    const [problemURL, setProblemURL] = useState('https://www.google.com');

    //problem record variables
    const [recordAcceptedCount, setRecordAcceptedCount] = useState(0);
    const [recordAverageProficiency, setRecordAverageProficiency] = useState(0);
    const [recordRecentProficiency, setRecordRecentProficiency] = useState(0);




    //problem & problem record handlers
    const onProblemRequestStart = useCallback(() => {

        setIsProblemLoading(true);
        setIsProblemSuccess(false);
    }, []);

    const onProblemRequestSuccess = useCallback((e: any) => {
        console.log('success');

        const parsedResponse = JSON.parse(e);
        
        //set title
        setProblemTitle(parsedResponse.problemEntry.frontendID + ". " + parsedResponse.problemEntry.title);

        //set url
        setProblemURL(parsedResponse.problemEntry.url);

        //set diff
        if(parsedResponse.problemEntry.difficulty == 1){
            setProblemDifficulty('Easy');
            setProblemDiffStyle(styles.easyDiff);
        } else if (parsedResponse.problemEntry.difficulty == 2){
            setProblemDifficulty('Medium');
            setProblemDiffStyle(styles.mediumDiff);
        } else {
            setProblemDifficulty('Hard');
            setProblemDiffStyle(styles.hardDiff);
        }

        //set record
        setRecordAcceptedCount(parsedResponse.acceptedCount);
        setRecordAverageProficiency(parsedResponse.averageProficiency);
        setRecordRecentProficiency(parsedResponse.recentProficiency);


        setIsProblemLoading(false);
        setIsProblemSuccess(true);
    }, []);

    const onProblemRequestFailure = useCallback((e: any, status: number) => {
        console.log('failure');

        if(status === 504) {
            setProblemStatusMessage(globalMessages.serverErrorMessage);
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
        setIsProblemSuccess(false);
    }, []);

    const onProblemRequestError = useCallback(() => {
        console.log('error');

        setProblemStatusMessage(globalMessages.serverErrorMessage);

        setIsProblemLoading(false);
        setIsProblemSuccess(false);
    }, []);


    //fetching problem
    const getProblemRecord = useEffect(() => {
        new LeetcodeRequest(`problemrecord/${titleSlug}`, 'GET')
        .onStart(onProblemRequestStart)
        .onSuccess(onProblemRequestSuccess)
        .onFailure(onProblemRequestFailure)
        .onError(onProblemRequestError)
        .send();

        console.log('Request sent');
    }, [titleSlug]);




    //problem solve record variables
    const [isSolveLoading, setIsSolveLoading] = useState(false);

    const [solveProficiency, setSolveProficiency] = useState(-1);
    const [solveStatusMessage, setSolveStatusMessage] = useState<string | null>(null);


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
        
        navigate(`/problemsolve/${titleSlug}`);
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
        new LeetcodeRequest(`problemrecord/${titleSlug}/createSolve?proficiency=${solveProficiency}`, 'GET')
        .onStart(onSolveStart)
        .onSuccess(onSolveSuccess)
        .onFailure(onSolveFailure)
        .onError(onSolveError)
        .send();
    }, [solveProficiency]);




    return (
        <Container component = "main" maxWidth={false} sx = {styles.mainContainerStyle}>

            {/* problem solve part */}
            <Paper variant="outlined" elevation={10} sx={styles.paperStyle}>

                <List sx={{ alignItems:'center', justifyItems:'center'}}>
                    <ListItem sx = {styles.listItemStyle}>
                        <Box border={'1px'} borderColor={'secondary'} component='img' src = {pika} alt = "ROLL!" sx = {styles.imgStyle} />
                    </ListItem>

                    <Divider variant="middle" />

                    {isProblemLoading && 
                        <ListItem sx = {styles.listItemStyle}>
                            <CircularProgress color = "primary" sx={{ m:'1px' }} />
                        </ListItem>
                    }

                    {(!isProblemLoading && isProblemSuccess) &&
                        //show success information here
                        <div>
                            <ListItem sx = {styles.listItemStyle}>
                                <Link href={problemURL} target="_blank" >
                                    <Typography variant="body1" sx={{mt : 1}}>
                                        {problemTitle}
                                    </Typography>
                                </Link>
                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.listItemStyle}>
                                <Typography variant="body1" sx={problemDiffStyle}>
                                    {problemDifficulty}
                                </Typography>
                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.listItemStyle}>

                                <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                    刷题次数
                                </Typography>

                                <Typography variant="body1" sx={styles.listItemRightStyle}>
                                    {recordAcceptedCount}
                                </Typography>

                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.listItemStyle}>

                                <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                    总体熟练度
                                </Typography>

                                <div style={styles.listItemRightStyle}>
                                    <ProficiencyBarExist defaultValue={recordAverageProficiency} />
                                </div>

                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.listItemStyle}>

                                <Typography variant="body1" sx={styles.listItemLeftStyle}>
                                    最近熟练度
                                </Typography>

                                <div style={styles.listItemRightStyle}>
                                    <ProficiencyBarExist defaultValue={recordRecentProficiency} />
                                </div>

                            </ListItem>
                        </div>
                    }

                    {(!isProblemLoading && !isProblemSuccess) &&
                        //show status information here
                        <div>

                            <ListItem sx = {styles.listItemStyle}>
                                <Typography variant="body1" sx={{mt : 1}}>
                                    {problemStatusMessage}
                                </Typography>
                            </ListItem>

                        </div>
                    }
                    
                </List>
            </Paper>
            
            {/* solve record part */}
            <Paper variant="outlined" elevation={10} sx={styles.paperStyle}>

                {isProblemSuccess && <div>
                <List sx={{ alignItems:'center', justifyItems:'center'}}>

                    <ListItem sx = {styles.listItemStyle}>
                        <Typography variant="h4" sx={styles.listItemLeftStyle}>
                            新的做题记录
                        </Typography>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx = {styles.listItemStyle}>

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
                        <ListItem sx = {styles.listItemStyle}>
                            <CircularProgress color = "primary" sx={{ m:'1px' }} />
                        </ListItem>
                    }

                    {solveStatusMessage != null && (
                        <Alert onClose={onSolveErrorMsgClose} severity="error" sx = {{mt: 2}}>
                            {solveStatusMessage}
                        </Alert>
                    )}

                    <ListItem sx = {styles.listItemStyle}>
                        <Button variant="contained" sx={{mt: 1}} onClick={onSubmitSolve} disabled={solveProficiency < 0 || solveProficiency > 5} >
                            <Typography>
                                提交刷题记录
                            </Typography>
                        </Button>
                    </ListItem>
                    
                </List>
                </div>}
            </Paper>

        </Container>
    );
}

export default ProblemRecord;
