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
            secondary : '#909090',
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
            color: 'primary',
            fontSize: '18px',
        },

        body2 : {
            fontFamily : 'Anonymous Pro',
            color: 'secondary',
            fontSize: '18px',
        },

        h2 : {
            fontFamily : 'Anonymous Pro',
            color: 'secondary',
        },

        h3 : {
            fontFamily : 'Anonymous Pro',
        },

        h4 : {
            fontFamily : 'Anonymous Pro',
        },

        topbarButtom : {
            fontFamily : 'Anonymous Pro',
            fontSize: '18px',
            color: 'secondary.dark',
        },
    }
});

export default theme;
