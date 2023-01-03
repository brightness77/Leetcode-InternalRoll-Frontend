import { Theme } from "@emotion/react";
import { Button, Checkbox, Chip, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, LinearProgress, Link, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, SelectChangeEvent, Skeleton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useCallback, useState } from "react";
import { globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import { topicTags } from "../../context/TopicTags";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import ProblemEntry from "./ProblemEntryComponent";


const styles = {

    imgStyle : {
        width : '400px',
        height : '330px',
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

    //input states
    const [inputDiff, setInputDiff] = useState(0);
    const [inputNewOld, setInputNewOld] = useState(true);
    const [inputCategory, setInputCategory] = useState('algorithms');
    const [inputTopicTags, setInputTopicTags] = useState<string[]>([]);
    const [inputProficiencyLow, setInputProficiencyLow] = useState(0);
    const [inputProficiencyHigh, setInputProficiencyHigh] = useState(5);
    const [inputCountMin, setInputCountMin] = useState(0);
    const [inputCountMax, setInputCountMax] = useState(10000000);

    //variables
    const [problemEntryResponse, setProblemEntryResponse] = useState<any>(null);

    //display status message
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
                setStatusMessage(globalMessages.noQualifiedProblem);
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
            setStatusMessage(globalMessages.noQualifiedProblem);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }

    }, []);


    const onRequestError = useCallback(() => {
        //console.log("Error!");

        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);

    }, []);


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
            .onStart(onRequestStart)
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
        <Container component = "main" maxWidth='lg' disableGutters sx = {globalStyles.component.mainContainer.flexRowAlignFlexStart.withGap}>

            <Container maxWidth={false} disableGutters sx = {globalStyles.component.subContainer.flexColumnAlignCenter.withMargin}>
                <Paper variant="outlined" elevation={10} sx={globalStyles.component.mainPaper.withMargin}>
                    <List sx={{ alignItems:'center', }}>

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Typography variant="h4" sx={styles.formTitleStyle}>Random Problem</Typography>
                        </ListItem>

                        <Divider variant="middle" />
                        
                        <ListItem sx = {styles.questionRowListStyle}>
                            <Typography variant="body1" sx={styles.questionTitleStyle}>Problem Type</Typography>

                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="new"
                                name="radio-buttons-group"
                                onChange={onNewOldChange}
                                sx={styles.selectionStyle}
                            >
                                <FormControlLabel value='new' control={<Radio />} label="New Problem" sx={styles.radioStyle} />
                                <FormControlLabel value='old' control={<Radio />} label="Old Problem" sx={styles.radioStyle} />
                            </RadioGroup>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {styles.questionRowListStyle}>
                            <Typography variant="body1" sx={styles.questionTitleStyle}>Difficulty</Typography>

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
                            <Typography variant="body1" sx={styles.questionTitleStyle}>Category</Typography>

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
                            <Typography variant="body1" sx={styles.questionTitleStyle}>Topic Tags</Typography>

                            <div style={styles.selectionStyle}>
                                <FormControl fullWidth sx={{ m: '2px', minWidth: '250px'}}>
                                    <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
                                    <Select
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
                                <Typography variant="body1" sx={styles.questionTitleStyle}>{texts_en.recordProficiency}</Typography>

                                <TextField
                                    sx={styles.shortSelectionStyle}
                                    margin="normal"
                                    id="proficiencyLow"
                                    label={texts_en.recordProficiencyLow_short}
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
                                    label={texts_en.recordProficiencyHigh_short}
                                    type="number"
                                    defaultValue="5"
                                    onChange = {onProficiencyHighChange}
                                    variant="outlined"
                                />
                            </ListItem>

                            <Divider variant="middle" />

                            <ListItem sx = {styles.questionRowListStyle}>
                                <Typography variant="body1" sx={styles.questionTitleStyle}>{texts_en.recordACCount}</Typography>

                                <TextField
                                    sx={styles.shortSelectionStyle}
                                    margin="normal"
                                    id="countMin"
                                    label={texts_en.recordACCountMin}
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
                                    label={texts_en.recordACCountMax}
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
                                <Typography variant="h5">Lottery!</Typography>
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

export default RandomProblem;
