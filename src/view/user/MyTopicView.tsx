import { Container } from "@mui/system";
import PlaceholderComponent from "../../components/PlaceholderComponent";
import MyTopicHome from "../../components/User/MyTopicHome";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";



function MyTopicView() : React.ReactElement {
    

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <MyTopicHome />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default MyTopicView;