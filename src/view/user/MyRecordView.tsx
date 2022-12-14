import { Container } from "@mui/system";
import { useParams } from "react-router-dom";
import MyRecordComponent from "../../components/User/MyRecordHome";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";


function MyRecordView() : React.ReactElement {

    const {topicSlug} = useParams();

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx={globalStyles.viewWholeContainerStyle}>
                <MyRecordComponent topicSlug={topicSlug} />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default MyRecordView;
