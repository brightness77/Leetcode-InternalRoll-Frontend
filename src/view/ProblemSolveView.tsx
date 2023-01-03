import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "../components/Bar/TopBar";
import { useState } from "react";
import ProblemRecord from "../components/ProblemSolve/ProblemRecordHome";
import FooterComponent from "../components/Bar/FooterComponent";



function ProblemSolveView() : React.ReactElement {

    const {titleSlug} = useParams();
    
    

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx={globalStyles.viewWholeContainerStyle}>
                <ProblemRecord titleSlug={titleSlug} />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default ProblemSolveView;
