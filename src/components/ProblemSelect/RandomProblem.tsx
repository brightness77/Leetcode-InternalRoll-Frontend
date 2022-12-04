import { Theme } from "@emotion/react";
import { Button, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, LinearProgress, Link, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useCallback, useState } from "react";
import { globalMessages } from "../../context/ConfigProvider";
import twoImg from "../../static/img/two_1.jpeg";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import { topicTags } from "../../context/TopicTags";
import { useNavigate } from "react-router-dom";


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




function RandomProblem(): React.ReactElement {

    const nagivate = useNavigate();

    //input states
    const [inputDiff, setInputDiff] = useState(0);
    const [inputNewOld, setInputNewOld] = useState(true);
    const [inputCategory, setInputCategory] = useState('algorithms');
    const [inputTopicTags, setInputTopicTags] = useState<string[]>([]);
    const [inputProficiencyLow, setInputProficiencyLow] = useState(0);
    const [inputProficiencyHigh, setInputProficiencyHigh] = useState(5);
    const [inputCountMin, setInputCountMin] = useState(0);
    const [inputCountMax, setInputCountMax] = useState(10000000);

    //display props
    const [problemTitle, setProblemTitle] = useState(globalMessages.serverErrorMessage);
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState(styles.easyDiff);
    const [problemNagivation, setProblemNagivation] = useState('/random-problem');

    //display statusMessage
    const [statusMessage, setStatusMessage] = useState('题否');

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
            let parsedResponse = JSON.parse(e);
            if(parsedResponse.message === 'No result found!'){
                setStatusMessage("没有找到符合条件的题!");
            } else {
                setStatusMessage(globalMessages.serverErrorMessage);
            }
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


    const onRandom = useCallback(() => {
        setIsLoading(true);

        let newPayload = {
            newProblem: inputNewOld,
            category: inputCategory,
            topicTags: inputTopicTags,
            difficulties: [inputDiff],
            proficiencyLow: inputProficiencyLow,
            proficiencyHigh: inputProficiencyHigh,
            countMin: inputCountMin,
            countMax: inputCountMax,
        }

        //console.log(newPayload);

        new LeetcodeRequest(`problem/getrandom`, 'POST')
            .setPayload(newPayload)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, [onRequestSuccess, onRequestFailure, onRequestError, 
        inputDiff, inputNewOld, inputCategory, inputTopicTags, inputProficiencyLow, inputProficiencyHigh, inputCountMin, inputCountMax]);




    //input changes

    const onNewOldChange = useCallback((e: any) => {
        if(e.target.value === 'new'){
            setInputNewOld(true);
        } else {
            setInputNewOld(false);
        }
    }, [inputNewOld]);


    const onDiffChange = useCallback((e: any) => {
        setInputDiff(e.target.value);
    }, [inputDiff]);


    const onCategoryChange = useCallback((e: any) => {
        setInputCategory(e.target.value);
    }, [inputCategory]);


    const onTopicTagsChange = useCallback((e : any) => {
        // const {
        //     target : {value},
        // } = e;
        // On autofill we get a stringified value.
        setInputTopicTags(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value);
    }, [inputTopicTags]);


    const onProficiencyLowChange = useCallback((e : any) => {
        setInputProficiencyLow(e.target.value);
    }, [inputProficiencyLow]);

    const onProficiencyHighChange = useCallback((e : any) => {
        setInputProficiencyHigh(e.target.value);
    }, [inputProficiencyHigh]);

    const onCountMinChange = useCallback((e : any) => {
        setInputCountMin(e.target.value);
    }, [inputCountMin]);

    const onCountMaxChange = useCallback((e : any) => {
        setInputCountMax(e.target.value);
    }, [inputCountMax]);


    return (
        <Container component = "main" maxWidth={false} sx = {styles.mainContainerStyle}>

            <Paper variant="outlined" elevation={10} sx={styles.paperStyle}>
                <List sx={{ alignItems:'center', }}>

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="h3" sx={styles.formTitleStyle}>抽抽看吧!</Typography>
                    </ListItem>

                    <Divider variant="middle" />
                    
                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="body1" sx={styles.questionTitleStyle}>题目类型</Typography>

                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="new"
                            name="radio-buttons-group"
                            onChange={onNewOldChange}
                            sx={styles.selectionStyle}
                        >
                            <FormControlLabel value='new' control={<Radio />} label="新题"  sx={styles.radioStyle} />
                            <FormControlLabel value='old' control={<Radio />} label="老题" sx={styles.radioStyle} />
                        </RadioGroup>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="body1" sx={styles.questionTitleStyle}>题目难度</Typography>

                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="0"
                            name="radio-buttons-group"
                            onChange={onDiffChange}
                            sx={styles.selectionStyle}
                        >
                            <FormControlLabel value='0' control={<Radio />} label="All"  sx={styles.radioStyle} />
                            <FormControlLabel value='1' control={<Radio />} label="Easy" sx={styles.radioStyle} />
                            <FormControlLabel value='2' control={<Radio />} label="Medium" sx={styles.radioStyle} />
                            <FormControlLabel value='3' control={<Radio />} label="Hard" sx={styles.radioStyle} />
                        </RadioGroup>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="body1" sx={styles.questionTitleStyle}>题目分类</Typography>

                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue='algorithms'
                            name="radio-buttons-group"
                            onChange={onCategoryChange}
                            sx={styles.selectionStyle}
                        >
                            <FormControlLabel value='algorithms' control={<Radio />} label="Algorithm" sx={styles.radioStyle} />
                            <FormControlLabel value='database' control={<Radio />} label="Database" sx={styles.radioStyle} />
                            <FormControlLabel value='shell' control={<Radio />} label="Shell" sx={styles.radioStyle} />
                        </RadioGroup>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Typography variant="body1" sx={styles.questionTitleStyle}>题目标签</Typography>

                        <div style={styles.selectionStyle}>
                            <FormControl fullWidth sx={{ m: '2px', minWidth: '200px'}}>
                                <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={inputTopicTags}
                                    onChange={onTopicTagsChange}
                                    input={<OutlinedInput label="Name" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={styles.MenuProps}
                                >
                                    {topicTags.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                    </ListItem>

                    <Divider variant="middle" />

                    {!inputNewOld && <div>
                        <ListItem sx = {styles.questionRowListStyle}>
                            <Typography variant="body1" sx={styles.questionTitleStyle}>熟练度</Typography>

                            <TextField
                                sx={styles.shortSelectionStyle}
                                margin="normal"
                                id="proficiencyLow"
                                label="最低熟练度"
                                type="number"
                                defaultValue="0"
                                onChange = {onProficiencyLowChange}
                                variant="outlined"
                            />

                            <Divider orientation="vertical" sx={{ml:'10px', mr:'10px',}}/>

                            <TextField
                                sx={styles.shortSelectionStyle}
                                margin="normal"
                                id="proficiencyHigh"
                                label="最高熟练度"
                                type="number"
                                defaultValue="5"
                                onChange = {onProficiencyHighChange}
                                variant="outlined"
                            />
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Typography variant="body1" sx={styles.questionTitleStyle}>刷题次数</Typography>

                            <TextField
                                sx={styles.shortSelectionStyle}
                                margin="normal"
                                id="countMin"
                                label="最小次数"
                                type="number"
                                defaultValue="0"
                                onChange = {onCountMinChange}
                                variant="outlined"
                            />

                            <Divider orientation="vertical" sx={{ml:'10px', mr:'10px',}}/>

                            <TextField
                                sx={styles.shortSelectionStyle}
                                margin="normal"
                                id="countMax"
                                label="最大次数"
                                type="number"
                                defaultValue="10000000"
                                onChange = {onCountMaxChange}
                                variant="outlined"
                            />
                        </ListItem>

                        <Divider variant="middle" />
                    </div>}

                    <ListItem sx = {styles.questionRowListStyle}>
                        <Button variant = "contained" color = "primary" onClick = {onRandom} sx = {{width: 200, height: 50, margin : 1,}}>
                            <Typography variant="body1">试试手气</Typography>
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
                                <Button variant="outlined" sx={{mt: 1}} onClick={onProblemButtonClick}>
                                    <Typography>
                                        查看题目
                                    </Typography>
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

export default RandomProblem;
