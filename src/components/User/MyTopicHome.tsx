import { Button, Divider, FormControl, FormHelperText, InputLabel, LinearProgress, Link, List, ListItem, MenuItem, OutlinedInput, Pagination, Paper, Select, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessages, globalStyles } from "../../context/ConfigProvider";
import RunContext from "../../context/RunContextProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
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


function MyTopicHome() : ReactElement {

    const navigate = useNavigate();

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

        // if(records.length == 0){
        //     setStatusMessage(globalMessages.listExceptions.noTopicRecord);
        // } else {
        //     setStatusMessage(null);
        // }

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

    const onPageChange = useCallback((e: any, value: number) => {
        setCurrentPage(value);
    }, [currentPage, totalPage, records]);

    useEffect(() => {
        const callURL = `topictag/record?page=${currentPage - 1}&size=${pageSize}`;

        //calls
        new LeetcodeRequest(callURL, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();

    }, [currentPage, totalPage, pageSize]);



    return (
        <Container sx={globalStyles.component.mainContainer.flexColumnAlignCenter.withGap}>

            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant="h4">My Topic Proficiencies</Typography>
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
                        <Typography variant="h6">{globalMessages.listExceptions.noTopicRecord}</Typography>
                    </ListItem>
                </List>
            </Paper>}

            {statusMessage == null && !isLoading && records.length !== 0 &&
            <TableContainer component={Paper} variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{height:'50px'}}>
                            <TableCell sx={styles.tableHeadText}>Topic</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Total Problems</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Total AC</TableCell>
                            <TableCell align='center' sx={styles.tableHeadText}>Proficiency</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record:any) => (
                            <TableRow>
                                <TableCell align='left'>
                                    <Link color='text.primary' variant="body2" underline="hover" href={`/my/record/${record.topicTag.name}`}>
                                        {record.topicTag.name}
                                    </Link>
                                </TableCell>
                                <TableCell align='center'>{record.totalProblems}</TableCell>
                                <TableCell align='center'>{record.totalAC}</TableCell>
                                <TableCell align='center'>{<ProficiencyBarExist defaultValue={record.averageProficiency} />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            {statusMessage == null && !isLoading && records.length !== 0 &&
            <Paper variant="outlined" id="List Bottom" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Pagination count={totalPage} page={currentPage} onChange={onPageChange} />
                    </ListItem>
                </List>
            </Paper>}

        </Container>
    );
};

export default MyTopicHome;
