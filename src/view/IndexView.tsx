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
                <Container maxWidth = {false} disableGutters = {true} sx = {{pt: '0%'}}>
                    <Box component="img" src = {familyImg} alt = "伐木累" style = {styles.familyImg} />
                </Container>

                <Container maxWidth="lg" sx = {{pt: '1%'}}>
                    <Typography variant = 'h3'>
                        这肯定不是一个刷题网站
                    </Typography>
                    <Typography variant = 'body1'>
                        开开心心刷题去,大把大把头发掉!
                    </Typography>

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