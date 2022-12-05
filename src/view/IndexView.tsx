import InternalRoll from "../components/CheckUser";
import TopBar from "./TopBar";
import {Container, Typography, Box} from "@mui/material";
import Billboard from "../components/Billboard";
import familyImg from "../static/img/family_1.png";
import familyEndImg from "../static/img/family_end.png";
import { globalStyles } from "../context/ConfigProvider"


const styles = {
    familyImg : {
        width : "100%",
        height : 400,
        "object-fit" : "cover",
        "object-position" : "bottom",
    },

    familyEndImg : {
        width : "100%",
        height : 150,
        "object-fit" : "cover",
        "object-position" : "bottom",
    },
}


function IndexView(): React.ReactElement {

    return (
        <>
            <TopBar />
            
            <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewWholeContainerStyle}>
                <Container maxWidth = {false} disableGutters = {true}>
                    <Box component="img" src = {familyImg} alt = "伐木累" style = {styles.familyImg} />
                </Container>

                <Container maxWidth={false}>
                    <Billboard />
                </Container>

                <Container maxWidth = {false} disableGutters = {true} sx = {{pt: '5%'}}>
                    <Box component="img" src = {familyEndImg} alt = "伐木累" style = {styles.familyEndImg} />
                </Container>
            </Container>
        </>
    )
}

export default IndexView;