import { Box, CircularProgress, Text, Flex} from '@chakra-ui/core';

const Loading = ({message = ''}) => {
    return ( 
        <Flex align="center" justify="center" direction="column" >
            <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={10} width={["100%", "80%", "95%"]}>
                <Box>
                    <CircularProgress isIndeterminate color="red" size="80px"></CircularProgress> 
                    <Text><b>{message}</b> </Text>
                </Box>
            </Box>
        </Flex>
     );
}
 
export default Loading;