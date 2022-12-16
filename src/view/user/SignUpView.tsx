import { Container } from "@mui/system";
import SignUpForm from "../../components/SignUpForm";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";



function SignUpView() : React.ReactElement {
    

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />
            
            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <SignUpForm />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default SignUpView;