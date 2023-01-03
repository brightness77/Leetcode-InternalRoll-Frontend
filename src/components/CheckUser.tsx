import { useCallback, useState } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import juan from "../static/img/three_1.jpg";
import {Typography, Container, Box, Button, TextField, Paper, Skeleton} from "@mui/material";
import { globalStyles } from "../context/ConfigProvider";


const styles = {

    formBox:{
        p:'20px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },

    buttonStyle:{
        width:'50%',
        height:'50px',
        mt:'20px',
    },

    inputBoxStyle:{
        'font-size' : 25,
        'size' : 30,
    }, 

    imageStyle:{
        width: '100%',
    },

    skeletonStyle:{
        width:'90%',
        height:'30px',
    },
}


function CheckUser(): React.ReactElement {

    const [usernameInput, setUsernameInput] = useState('');
    const [juanContent, setContent] = useState('查查憨憨们都刷了多少题');

    const [isLoading, setIsLoading] = useState(false);


    const onUsernameChange = useCallback((e: any) => {
        //console.log(e.target.value);
        setUsernameInput(e.target.value);
    }, []);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {
        //console.log(response);
        const parsedResponse = JSON.parse(response);
        console.log(usernameInput);
        if(Object.keys(parsedResponse.submissionList).length === 0){
            //not brushed today
            setContent(`${usernameInput} 同学, 没刷题你还来看?`);
        } else {
            let today = parsedResponse.submissionList[0].count;
            if(today === 0){
                setContent(`${usernameInput} 同学, 没刷题你还来看?`);
            } else if (today < 10){
                let left = 10 - today;
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 还差${left}题就可以下班啦!`);
            } else {
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 已经可以下班啦!`);
            }
        }
        //console.log(juanContent);

        setIsLoading(false);
    }, [usernameInput]);

    const onRequestFail = useCallback(() => {
        setContent('怎么肥四, 今天还没有人开卷?');
        setIsLoading(false);
    }, []);

    const onJuan = useCallback(() => {
        //console.log("username is " + usernameInput);
        new LeetcodeRequest(`stats/userToday?username=${usernameInput}`, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, [onRequestStart, onRequestSuccess, onRequestFail, usernameInput]);


    return (
        <Container component="main" disableGutters maxWidth="xs" sx={globalStyles.component.mainContainer.flexColumnAlignCenter.withGap}>
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>

                <Box component="img" sx={styles.imageStyle} src={juan} alt="ROLL!" />

                <Box component="form" sx = {styles.formBox}>

                    {isLoading && <Skeleton animation="wave" sx={styles.skeletonStyle} />}

                    {!isLoading && <Typography variant="body1">
                        {juanContent}
                    </Typography>}

                    <TextField
                        margin="normal"
                        required
                        label="Leetcode Account Name" 
                        autoComplete="leap-code"
                        onChange={onUsernameChange}
                        fullWidth
                    />

                    <Button variant = "contained" color = "primary" onClick = {onJuan} sx = {styles.buttonStyle}>
                        <Typography variant='h6'>卷起来</Typography>
                    </Button>

                </Box>
            </Paper>
        </Container>
    );
}

export default CheckUser;
