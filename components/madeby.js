import { Link, Box, Text} from "@chakra-ui/core"


const MadeBy = () => {
    return (
        <Box bg="gray.200" m={4} rounded="10px" p={2}>
            <Text><b> Hecho con ❤️ por  </b>
                <Link href="https://magiobus.com" color="red.500" ><b>@magiobus</b></Link>
            </Text>
        </Box>  
    )  
}

export default  MadeBy;
