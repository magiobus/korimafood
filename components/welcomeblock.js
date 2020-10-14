import { Flex, Box, Heading, Text, Button} from '@chakra-ui/core';


const WelcomeBlock = props => {

    const {heading, description, buttonText} = props

    const handleClick = () => {
        console.log("auch =>")
    }

    return ( 
        <Flex align="center" justify="center" direction="column" mx={2} >
            <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px"  p={5}>
                <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>{heading}</Heading>
                <Text textAlign="center" m={0} fontSize={["lg", "xl", "2xl"]} align="center" color="gray.600"><b>{description}</b></Text>
                <Button variantColor="red"  my={19}size={["lg"]} onClick={(e) => {handleClick(e)}}>{buttonText}</Button>
            </Box>
        </Flex>
     );
}
 
export default WelcomeBlock;