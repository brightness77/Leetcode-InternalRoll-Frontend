import { Button, CircularProgress, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useCallback, useState } from "react";
import twoImg from "../static/img/two_1.jpeg";
import LeetcodeRequest from "../utils/LeetcodeRequest";


const styles = {
    imgStyle : {
        width : 600,
        height : 350
    },

    easyDiff : {
        fontWeight: 'bold',
        color : '#3ac81d'
    },

    mediumDiff : {
        fontWeight: 'bold',
        color : '#d2900c'
    },

    hardDiff : {
        fontWeight: 'bold',
        color : '#d2230c'
    },
};


function RandomProblem(): React.ReactElement {

    const [inputDiff, setInputDiff] = useState(0);

    const [problemTitle, setProblemTitle] = useState('Error');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState(styles.easyDiff);
    const [problemURL, setProblemURL] = useState('https://www.google.com');
    const [problemURLText, setProblemURLText] = useState('有问题, 戳这里');
    const [problemTopicTags, setProblemTopicTags] = useState('');

    const [isLoading, setIsLoading] = useState(false);


    const onRequestSuccess = useCallback((response : any) => {
        //console.log(response);
        const parsedResponse = JSON.parse(response);
        setIsLoading(false);

        if(parsedResponse === null){
            setProblemTitle('怎么肥四,一道题都没有找到!');
            setProblemDifficulty('');

            setProblemURL('https://www.google.com');
            setProblemURLText('有问题, 戳这里');
        } else {
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

            setProblemURL(`https://www.leetcode.com/problems/${parsedResponse.titleSlug}`);
            setProblemURLText('Leetcode.com link: ' + parsedResponse.title);

            let tagStrings = '';
            parsedResponse.topicTags.forEach(function (value : string) {
                //console.log('Parsed topic tags of ' + value);
                tagStrings += (value + ', ');
            });
            setProblemTopicTags(tagStrings);
        }
    }, []);


    const onRequestFail = useCallback(() => {
        setIsLoading(false);
        setProblemTitle('服务器出问题了呢,快去找 poor shawn 算账');
        setProblemDifficulty('');

        setProblemURL('https://www.google.com');
        setProblemURLText('有问题, 戳这里');
    }, []);


    const onRandom = useCallback(() => {
        let diffNum = 0;
        setIsLoading(true);

        new LeetcodeRequest(`problem/getrandom`, 'POST')
            .setPayload({
                categories: ['algorithms'],
                topicTags: [],
                companies: [],
                difficulties: [inputDiff],
            })
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, [onRequestSuccess, onRequestFail, inputDiff]);


    const onDiffChange = useCallback((e: any) => {
        setInputDiff(e.target.value);
    }, [inputDiff]);



    return (
        <Container component = "main" sx = {{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box component="form" sx = {{width: 800, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img src = {twoImg} alt = "ROLL!" style = {styles.imgStyle} />

                <Container sx = {{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', mt: 2,}}>
                    <FormControl sx={{margin : 1,}}>
                        <InputLabel id="diff-select-label">Select Difficulty</InputLabel>
                        <Select
                            labelId="diff-select-label"
                            id="diff-select-label"
                            label="Select Difficulty"
                            color = "primary"
                            value = {inputDiff}
                            onChange = {onDiffChange}
                            sx={{width: 200, height: 50,}}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>Easy</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>Hard</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <Button variant = "contained" color = "primary" onClick = {onRandom} sx = {{width: 200, height: 50, margin : 1,}}>
                        <Typography variant="body1">
                            出一道题吧!
                        </Typography>
                    </Button>
                </Container>

                {isLoading && <CircularProgress color = "primary" sx={{margin:1}} />}

                <Typography variant="body1" sx={{mt : 1}}>
                    {problemTitle}
                </Typography>
                <Typography variant="body1" sx={problemDiffStyle}>
                    {problemDifficulty}
                </Typography>
                <Link href = {problemURL} target="_blank" variant="body1" sx={{}}>
                    {problemURLText}
                </Link>
                <Typography variant="body1" sx={{}}>
                    {problemTopicTags}
                </Typography>
            </Box>
        </Container>
    );
};

export default RandomProblem;
