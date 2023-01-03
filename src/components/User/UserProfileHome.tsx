import { Avatar, Button, Divider, List, ListItem, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { ReactElement } from "react";
import { globalStyles } from "../../context/ConfigProvider";
import rollIcon from "../../static/logo/icon.png";
import UserACDots from "./UserACDotsComponent";
import UserACStats from "./UserACStatsComponent";
import UserInfoComp from "./UserInfoComponent";
import UserRecentSolveRecord from "./UserRecentSolveRecord";


const styles = {

    wholeContainerStyle : {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-start',
        mt: '2%',
        width: '100%',
    },

    leftContainerStyle : {
        display:'flex',
        flexDirection:'column',
        m:'10px',
        alignItems:'center',
        justifyContent:'center',
        width:'30%',
    },

    rightContainerStyle : {
        display:'flex',
        flexDirection:'column',
        m:'10px',
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
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

};



function MyProfileHome(
    { profileUsername } : { profileUsername : (string | undefined), }
) : ReactElement {




    return (
        <Container sx={styles.wholeContainerStyle} disableGutters={true}>

            <Container maxWidth={false} disableGutters={true} sx={styles.leftContainerStyle}>
                <UserInfoComp username={profileUsername} />
            </Container>

            <Container maxWidth={false} disableGutters={true} sx={styles.rightContainerStyle}>
                <UserACStats username={profileUsername} />
                <UserACDots username={profileUsername} />
                <UserRecentSolveRecord username={profileUsername} />
            </Container>

        </Container>
    );
};

export default MyProfileHome;
