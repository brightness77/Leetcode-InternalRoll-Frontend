import { Container } from "@mui/material";
import RandomProblem from "../components/RandomProblem";
import TopBar from "./TopBar";




function RandomProblemView(): React.ReactElement {


    return (
        <>
            <TopBar />
            <Container sx = {{pt: '5%'}}>
                <RandomProblem />
            </Container>
        </>
    )
};

export default RandomProblemView;
