import { Container } from "@mui/material";
import RandomProblem from "../../components/ProblemSelect/RandomProblem";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";




function RandomProblemView(): React.ReactElement {


    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container fixed maxWidth={false} sx = {globalStyles.viewWholeContainerStyle}>
                <RandomProblem />
            </Container>

            <FooterComponent />
        </Container>
    )
};

export default RandomProblemView;
