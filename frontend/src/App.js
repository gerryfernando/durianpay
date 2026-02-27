import { ThemeProvider } from "@emotion/react";
import "./App.css";
import MainLayout from "./component/Layout";
import theme from "./theme/base";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import SnackBarProvider from "./component/SnackbarProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainLayout>
          <SnackBarProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </SnackBarProvider>
        </MainLayout>
      </Provider>
    </div>
  );
}

export default App;
