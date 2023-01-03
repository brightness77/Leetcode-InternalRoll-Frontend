import { Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MyProfileHome from "../../components/User/UserProfileHome";
import { globalStyles } from "../../context/ConfigProvider";
import TopBar from "../../components/Bar/TopBar";
import FooterComponent from "../../components/Bar/FooterComponent";



function ProfileView() : React.ReactElement {

    const {profileUsername} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(profileUsername === null){
            navigate('/404');
        }
    }, [profileUsername]);

    return (
        <Container maxWidth = {false} disableGutters = {true} sx = {globalStyles.viewContainerStyle}>
            <TopBar />

            <Container sx={globalStyles.viewWholeContainerStyle}>
                <MyProfileHome profileUsername={profileUsername} />
            </Container>

            <FooterComponent />
        </Container>
    );
};

export default ProfileView;
