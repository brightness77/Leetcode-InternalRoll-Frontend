import { Container } from "@mui/system";
import SignUpForm from "../components/SignUpForm";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "./TopBar";



function SignUpView() : React.ReactElement {
    

    return (
        <>
            <TopBar />
            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <SignUpForm />
            </Container>
        </>
    );
};

export default SignUpView;