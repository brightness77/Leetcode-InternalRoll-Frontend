import { Avatar, Button, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ReactElement } from "react";
import { globalStyles } from "../../context/ConfigProvider";
import rollIcon from "../../static/logo/icon.png";


const styles = {

    wholeContainerStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        mt: '2%',
        width: '100%',
    },

    listItemLeftStyle : {
        mr:'50px',
        flexGrow : 0,
    },

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    tableHeadText : {
        color: '#eb9808',
        fontWeight: 'bold',
    },

    MenuProps : {
        PaperProps: {
            style: {
                minHeight: '200px',
                maxHeight: '400px',
                width: '250px',
            },
        },
    },

    avatarStyle : {
        width: '100px',
        height: '100px',
    },

};



function MyProfileHome(
    { profileUsername } : { profileUsername : (string | undefined), }
) : ReactElement {




    return (
        <Container sx={styles.wholeContainerStyle} disableGutters={true}>

            <Container maxWidth='xs' disableGutters={true} sx={globalStyles.component.mainContainer.withMargin}>
                <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                    <List sx={globalStyles.component.list.listParent}>

                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Avatar variant="rounded" src={rollIcon} sx={styles.avatarStyle} />
                        </ListItem>

                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant="h5">{profileUsername}</Typography>
                        </ListItem>

                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Button variant="contained">
                                <Typography variant="body1">Edit Profile</Typography>
                            </Button>
                        </ListItem>

                        <Divider variant="middle" />

                        <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                            <Typography variant='h6'>Rank 10000+</Typography>
                        </ListItem>

                    </List>
                </Paper>
            </Container>

            <Container maxWidth='xl' disableGutters={true} sx={globalStyles.component.mainContainer.withMargin}>
                <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
                    <List sx={globalStyles.component.list.listParent}>

                    </List>
                </Paper>
            </Container>

        </Container>
    );
};

export default MyProfileHome;
