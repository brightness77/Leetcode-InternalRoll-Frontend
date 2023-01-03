import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReactElement } from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';



function ProficiencyIconExist (
    { defaultValue } : { defaultValue : number }
) : ReactElement {

    const roundedValue = Math.round(defaultValue);

    return (
        <div>
            {roundedValue == 0 && <SentimentDissatisfiedIcon fontSize="medium" sx={{color:'darkred'}}/>}

            {roundedValue == 1 && <LooksOneIcon fontSize="medium" sx={{color:'red'}} />}

            {roundedValue == 2 && <LooksTwoIcon fontSize="medium"  sx={{color:'orange'}} />}

            {roundedValue == 3 && <Looks3Icon fontSize="medium" sx={{color:'gold'}} />}

            {roundedValue == 4 && <Looks4Icon fontSize="medium" sx={{color:'YellowGreen'}} />}

            {roundedValue == 5 && <Looks5Icon fontSize="medium" sx={{color:'LimeGreen'}} />}
        </div>
    );
};

export default ProficiencyIconExist;
