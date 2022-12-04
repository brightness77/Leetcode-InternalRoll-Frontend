import TopBar from "../TopBar";
import {Container, Box, Typography} from "@mui/material"
import confused from "../../static/img/DuckConfused.png"
import { globalStyles } from "../../context/ConfigProvider";


const styles = {
    notFound: {
        mt: '2pt',
        mb: '2pt',
    },

    notFoundImg: {
        mt: '20pt',
        mb: '20pt',
        width: 300,
        height: 360,
    },
};


function NotFoundView(): React.ReactElement {

    return (
        <>
            <TopBar />
            <Container sx = {globalStyles.viewWholeContainerStyle}>
                <Box sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Box component="img" src={confused} alt = "404" sx={styles.notFoundImg}/>
                    <Typography variant = "largeMessage" sx = {styles.notFound}>
                        这个网页为啥找不到了呢?
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default NotFoundView;
