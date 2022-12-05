import { Container } from "@mui/system";
import MyRecordComponent from "../../components/User/MyRecordComponent";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../TopBar";


function MyRecordView() : React.ReactElement {

    return (
        <div>
            <TopBar />
            <Container sx={globalStyles.viewWholeContainerStyle}>
                <MyRecordComponent />
            </Container>
        </div>
    );
};

export default MyRecordView;
