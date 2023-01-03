import { useCallback, useState, useEffect } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import {Typography, Container, Stack, Paper, Box, CircularProgress, LinearProgress, List, ListItem, Skeleton, Divider} from "@mui/material";
import { styled } from "@mui/material/styles";
import { globalMessages, globalStyles } from "../context/ConfigProvider";




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

    listStyle : {
        alignItems:'center',
    },

    listItemLeftStyle : {
        mr:'50px',
        flexGrow : 0,
    },

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    listItemStyle : {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'50px',
    },

}



function Billboard(): React.ReactElement {

    const [date, setDate] = useState('');

    const [firstEntry, setFirstEntry] = useState(["无名大佬", 10000]);
    const [secondEntry, setSecondEntry] = useState(["无名大佬", 10000]);
    const [thirdEntry, setThirdEntry] = useState(["无名大佬", 10000]);

    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);


    const onRequestSuccess = useCallback((response : any) => {
        setIsLoading(false);
        setStatusMessage(null);
        
        const parsedResponse = JSON.parse(response);

        setDate(parsedResponse.leetcodeDate);

        setFirstEntry([parsedResponse.billEntryList[0].accountName, parsedResponse.billEntryList[0].count]);
        setSecondEntry([parsedResponse.billEntryList[1].accountName, parsedResponse.billEntryList[1].count]);
        setThirdEntry([parsedResponse.billEntryList[2].accountName, parsedResponse.billEntryList[2].count]);

    }, [firstEntry, secondEntry, thirdEntry, date, statusMessage]);

    const onRequestFail = useCallback(() => {
        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);
    }, []);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    useEffect(() => {

        new LeetcodeRequest('billboard/top3', 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, []);


    return (
        <Container component = "main" sx = {globalStyles.component.mainContainer.flexColumnAlignCenter.withGap}>

            <Paper variant="outlined" sx= {globalStyles.component.mainPaper.withMargin}>

                <List sx={styles.listStyle}>
                    <ListItem sx={styles.listItemStyle}>
                        <Typography variant='h4' sx={{fontWeight:'bold'}}>今日内卷排行榜</Typography>
                    </ListItem>

                    {isLoading && <div style={{width:'100%',}}>
                        <ListItem sx={styles.listItemStyle}>
                            <Skeleton animation="wave" sx={{width:'70%', height:'60px'}} />
                        </ListItem>

                        <ListItem sx={styles.listItemStyle}>
                            <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
                        </ListItem>

                        <ListItem sx={styles.listItemStyle}>
                            <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
                        </ListItem>

                        <ListItem sx={styles.listItemStyle}>
                            <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
                        </ListItem>
                    </div>}

                    {statusMessage != null && <Typography variant="body1">
                        {statusMessage}
                    </Typography>}

                    {!isLoading && statusMessage == null && <div>

                        <Divider variant='middle' />

                        <ListItem sx={styles.listItemStyle}>
                            <Typography variant="body1"> 现在是力扣时间 {date} </Typography>
                        </ListItem>

                        <Divider variant='middle' />

                        <ListItem sx={styles.listItemStyle}>
                            <Typography variant="body1" sx = {{fontSize : 25,}}>
                                1ST!!! : {firstEntry[0]} 同学, 今天已经提交了 {firstEntry[1]} 道题啦!
                            </Typography>
                        </ListItem>

                        <Divider variant='middle' />

                        <ListItem sx={styles.listItemStyle}>
                            <Typography variant="body1" sx = {{fontSize : 22}}>
                                2ND!! : {secondEntry[0]} 同学, 今天已经提交了 {secondEntry[1]} 道题啦!
                            </Typography>
                        </ListItem>

                        <Divider variant='middle' />

                        <ListItem sx={styles.listItemStyle}>
                            <Typography variant="body1" sx = {{fontSize : 20}}>
                                3RD! : {thirdEntry[0]} 同学, 今天已经提交了 {thirdEntry[1]} 道题啦!
                            </Typography>
                        </ListItem>

                    </div>}

                </List>
            </Paper>
        </Container>
    );
}

export default Billboard;
