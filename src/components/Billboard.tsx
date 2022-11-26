import { useCallback, useState, useEffect } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import {Typography, Container, Stack, Paper, Box, CircularProgress} from "@mui/material";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const styles = {
    buttonStyle : {
        color : '#101010',
        'font-size' : 25,
        'margin-left' : 50,
    },

    inputBoxStyle : {
        'font-size' : 25,
        'size' : 30,
    }
}



function Billboard(): React.ReactElement {

    const [date, setDate] = useState('');

    const [firstEntry, setFirstEntry] = useState(["无名大佬", 10000]);
    const [secondEntry, setSecondEntry] = useState(["无名大佬", 10000]);
    const [thirdEntry, setThirdEntry] = useState(["无名大佬", 10000]);

    const [isLoading, setIsLoading] = useState(false);
    const [loadStatus, setLoadStatus] = useState(false);


    const onRequestSuccess = useCallback((response : any) => {
        //console.log(response);
        const parsedResponse = JSON.parse(response);

        setDate(parsedResponse.leetcodeDate);

        setFirstEntry([parsedResponse.billEntryList[0].accountName, parsedResponse.billEntryList[0].count]);
        setSecondEntry([parsedResponse.billEntryList[1].accountName, parsedResponse.billEntryList[1].count]);
        setThirdEntry([parsedResponse.billEntryList[2].accountName, parsedResponse.billEntryList[2].count]);

        setIsLoading(false);
        setLoadStatus(true);

    }, [firstEntry, secondEntry, thirdEntry, date]);

    
    const onRequestFail = useCallback(() => {
        setIsLoading(false);
        setLoadStatus(false);
    }, []);


    useEffect(() => {
        setIsLoading(true);
        setLoadStatus(false);

        new LeetcodeRequest('billboard/top3', 'GET')
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, []);


    return (
        <Box component = "main" sx = {{mt : 5, minheight:600, }}>

            {isLoading && <CircularProgress color = "primary" variant='indeterminate' sx={{margin:1}} />}

            {(!isLoading && !loadStatus) && <Typography variant="body1">
                服务器出问题了呢, 但我也没有办法
            </Typography>}

            {loadStatus && <Container>
                <Typography variant="body1">
                    现在是力扣时间 {date}
                </Typography>
                <Stack spacing= {2}>
                    <Item>
                        <Typography variant="body1" sx = {{fontSize : 30}}>
                            1ST!!! : {firstEntry[0]} 同学, 今天已经提交了 {firstEntry[1]} 道题啦!
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="body1" sx = {{fontSize : 25}}>
                            2ND!! : {secondEntry[0]} 同学, 今天已经提交了 {secondEntry[1]} 道题啦!
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant="body1" sx = {{fontSize : 20}}>
                            3RD! : {thirdEntry[0]} 同学, 今天已经提交了 {thirdEntry[1]} 道题啦!
                        </Typography>
                    </Item>
                </Stack>
            </Container>}
        </Box>
    );
}

export default Billboard;
