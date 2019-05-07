import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        // https://material-ui.com/style/typography/#migration-to-typography-v2
        useNextVariants: true
    }
    // palette: {
    //   primary: {
    //     main: Styles.MAIN_COLOR
    //   },
    //   secondary: {
    //     main: Styles.MAIN_COLOR
    //   }
    // },
    // overrides: {
    //   MuiButton: {
    //     contained: {
    //       backgroundColor: Styles.MAIN_COLOR,
    //       color: "white",
    //       "&:hover": {
    //         backgroundColor: Styles.MAIN_COLOR_HOVERED
    //       }
    //     }
    //   }
    // }
});

export { theme };
