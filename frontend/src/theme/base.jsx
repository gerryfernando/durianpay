import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Arial, sans-serif",
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#36A0C4",
      light: "#5BCFF6",
    },
    secondary: {
      main: "#00355A",
    },
    accent: {
      main: "#FAA61B",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined", disabled: true },
          style: {
            borderRadius: "10px !important",
            backgroundColor: "#F6F8FD",
            color: "black",
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px !important",
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 30px #fff inset !important",
            },
          },
          "&.Mui-disabled": {
            "& input, & textarea": {
              WebkitTextFillColor: "rgb(0,0,0, 0.75) !important",
            },
          },
        },
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "#000",
            WebkitTextFillColor: "#000",
            transition: "background-color 5000s",
            "&:-webkit-text-fill-color": "#fff !important",
          },
        },
        sizeSmall: ({ theme }) =>
          theme.unstable_sx({
            "& legend": {
              display: "none",
            },
            "& fieldset": {
              top: 0,
            },
          }),
      },
    },
  },
});

export default theme;
