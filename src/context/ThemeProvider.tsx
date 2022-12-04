import {createTheme} from "@mui/material/styles";


//mui typescript custom variant
declare module '@mui/material/styles' {
    interface TypographyVariants {
        largeMessage: React.CSSProperties;
        topbarButtom: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        largeMessage?: React.CSSProperties;
        topbarButtom?: React.CSSProperties;
    }
    
}
  
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        largeMessage: true;
        topbarButtom: true;
    }
}


const theme = createTheme({
    palette : {
        primary : {
            main : '#eb9808',
        },

        secondary : {
            main : '#6c4501',
        },

        text : {
            primary : '#6c4501',
            secondary : '#202020',
        },
    },


    typography : {

        fontFamily : 'Anonymous Pro',

        button : {
            fontFamily : 'Anonymous Pro',
            textTransform: 'none',
        },

        largeMessage : {
            fontFamily : 'Anonymous Pro',
            fontSize: 30,
        },

        body1 : {
            fontFamily : 'Anonymous Pro',
            fontSize: 20,
        },

        body2 : {
            fontFamily : 'Anonymous Pro',
            fontSize: 20,
            color: 'secondary.dark',
        },

        h2 : {
            fontFamily : 'Anonymous Pro',
            fontSize: 60,
            color: 'secondary',
        },

        h3 : {
            fontFamily : 'Anonymous Pro',
            fontSize: 30,
        },

        topbarButtom : {
            fontFamily : 'Anonymous Pro',
            fontSize: 20,
            color: 'secondary.dark',
        },
    }
});

export default theme;
