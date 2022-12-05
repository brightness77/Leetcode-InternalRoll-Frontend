import { Button, LinearProgress, Paper, Skeleton, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalMessages } from "../../context/ConfigProvider";
import RunContext from "../../context/RunContextProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";



const styles = {

    wholeContainerStyle : {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        mt: '5%',
    },

    wholePaperStyle : {
        m:'10px',
        width : '75%',
        minWidth : '1200px',
        minHeight : '200px',
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
    },

    tableHeadText : {
        fontSize: '25px',
        color: '#eb9808',
    },

};


function MyRecordComponent() : React.ReactElement {

    const navigate = useNavigate();

    const {username} = useContext(RunContext);
    
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const [records, setRecords] = useState<any>([]);

    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {
        setIsLoading(false);
        setStatusMessage(null);

        const parsedResponse = JSON.parse(response);
        setRecords(parsedResponse);
    }, [records]);

    const onRequestFailure = useCallback((response : any, status : number) => {
        if(status === 401){
            navigate('/login');
        }
        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);
    }, []);

    const onRequestError = useCallback(() => {
        setIsLoading(false);
        setStatusMessage(globalMessages.serverErrorMessage);
    }, []);

    useEffect(() => {

        new LeetcodeRequest('problemrecord/allRecord', 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();

    }, []);


    return (
        <Container sx={styles.wholeContainerStyle}>
            {isLoading && <>
                <LinearProgress sx={{width:'70%'}} />
                <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
                <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
                <Skeleton animation="wave" sx={{width:'70%', height:'40px'}} />
            </> }

            {statusMessage != null && <Typography>{statusMessage}</Typography>}

            {statusMessage == null && <TableContainer component={Paper} variant="outlined" sx={styles.wholePaperStyle}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{height:'50px'}}>
                            <TableCell sx={styles.tableHeadText}>ID</TableCell>
                            <TableCell sx={styles.tableHeadText}>Title</TableCell>
                            <TableCell align='right' sx={styles.tableHeadText}>刷题次数</TableCell>
                            <TableCell align='right' sx={styles.tableHeadText}>总体熟练度</TableCell>
                            <TableCell align='right' sx={styles.tableHeadText}>最近熟练度</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((record:any) => (
                            <TableRow>
                                <TableCell>{record.problemEntry.frontendID}</TableCell>
                                <TableCell>
                                    <Button onClick={() => { navigate(`/problemsolve/${record.problemEntry.titleSlug}`); }}>
                                        <Typography variant="body1" sx={{color:'primary'}}>{record.problemEntry.title}</Typography>
                                    </Button>
                                </TableCell>
                                <TableCell align='center'>{record.acceptedCount}</TableCell>
                                <TableCell align='center'>{Math.round(record.averageProficiency * 10) / 10}</TableCell>
                                <TableCell align='center'>{record.recentProficiency}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </Container>
    );
};

export default MyRecordComponent;
