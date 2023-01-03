import { Link, Button, Divider, FormControl, FormHelperText, InputLabel, LinearProgress, List, ListItem, MenuItem, OutlinedInput, Pagination, Paper, Select, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import RunContext from "../../context/RunContextProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import { topicTags } from "../../context/TopicTags";
import ProficiencyBarExist from "../Model/ProficiencyBarExist";



const styles = {

    listItemLeftStyle : {
        mr:'50px',
        flexGrow : 0,
    },

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    tableHeadText : {
        color: '#eb9808',
        fontWeight: 'bold',
    },

    proficiencyButtonStyle : {
        width:'30px',
        height:'30px',
    },

    proficiencyButtonChosenStyle : {
        width:'40px',
        height:'40px',
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




function MyRecordComponent(
    {topicSlug} : {topicSlug : (string | undefined)}
) : React.ReactElement {

    const navigate = useNavigate();

    const {username} = useContext(RunContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const [records, setRecords] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {

        try {
            const parsedResponse = JSON.parse(response);

            //console.log(parsedResponse);

            setRecords(parsedResponse.content);
            setTotalPage(parsedResponse.totalPages);

        } catch (e) {
            setRecords([]);
        }

        setIsLoading(false);
        setStatusMessage(null);

    }, [records]);

    const onRequestFailure = useCallback((response : any, status : number) => {
        if(status === 401){
            setStatusMessage(globalMessages.loginRequiredMessage);
        } else {
            setStatusMessage(globalMessages.serverErrorMessage);
        }
        
        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);
    }, []);


    function getDiff(diffNum : number) : string {
        if(diffNum === 1){
            return texts_en.problemDifficulty1;
        } else if (diffNum === 2){
            return texts_en.problemDifficulty2;
        } else {
            return texts_en.problemDifficulty3;
        }
    };


    function getDiffStyle(diffNum : number) : any {
        if(diffNum === 1){
            return globalStyles.diffText.easy;
        } else if (diffNum === 2){
            return globalStyles.diffText.medium;
        } else {
            return globalStyles.diffText.hard;
        }
    };

    const onPageChange = useCallback((e: any, value: number) => {
        setCurrentPage(value);
    }, [currentPage, totalPage, records]);

    const onTopicTagChange = useCallback((e : any) => {
        navigate(`/my/record/${e.target.value}`);
    }, [topicSlug]);

    useEffect(() => {
        let callURL;
        if(topicSlug === 'All'){
            callURL = `problemrecord/allRecord?page=${currentPage - 1}&size=${pageSize}`;
        } else {
            callURL = `problemrecord/allRecord?page=${currentPage - 1}&size=${pageSize}&topicTag=${topicSlug}`;
        }

        //calls
        new LeetcodeRequest(callURL, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();

    }, [currentPage, totalPage, pageSize, topicSlug]);


    
    return (
        <Container maxWidth="lg" sx={globalStyles.component.mainContainer.flexColumnAlignCenter.withGap}>

            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant="h4">My Problem Solve Record</Typography>
                    </ListItem>

                    <Divider variant="middle" />

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <FormControl sx={{ m: '2px', minWidth: '200px'}}>
                            <InputLabel>Topic Tag</InputLabel>
                            <Select
                                value={topicSlug}
                                onChange={onTopicTagChange}
                                input={<OutlinedInput label="Topic Tag" />}
                                MenuProps={styles.MenuProps}
                            >
                                <MenuItem value='All'><em>All</em></MenuItem>

                                {topicTags.map((name) => (
                                    <MenuItem
                                        value={name}
                                    >
                                        {name}
                                    </MenuItem>
                            ))}
                            </Select>
                            <FormHelperText>Check my record for specific topic tags</FormHelperText>
                        </FormControl>
                    </ListItem>

                </List>
            </Paper>

            {isLoading && <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    {[...Array(pageSize)].map((v, i) => (
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Skeleton animation="wave" sx={{width:'70%', height:'40px', }} />
                    </ListItem>))}
                </List>
            </Paper> }

            {statusMessage != null && 
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant="h6">{statusMessage}</Typography>
                    </ListItem>
                </List>
            </Paper>}

            {!isLoading && statusMessage == null && records.length === 0 &&
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant="h6">{globalMessages.listExceptions.noProblemRecord}</Typography>
                    </ListItem>
                </List>
            </Paper>}

            {statusMessage == null && !isLoading && records.length !== 0 &&
            <TableContainer component={Paper} variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{height:'50px'}}>
                            <TableCell sx={styles.tableHeadText}>ID</TableCell>
                            <TableCell sx={styles.tableHeadText}>Title</TableCell>
                            <TableCell sx={styles.tableHeadText}>Difficulty</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Accepted Count</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Average Proficiency</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Recent Proficiency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record:any) => (
                            <TableRow>
                                <TableCell>{record.problemEntry.frontendID}</TableCell>
                                <TableCell align='left'>
                                    <Link color='text.primary' variant="body2" underline="hover" href={`/problemsolve/${record.problemEntry.titleSlug}`}>
                                        {record.problemEntry.title}
                                    </Link>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='body1' sx={getDiffStyle(record.problemEntry.difficulty)}>
                                        {getDiff(record.problemEntry.difficulty)}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>{record.acceptedCount}</TableCell>
                                <TableCell align='center'>{<ProficiencyBarExist defaultValue={record.averageProficiency} />}</TableCell>
                                <TableCell align='center'>{<ProficiencyBarExist defaultValue={record.recentProficiency} />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            {statusMessage == null && !isLoading && records.length !== 0 &&
            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Pagination count={totalPage} page={currentPage} onChange={onPageChange} />
                    </ListItem>
                </List>
            </Paper>}

        </Container>
    );
};

export default MyRecordComponent;
