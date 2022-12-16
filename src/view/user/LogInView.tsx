import { Container } from "@mui/system";
import LogInForm from "../../components/LogInForm";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";



function LogInView() : React.ReactElement {
    

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <LogInForm />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default LogInView;