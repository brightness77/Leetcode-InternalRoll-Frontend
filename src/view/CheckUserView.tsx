import CheckUser from "../components/CheckUser";
import TopBar from "../components/Bar/TopBar";
import {Container} from "@mui/material";
import { globalStyles } from "../context/ConfigProvider"
import FooterComponent from "../components/Bar/FooterComponent";


function CheckUserView(): React.ReactElement {

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx = { globalStyles.viewWholeContainerStyle }>
                <CheckUser />
            </Container>

            <FooterComponent />

        </Container>
    )
}

export default CheckUserView;