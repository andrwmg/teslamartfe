import { createTheme } from "@mui/material/styles";

const common = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        appbar: {
            main: '#121212'
        }
    },
    // palette: {
    //   type: 'dark',
    //   background: {
    //     default: '#000000',
    //     filter: 'rgba(0,0,0,.9)',
    //     secondary: '#131313'
    //   },
    // text: {
    //     primary: 'rgba(0, 0, 0, 1)',
    //     secondary: 'rgba(0, 0, 0, 0.6)'
    // },
    //   icon: {
    //       default: '#ffffff'
    //   }
    // },
    typography: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        //   fontSize: 14,
        //   fontWeightLight: 300,
        //   fontWeightRegular: 400,
        //   fontWeightMedium: 500,
        //   fontWeightBold: 700,
        button: {
            textTransform: 'capitalize'
        },
        h1: {
            fontSize: '3.5rem',
            fontWeight: 500,
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 500,
            letterSpacing: '-0.00833em',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 500,
            letterSpacing: '0em',
            fontFamily: 'Poppins'
        },
        h4: {
            // [common.breakpoints.up('md')]: {fontSize: '1.5rem'},
            fontSize: '1.3rem',
            fontWeight: 500,
            letterSpacing: '0.00735em',
            fontFamily: 'Poppins'
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            letterSpacing: '0em',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.00938em',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.00938em',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            letterSpacing: '0.01071em',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: '0.00938em',
            color: 'text.secondary'
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.00714em',
            color: 'text.secondary'
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.03333em',
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.08333em',
        },
    }
});


const lightTheme = createTheme({
    ...common
});

const darkTheme = createTheme({
    ...common,
    palette: {
        mode: 'dark',
    },
});

console.log(darkTheme)

export { lightTheme, darkTheme }