import {Typography, Box} from "@mui/material";
import phImg from "../static/img/keda_1.jpg";


const styles = {


};


function PlaceholderComponent(): React.ReactElement {

    return (
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',}}>
            <Box component="img" src={phImg} alt='敬请期待' sx={{height:'300px', width:'420px', m:'20px',}}/>
            <Typography variant="h4" >敬请期待</Typography>
            <Typography variant="h4" >stay tuned!</Typography>
            <Typography variant="h4" >restez à l'écoute</Typography>
            <Typography variant="h4" >blijf kijken</Typography>
            <Typography variant="h4" >Bleib dran</Typography>
            <Typography variant="h4" >Следите за обновлениями</Typography>
            <Typography variant="h4" >敬請期待</Typography>
            <Typography variant="h4" >乞うご期待</Typography>
            <Typography variant="h4" >계속 지켜봐</Typography>
            <Typography variant="h4" >बने रहें</Typography>
        </Box>
    );
};

export default PlaceholderComponent;
