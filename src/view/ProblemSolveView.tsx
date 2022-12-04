import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "./TopBar";
import { useState } from "react";
import ProblemRecord from "../components/ProblemSolve/ProblemRecord";




function ProblemSolveView() : React.ReactElement {

    const {titleSlug : problemTitleSlug} = useParams();
    
    

    return (
        <>
            <TopBar />
            <Container sx={globalStyles.viewWholeContainerStyle}>
                <ProblemRecord titleSlug={problemTitleSlug} />
            </Container>
        </>
    );
};

export default ProblemSolveView;
