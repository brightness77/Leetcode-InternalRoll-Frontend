import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ReactElement } from "react";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';


export const styles = {

    listItemRightStyle : {
        flexGrow : 1,
        m : '1pt',
    },

    proficiencyButtonStyle : {
        width:'30px',
        height:'30px',
    },

    proficiencyButtonLargeStyle : {
        width:'45px',
        height:'45px',
    },

};


function ProficiencyBarExist (
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
            <ToggleButton value={0} sx={styles.proficiencyButtonStyle}>
                <SentimentDissatisfiedIcon fontSize={roundedValue == 0 ? "medium" : "small"} sx={roundedValue == 0 ? {color:'darkred'} : {}}/>
            </ToggleButton>
            <ToggleButton value={1} sx={styles.proficiencyButtonStyle}>
                <LooksOneIcon fontSize={roundedValue == 1 ? "medium" : "small"} sx={roundedValue == 1 ? {color:'red'}: {}} />
            </ToggleButton>
            <ToggleButton value={2} sx={styles.proficiencyButtonStyle}>
                <LooksTwoIcon fontSize={roundedValue == 2 ? "medium" : "small"} sx={roundedValue == 2 ? {color:'orange'}: {}} />
            </ToggleButton>
            <ToggleButton value={3} sx={styles.proficiencyButtonStyle}>
                <Looks3Icon fontSize={roundedValue == 3 ? "medium" : "small"} sx={roundedValue == 3 ? {color:'gold'}: {}} />
            </ToggleButton>
            <ToggleButton value={4} sx={styles.proficiencyButtonStyle}>
                <Looks4Icon fontSize={roundedValue == 4 ? "medium" : "small"} sx={roundedValue == 4 ? {color:'YellowGreen'}: {}} />
            </ToggleButton>
            <ToggleButton value={5} sx={styles.proficiencyButtonStyle}>
                <Looks5Icon fontSize={roundedValue == 5 ? "medium" : "small"}sx={roundedValue == 5 ? {color:'LimeGreen'}: {}} />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ProficiencyBarExist;
