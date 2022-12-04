import CheckUser from "../components/CheckUser";
import TopBar from "./TopBar";
import {Container} from "@mui/material";
import { globalStyles } from "../context/ConfigProvider"


function CheckUserView(): React.ReactElement {

    return (
        <>
            <TopBar />
            <Container sx = { globalStyles.viewWholeContainerStyle }>
                <CheckUser />
            </Container>
        </>
    )
}

export default CheckUserView;