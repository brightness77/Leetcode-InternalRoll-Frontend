import { List, Paper } from "@mui/material";
import Container from "@mui/material/Container/Container";
import Divider from "@mui/material/Divider/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { globalColors, globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";


const styles = {

    diffTextStyle : {
        flexGrow : 0,
        width: '120px',
    },

    barStyle : {
        flexGrow : 1,
        height : '5px',
        ml: '30px',
        mr: '30px',
        mt: '10px',
        mb: '10px',
    },

    barAll : {
        backgroundColor: globalColors.diff.all.background,
        '& .MuiLinearProgress-bar': { backgroundColor: globalColors.diff.all.normal, },
        height:'6px',
    },

    barEasy : {
        backgroundColor: globalColors.diff.easy.background,
        '& .MuiLinearProgress-bar': { backgroundColor: globalColors.diff.easy.normal, },
    },

    barMedium : {
        backgroundColor: globalColors.diff.medium.background,
        '& .MuiLinearProgress-bar': { backgroundColor: globalColors.diff.medium.normal, },
    },

    barHard : {
        backgroundColor: globalColors.diff.hard.background,
        '& .MuiLinearProgress-bar': { backgroundColor: globalColors.diff.hard.normal, },
    },

    progressionTextStyle : {
        flexGrow : 0,
        width: '200px',
    },

    skeletonStyle : {
        width : '90%',
        mt:'5px',
        mb:'5px',
    },

};



function UserACStats(
    {username} : {username : (string | undefined)}
) : React.ReactElement {

    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    
    const [easyProgress, setEasyProgress] = useState(0);
    const [mediumProgress, setMediumProgress] = useState(0);
    const [hardProgress, setHardProgress] = useState(0);
    const [allProgress, setAllProgress] = useState(0);

    const [easyAC, setEasyAC] = useState(0);
    const [easyTotal, setEasyTotal] = useState(0);
    const [mediumAC, setMediumAC] = useState(0);
    const [mediumTotal, setMediumTotal] = useState(0);
    const [hardAC, setHardAC] = useState(0);
    const [hardTotal, setHardTotal] = useState(0);
    const [allAC, setAllAC] = useState(0);
    const [allTotal, setAllTotal] = useState(0);

    const skeletonLength = 4;



    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response: any) => {
        const parsedResponse = JSON.parse(response);

        setEasyAC(parsedResponse.easyAC);
        setEasyTotal(parsedResponse.easyTotal);
        setEasyProgress(parsedResponse.easyAC / parsedResponse.easyTotal * 100);

        setMediumAC(parsedResponse.mediumAC);
        setMediumTotal(parsedResponse.mediumTotal);
        setMediumProgress(parsedResponse.mediumAC / parsedResponse.mediumTotal * 100);

        setHardAC(parsedResponse.hardAC);
        setHardTotal(parsedResponse.hardTotal);
        setHardProgress(parsedResponse.hardAC / parsedResponse.hardTotal * 100);

        setAllAC(parsedResponse.allAC);
        setAllTotal(parsedResponse.allTotal);
        setAllProgress(parsedResponse.allAC / parsedResponse.allTotal * 100);
        
        setIsLoading(false);
        setStatusMessage(null);

    }, []);

    const onRequestFailure = useCallback((response: any, status: number) => {
        //console.log("Failure");
        const parsedResponse = JSON.parse(response);
        if(response.message === 'Username not found'){
            setStatusMessage(globalMessages.usernameNotFoundMessage);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }

        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        //console.log("Error");
        setStatusMessage(globalMessages.serverErrorMessage);

        setIsLoading(false);
    }, []);


    useEffect(() => {
        const url = `users/acstats/${username}`;

        new LeetcodeRequest(url, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, []);

    return (
        <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
            <List sx={globalStyles.component.list.listParent}>

                {isLoading && <div>
                    {[...Array(skeletonLength)].map(() => (
                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Skeleton animation="wave" sx={styles.skeletonStyle} />
                        </ListItem>
                    ))}
                </div>}

                {statusMessage != null && 
                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant='h5'>{statusMessage}</Typography>
                </ListItem>}

                {statusMessage == null && <div>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant='h5'>AC Stats</Typography>
                    </ListItem>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Container maxWidth={false} disableGutters sx={styles.diffTextStyle}>
                            <Typography variant='h6'>{texts_en.problemDifficulty0}</Typography>
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.barStyle}>
                            <LinearProgress variant='determinate' color='primary' value={allProgress} sx={styles.barAll} />
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.progressionTextStyle}>
                            <Typography variant='body2' >{allAC} / {allTotal}</Typography>
                        </Container>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Container maxWidth={false} disableGutters sx={styles.diffTextStyle}>
                            <Typography variant='h6' sx={globalStyles.diffText.easy}>{texts_en.problemDifficulty1}</Typography>
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.barStyle}>
                            <LinearProgress variant='determinate' color='primary' value={easyProgress} sx={styles.barEasy} />
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.progressionTextStyle}>
                            <Typography variant='body2' >{easyAC} / {easyTotal}</Typography>
                        </Container>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Container maxWidth={false} disableGutters sx={styles.diffTextStyle}>
                            <Typography variant='h6' sx={globalStyles.diffText.medium}>{texts_en.problemDifficulty2}</Typography>
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.barStyle}>
                            <LinearProgress variant='determinate' value={mediumProgress} sx={styles.barMedium} />
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.progressionTextStyle}>
                            <Typography variant='body2' >{mediumAC} / {mediumTotal}</Typography>
                        </Container>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Container maxWidth={false} disableGutters sx={styles.diffTextStyle}>  
                            <Typography variant='h6' sx={globalStyles.diffText.hard}>{texts_en.problemDifficulty3}</Typography>
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.barStyle}>
                            <LinearProgress variant='determinate' value={hardProgress} sx={styles.barHard} />
                        </Container>
                        <Container maxWidth={false} disableGutters sx={styles.progressionTextStyle}>
                            <Typography variant='body2' >{hardAC} / {hardTotal}</Typography>
                        </Container>
                    </ListItem>
                </div>}

            </List>
        </Paper>
    );
};

export default UserACStats;
