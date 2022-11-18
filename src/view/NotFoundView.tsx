import TopBar from "./TopBar";
import {Container, Box, Typography} from "@mui/material"
import confused from "../static/img/DuckConfused.png"


const styles = {
    notFound: {
        mt: 5,
        mb: 1,
    },

    notFoundImg: {
        mb: 10,
        width: 300,
        height: 360,
    },
};


function NotFoundView(): React.ReactElement {

    return (
        <>
            <TopBar />
            <Container sx = {{ mt:10 }}>
                <Box sx = {{
                    marginTop: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img src = {confused} alt = "404" style = {styles.notFoundImg} />
                    <Typography variant = "largeMessage" sx = {styles.notFound}>
                        这个网页为啥找不到了呢?
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default NotFoundView;
