import { ThemeProvider } from "@chakra-ui/core";


const myApp = ({Component, pageProps}) => {
return (
    <ThemeProvider >
        <Component {...pageProps} />
    </ThemeProvider>
)

}

export default myApp