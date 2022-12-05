import { Container } from "@mui/system";
import LogInForm from "../../components/LogInForm";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../TopBar";



function LogInView() : React.ReactElement {
    

    return (
        <>
            <TopBar />
            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <LogInForm />
            </Container>
        </>
    );
};

export default LogInView;