const chihuahuaSheetUrl = process.env.NEXT_PUBLIC_CUU_SHEET_URL //ChihuahuaCity Places

import {useState} from 'react'
import { Flex, Box, Heading, Text, Button, CircularProgress, useToast} from '@chakra-ui/core';
import {parseSheetJson} from '../lib/sheetparser'
import Place from './place'
import axios from 'axios'


const WelcomeBlock = props => {

    const {heading, description, buttonText} = props
    const [isLoading, setIsLoading] = useState(false)
    const [showPlace, setShowPlace] = useState(false)
    const [places, setPlaces] = useState([])
    const toast = useToast();


    const handleClick = async () => {
        setIsLoading(true)
        try {
            let response = await axios.get(chihuahuaSheetUrl)
            let placesData = parseSheetJson(response)
            console.log("placesData =>", placesData)
            setPlaces(placesData) //saves places list in state
            setIsLoading(false)
            setShowPlace(true)
        } catch (error) {
            console.log("error =>", error)
            setIsLoading(false)
            setShowPlace(false)
            ShowErrorToast(toast, "Ocurrió un error", "No pudimos traer tu recomendación u.u")
        }        
    }

    //Shows Toast Eror
    const ShowErrorToast = (toast, title, description) => {
        toast({ title: title, description: description, status: "warning", duration: 9000, isClosable: true })
    }

    return ( 
        <Flex align="center" justify="center" direction="column" mx={2} >
            <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={5}>
                {(!showPlace && !isLoading) && (
                <>
                    <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>{heading}</Heading>
                    <Text textAlign="center" m={0} fontSize={["lg", "xl", "2xl"]} align="center" color="gray.600"><b>{description}</b></Text>
                    <Button variantColor="red"  my={19}size={["lg"]} onClick={(e) => {handleClick(e)}}>{buttonText}</Button>
                </>
                )}

                {isLoading && ( <CircularProgress isIndeterminate color="red"></CircularProgress> )}

                {(showPlace && !isLoading) && (
                    <Place/>
                )}
            </Box>
        </Flex>
     );
}
 
export default WelcomeBlock;