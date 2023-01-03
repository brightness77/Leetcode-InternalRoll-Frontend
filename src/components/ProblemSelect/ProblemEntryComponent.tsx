import { Divider, List, ListItem, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import twoImg from "../../static/img/jieni_1.png";
import { useCallback, useEffect, useState } from "react";


const styles = {

    imgStyle : {
        width : '80%',
    },

}



function ProblemEntry (
    {
        isLoading, 
        statusMessage,
        problemEntryResponse, 
    } : {
        isLoading : boolean, 
        statusMessage: (string | null), 
        problemEntryResponse : any,
    }
): React.ReactElement {

    //variables
    const navigate = useNavigate();
    const [problemTitle, setProblemTitle] = useState('');
    const [problemDifficulty, setProblemDifficulty] = useState('');
    const [problemDiffStyle, setProblemDiffStyle] = useState(globalStyles.diffText.easy);
    const [problemNagivation, setProblemNagivation] = useState('/random-problem');


    //handlers
    const onProblemButtonClick = useCallback(() => {
        navigate(problemNagivation);
    }, [problemNagivation]);


    useEffect(() => {

        if(problemEntryResponse == null){
            return;
        }

        setProblemTitle(problemEntryResponse.frontendID + ". " + problemEntryResponse.title);
        if(problemEntryResponse.difficulty == 1){
            setProblemDifficulty(texts_en.problemDifficulty1);
            setProblemDiffStyle(globalStyles.diffText.easy);
        } else if (problemEntryResponse.difficulty == 2){
            setProblemDifficulty(texts_en.problemDifficulty2);
            setProblemDiffStyle(globalStyles.diffText.medium);
        } else {
            setProblemDifficulty(texts_en.problemDifficulty3);
            setProblemDiffStyle(globalStyles.diffText.hard);
        }

        setProblemNagivation(`/problemsolve/${problemEntryResponse.titleSlug}`);

    }, [problemEntryResponse]);

    return (
        <Paper variant="outlined" elevation={10} sx={globalStyles.component.mainPaper.withMargin}>

            <List sx={{ alignItems:'center', justifyItems:'center'}}>
                <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                    <Box border={'1px'} borderColor={'secondary'} component='img' src = {twoImg} alt = "ROLL!" sx = {styles.imgStyle} />
                </ListItem>

                <Divider variant="middle" />

                {isLoading && <div>

                    <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                        <Skeleton width={'90%'} height={'40px'} animation="wave" />
                    </ListItem>

                    <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                        <Skeleton width={'40%'} height={'40px'} animation="wave" />
                    </ListItem>

                    <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                        <Skeleton width={'50%'} height={'40px'} animation="wave" />
                    </ListItem>

                </div>}

                {(statusMessage == null && problemEntryResponse != null && !isLoading) &&
                    //show required info here
                    <div>

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="body1" sx={{mt : 1}}>
                                {problemTitle}
                            </Typography>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="body1" sx={problemDiffStyle}>
                                {problemDifficulty}
                            </Typography>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Button variant="contained" sx={{mt: 1}} onClick={onProblemButtonClick}>
                                <Typography variant="h5">Solve Problem!</Typography>
                            </Button>
                        </ListItem>

                    </div>
                }

                {statusMessage != null &&
                    //show status information here
                    <div>

                        <ListItem sx = {globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="body1" sx={{mt : 1}}>{statusMessage}</Typography>
                        </ListItem>

                    </div>
                }
                
            </List>
        </Paper>
    );
};

export default ProblemEntry;
