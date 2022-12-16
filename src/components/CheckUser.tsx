import { useCallback, useState } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import juan from "../static/img/three_1.jpg";
import {Typography, Container, Box, Button, TextField} from "@mui/material";


const styles = {
    buttonStyle : {
        color : '#101010',
        'font-size' : 25,
        'margin-left' : 50,
    },

    inputBoxStyle : {
        'font-size' : 25,
        'size' : 30,
    }, 

    imageStyle : {
        width: '500px',
        height : '500px',
        mb:'20px',
    }
}


function CheckUser(): React.ReactElement {

    const [usernameInput, setUsernameInput] = useState('');
    const [juanContent, setContent] = useState('目前还没有人卷');

    const onUsernameChange = useCallback((e: any) => {
        //console.log(e.target.value);
        setUsernameInput(e.target.value);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {
        //console.log(response);
        const parsedResponse = JSON.parse(response);
        console.log(usernameInput);
        if(Object.keys(parsedResponse.submissionList).length == 0){
            //not brushed today
            setContent(`${usernameInput} 同学, 没刷题你还来看?`);
        } else {
            let today = parsedResponse.submissionList[0].count;
            if(today < 10){
                let left = 10 - today;
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 还差${left}题就可以下班啦!`);
            } else {
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 已经可以下班啦!`);
            }
        }
        //console.log(juanContent);

    }, [usernameInput]);

    const onRequestFail = useCallback(() => {
        setContent('怎么肥四, 今天还没有人开卷?');
    }, []);

    const onJuan = useCallback(() => {
        //console.log("username is " + usernameInput);
        new LeetcodeRequest(`stats/userToday?username=${usernameInput}`, 'GET')
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, [onRequestSuccess, onRequestFail, usernameInput]);


    return (
        <Container component = "main" sx = {{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box component="form" sx = {{width: 800, display:'flex', flexDirection:'column', alignItems:'center'}}>
                
                <Box component="img" sx={styles.imageStyle} src={juan} alt="ROLL!" />

                <Typography variant="body1">查查憨憨们都刷了多少题</Typography>

                <TextField
                    margin="normal"
                    required
                    
                    id="account"
                    label="Account Name" 
                    autoComplete="leap-code"
                    onChange={onUsernameChange}
                    sx = {{width: 400}}
                />
                <Button variant = "contained" color = "primary" onClick = {onJuan} sx = {{width: 400, mt: 2}}>
                    卷起来
                </Button>
                <Typography variant="body1" sx={{mt : 5}}>
                    {juanContent}
                </Typography>
            </Box>
        </Container>
    );
}

export default CheckUser;
