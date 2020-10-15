//Impot Components
import { Flex, Box, Heading, Text, Button, useToast} from '@chakra-ui/core';
import Place from './place'
import Loading from './loading'
//Import functions
import axios from 'axios'
import {useState} from 'react'
import {parseSheetJson} from '../lib/sheetparser'
//Import Variables
const chihuahuaSheetUrl = process.env.NEXT_PUBLIC_CUU_SHEET_URL //ChihuahuaCity Places


const WelcomeBlock = props => {
    const toast = useToast(); //toast for showing errors
    
    //------STATES---------//
    const [status, setStatus] = useState({isLoading: false,  showPlace: false })
    const [places, setPlaces] = useState([])

    //----- EVENTS -----//
    const handleClick = async () => {
        setStatus({...status, isLoading: true})

        setTimeout(async () => { 
            try {
                let response = await axios.get(chihuahuaSheetUrl)
                let placesData = parseSheetJson(response)
                setPlaces(placesData) //saves places list in state
                setStatus({...status, isLoading: false, showPlace: true}) //updates State
            } catch (error) {
                console.log("error =>", error)
                setStatus({...status, isLoading: false, showPlace: false})
                ShowErrorToast(toast, "Ocurrió un error", "No pudimos traer tu recomendación u.u")
            }  
        }, 2000);
    }

    //object deconstructions from state and props
    const {heading, description, buttonText} = props
    const {showPlace, isLoading} = status;

    return ( 
        <>
            {/* ------ Home Landing Component ----- */}
            {(!showPlace && !isLoading) && (
                <Flex align="center" justify="center" direction="column" mx={2} >
                    <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={5}>
                        <>
                            <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>{heading}</Heading>
                            <Text textAlign="center" m={0} fontSize={["lg", "xl", "2xl"]} align="center" color="gray.600"><b>{description}</b></Text>
                            <Button variantColor="red"  my={19} size={["lg"]} onClick={(e) => {handleClick(e)}}>{buttonText}</Button>
                        </>
                    </Box>
                </Flex>
            )}

            {/* ---- Loading Place Spinner */}
            {isLoading && ( <Loading message="Recorriendo la ciudad en busqueda de tu nuevo lugar favorito"/> )}

            {/* ---------- Showing Place Component -------- */}
            {(showPlace && !isLoading && places.length > 0) && ( <Place places={places} /> )}
         </>

     );
}
export default WelcomeBlock;

// ------------------FUNCTIONS--------------

//Function to Show Toast Eror
const ShowErrorToast = (toast, title, description) => {
    toast({ title: title, description: description, status: "warning", duration: 9000, isClosable: true })
}