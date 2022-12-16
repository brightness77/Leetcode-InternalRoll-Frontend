import { Container } from "@mui/system";
import { ReactElement } from "react";
import AdminComponent from "../components/Admin/AdminComponent";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "../components/Bar/TopBar";
import FooterComponent from "../components/Bar/FooterComponent";


function AdminView() : ReactElement {

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />
            
            <Container sx={globalStyles.viewWholeContainerStyle}>
                <AdminComponent />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default AdminView;