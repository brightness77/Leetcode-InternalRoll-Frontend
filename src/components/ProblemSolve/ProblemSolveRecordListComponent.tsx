import { List, Paper, Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container/Container";
import Divider from "@mui/material/Divider/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalColors, globalMessages, globalStyles, texts_en } from "../../context/ConfigProvider";
import LeetcodeRequest from "../../utils/LeetcodeRequest";
import ProficiencyBarExist from "../Model/ProficiencyBarExist";
import ProficiencyIconExist from "../Model/ProficiencyIconExist";


const styles = {

    timeTextStyle : {
        flexGrow : 1,
        ml:'10%',
        mr:'10%',
    },

    proficiencyStyle : {
        flexGrow : 0,
        width : '50px',
        ml:'10%',
        mr:'10%',
    },

    skeletonStyle : {
        width : '90%',
        mt:'5px',
        mb:'5px',
    },

};



function ProblemSolveRecordList(
    {titleSlug, isProblemLoading, } : {titleSlug : (string | undefined), isProblemLoading:boolean,}
) : React.ReactElement {

    const navigate = useNavigate();

    //status message
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    
    const [records, setRecords] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    const skeletonLength = 11;



    const onRequestStart = useCallback(() => {
        setIsLoading(true);
        setStatusMessage(null);
    }, []);

    const onRequestSuccess = useCallback((response: any) => {
        //console.log("Succeed");
        try {
            const parsedResponse = JSON.parse(response);
            //console.log(parsedResponse);

            setRecords(parsedResponse.content);
            setTotalPage(parsedResponse.totalPages);
            console.log(records);

        } catch (e) {
            setRecords([]);
        }

        setIsLoading(false);
        setStatusMessage(null);

    }, []);

    const onRequestFailure = useCallback((response: any, status: number) => {
        //console.log("Failure");
        try{
            const parsedResponse = JSON.parse(response);
            if(response.message === "Problem does not exists!"){
                setStatusMessage(globalMessages.invalidProblemMessage);
            } else {
                setStatusMessage(globalMessages.serverErrorMessage);
            }
        } catch(e){
            
        }

        setIsLoading(false);
    }, []);

    const onRequestError = useCallback(() => {
        //console.log("Error");
        setStatusMessage(globalMessages.serverErrorMessage);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        const url = `problemsolverecord/allsolves/${titleSlug}?page=${currentPage - 1}&size=${pageSize}`;

        new LeetcodeRequest(url, 'GET')
            .onStart(onRequestStart)
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFailure)
            .onError(onRequestError)
            .send();
    }, [currentPage, isProblemLoading]);


    const onPageChange = useCallback((e: any, value: number) => {
        setCurrentPage(value);
    }, [currentPage, totalPage, records]);


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

                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant='h5'>Recent AC Records</Typography>
                </ListItem>

                <Divider variant="middle" />

                {statusMessage != null && 
                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant='h6'>{statusMessage}</Typography>
                </ListItem>}

                {!isLoading && statusMessage == null && records.length == 0 &&
                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant='h6'>{globalMessages.listExceptions.noProblemSolveRecord}</Typography>
                </ListItem>}

                {statusMessage == null && records.length > 0 && <div>
                    {records.map((record:any) => (<div>
                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Container maxWidth={false} disableGutters sx={styles.timeTextStyle}>
                                <Typography variant='body1' >{record.utcEndTime}</Typography>
                            </Container>
                            <Container maxWidth={false} disableGutters sx={styles.proficiencyStyle}>
                                <ProficiencyIconExist defaultValue={record.proficiency}/>
                            </Container>
                        </ListItem>

                        <Divider variant="middle" />
                        
                    </div>))}

                    <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                        <Pagination count={totalPage} page={currentPage} onChange={onPageChange} />
                    </ListItem>
                </div>}

            </List>
        </Paper>
    );
};

export default ProblemSolveRecordList;
