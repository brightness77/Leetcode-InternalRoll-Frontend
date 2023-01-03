import { Avatar, Button, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import { globalStyles } from "../../context/ConfigProvider";
import AccountBoxIcon from '@mui/icons-material/AccountBox';


const styles = {

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


function UserInfoComp(
    {username} : {username : (string | undefined)}
): React.ReactElement {

    return (
        <Paper variant="outlined" sx={globalStyles.component.mainPaper.withMargin}>
            <List sx={globalStyles.component.list.listParent}>

                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Avatar variant="rounded" sx={styles.avatarStyle}>
                        <AccountBoxIcon sx={styles.avatarStyle} />
                    </Avatar>
                </ListItem>

                <ListItem sx={globalStyles.component.list.listItem.flexRowCenter}>
                    <Typography variant="h5">{username}</Typography>
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
    );
};

export default UserInfoComp;
