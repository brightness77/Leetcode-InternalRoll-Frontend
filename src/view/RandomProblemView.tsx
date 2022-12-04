import { Container } from "@mui/material";
import RandomProblem from "../components/ProblemSelect/RandomProblem";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "./TopBar";




function RandomProblemView(): React.ReactElement {


    return (
        <>
            <TopBar />
            <Container fixed maxWidth={false} sx = {globalStyles.viewWholeContainerStyle}>
                <RandomProblem />
            </Container>
        </>
    )
};

export default RandomProblemView;
