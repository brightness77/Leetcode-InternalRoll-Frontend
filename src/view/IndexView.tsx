import InternalRoll from "../components/CheckUser";
import TopBar from "./TopBar";
import {Container, Typography, Box} from "@mui/material";
import Billboard from "../components/Billboard";
import familyImg from "../static/img/family_1.png";


const styles = {
    familyImg : {
        width : "100%",
        height : 400,
        "object-fit" : "cover",
        "object-position" : "bottom",
    },
}


function IndexView(): React.ReactElement {

    return (
        <>
            <TopBar />
            <Container maxWidth = {false} disableGutters = {true} sx = {{backgroundColor : '#f0f0f0', minHeight : 2160}}>
                <Container maxWidth = {false} disableGutters = {true} sx = {{pt: '0%'}}>
                    <img src = {familyImg} alt = "伐木累" style = {styles.familyImg}/>
                </Container>
                <Container maxWidth="lg" sx = {{pt: '1%'}}>
                    <Typography variant = 'h3'>
                        开开心心刷题去,大把大把头发掉!
                    </Typography>
                    <Billboard />
                </Container>
            </Container>
        </>
    )
}

export default IndexView;