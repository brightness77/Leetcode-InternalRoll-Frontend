import CheckUser from "../components/CheckUser";
import TopBar from "./TopBar";
import {Container} from "@mui/material";


function CheckUserView(): React.ReactElement {

    return (
        <>
            <TopBar />
            <Container sx = {{pt: '5%'}}>
                <CheckUser />
            </Container>
        </>
    )
}

export default CheckUserView;