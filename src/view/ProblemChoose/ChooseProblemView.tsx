import { Container } from "@mui/material";
import ChooseProblem from "../../components/ProblemSelect/ChooseProblem";
import RandomProblem from "../../components/ProblemSelect/RandomProblem";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../TopBar";




function ChooseProblemView(): React.ReactElement {


    return (
        <>
            <TopBar />
            <Container fixed maxWidth={false} sx = {globalStyles.viewWholeContainerStyle}>
                <ChooseProblem />
            </Container>
        </>
    )
};

export default ChooseProblemView;