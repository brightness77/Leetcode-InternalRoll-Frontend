import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReactElement } from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import {styles} from './ProficiencyBarExist';



function ProficiencyBarExistLarge (
    { defaultValue } : { defaultValue : number }
) : ReactElement {

    const roundedValue = Math.round(defaultValue);

    return (
        <ToggleButtonGroup
            value={roundedValue}
            exclusive
            disabled
            sx={styles.listItemRightStyle}
        >
            <ToggleButton value={0} sx={styles.proficiencyButtonLargeStyle}>
                <SentimentDissatisfiedIcon fontSize={roundedValue == 0 ? "large" : "medium"} sx={roundedValue == 0 ? {color:'darkred'} : {}}/>
            </ToggleButton>
            <ToggleButton value={1} sx={styles.proficiencyButtonLargeStyle}>
                <LooksOneIcon fontSize={roundedValue == 1 ? "large" : "medium"} sx={roundedValue == 1 ? {color:'red'}: {}} />
            </ToggleButton>
            <ToggleButton value={2} sx={styles.proficiencyButtonLargeStyle}>
                <LooksTwoIcon fontSize={roundedValue == 2 ? "large" : "medium"} sx={roundedValue == 2 ? {color:'orange'}: {}} />
            </ToggleButton>
            <ToggleButton value={3} sx={styles.proficiencyButtonLargeStyle}>
                <Looks3Icon fontSize={roundedValue == 3 ? "large" : "medium"} sx={roundedValue == 3 ? {color:'gold'}: {}} />
            </ToggleButton>
            <ToggleButton value={4} sx={styles.proficiencyButtonLargeStyle}>
                <Looks4Icon fontSize={roundedValue == 4 ? "large" : "medium"} sx={roundedValue == 4 ? {color:'YellowGreen'}: {}} />
            </ToggleButton>
            <ToggleButton value={5} sx={styles.proficiencyButtonLargeStyle}>
                <Looks5Icon fontSize={roundedValue == 5 ? "large" : "medium"}sx={roundedValue == 5 ? {color:'LimeGreen'}: {}} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ProficiencyBarExistLarge;
