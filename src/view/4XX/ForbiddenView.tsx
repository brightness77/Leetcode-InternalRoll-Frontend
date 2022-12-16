import TopBar from "../../components/Bar/TopBar";
import {Container, Box, Typography} from "@mui/material"
import tiger from "../../static/img/tiger_refuse.jpg"
import { globalStyles } from "../../context/ConfigProvider";
import FooterComponent from "../../components/Bar/FooterComponent";


const styles = {
    notFound: {
        mt: '2pt',
        mb: '2pt',
    },

    notFoundImg: {
        mt: '20pt',
        mb: '20pt',
        width: 360,
        height: 360,
    },
};


function ForbiddenView(): React.ReactElement {

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <Box sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box component="img" src={tiger} alt = "403" sx={styles.notFoundImg}/>
                    <Typography variant = "largeMessage" sx = {styles.notFound}>
                        403 FORBIDDEN
                    </Typography>
                </Box>
            </Container>

            <FooterComponent />
        </Container>
    );
}

export default ForbiddenView;
