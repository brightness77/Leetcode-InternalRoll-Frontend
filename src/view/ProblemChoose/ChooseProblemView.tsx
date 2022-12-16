import { Container } from "@mui/material";
import ChooseProblem from "../../components/ProblemSelect/ChooseProblem";
import RandomProblem from "../../components/ProblemSelect/RandomProblem";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";




function ChooseProblemView(): React.ReactElement {


    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container fixed maxWidth={false} sx = {globalStyles.viewWholeContainerStyle}>
                <ChooseProblem />
            </Container>

            <FooterComponent />
        </Container>
    )
};

export default ChooseProblemView;