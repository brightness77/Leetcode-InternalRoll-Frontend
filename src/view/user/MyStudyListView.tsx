import { Container } from "@mui/system";
import PlaceholderComponent from "../../components/PlaceholderComponent";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";



function MyStudyListView() : React.ReactElement {
    

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <PlaceholderComponent />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default MyStudyListView;