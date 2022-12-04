import { Container } from "@mui/system";
import { ReactElement } from "react";
import AdminComponent from "../components/Admin/AdminComponent";
import { globalStyles } from "../context/ConfigProvider";
import TopBar from "./TopBar";


function AdminView() : ReactElement {

    return (
        <>
            <TopBar />
            <Container sx={globalStyles.viewWholeContainerStyle}>
                <AdminComponent />
            </Container>
        </>
    );
};

export default AdminView;