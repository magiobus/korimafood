import { ThemeProvider } from "@chakra-ui/core";
import "../styles/sharebuttons.css";

const myApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default myApp;
