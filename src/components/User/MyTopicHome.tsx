import { Button, Divider, FormControl, FormHelperText, InputLabel, LinearProgress, List, ListItem, MenuItem, OutlinedInput, Pagination, Paper, Select, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { ReactElement, useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <Container sx={globalStyles.component.mainContainer.parentWithGap}>

            <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Typography variant="h4">My Topic Proficiencies</Typography>
                    </ListItem>

                </List>
            </Paper>

            {isLoading && <>
                <LinearProgress sx={{width:'70%', m:'20px',}} />
                {[...Array(pageSize)].map((v, i) => (<Skeleton animation="wave" sx={{width:'70%', height:'40px', m:'10px',}} />))}
            </> }

            {statusMessage != null && <Typography>{statusMessage}</Typography>}

            {statusMessage == null && !isLoading && 
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
                                    <Button onClick={() => {
                                        navigate(`/my/record/${record.topicTag.name}`);
                                        }}>
                                        <TableCell>{record.topicTag.name}</TableCell>
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>{record.totalProblems}</TableCell>
                                <TableCell align='center'>{record.totalAC}</TableCell>
                                <TableCell align='center'>{<ProficiencyBarExist defaultValue={record.averageProficiency} />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}

            <Paper variant="outlined" id="List Bottom" sx={globalStyles.component.mainPaper.withMargin}>
                <List sx={globalStyles.component.list.listParent}>
                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Pagination count={totalPage} page={currentPage} onChange={onPageChange} />
                    </ListItem>
                </List>
            </Paper>

        </Container>
    );
};

export default MyTopicHome;
