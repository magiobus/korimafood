//Impot Components
import { Flex, Box, Heading, Text, Button, useToast, Select} from '@chakra-ui/core';
import Place from './place'
import Loading from './loading'
//Import functions
import axios from 'axios'
import {useState} from 'react'
import {parseSheetJson} from '../lib/sheetparser'
//Import Variables

const sheetsUrls = {
    "chihuahua": {url: process.env.NEXT_PUBLIC_CUU_SHEET_URL, sheetIndex: 0}, 
    "juarez": {url: process.env.NEXT_PUBLIC_JUAREZ_SHEET_URL, sheetIndex: 1},
    "elpaso": {url: process.env.NEXT_PUBLIC_ELP_SHEET_URL, sheetIndex: 2},
    "cuauhtemoc": {url: process.env.NEXT_PUBLIC_CUAUHTEMOC_SHEET_URL, sheetIndex: 3},
    "parral": {url: process.env.NEXT_PUBLIC_PARRAL_SHEET_URL, sheetIndex:4},
    "delicias": {url: process.env.NEXT_PUBLIC_DELICIAS_SHEET_URL, sheetIndex: 5},
    "meoqui": {url: process.env.NEXT_PUBLIC_MEOQUI_SHEET_URL, sheetIndex: 6},
    "creel": {url:process.env.NEXT_PUBLIC_CREEL_SHEET_URL, sheetIndex: 7},
}


const WelcomeBlock = props => {
    const toast = useToast(); //toast for showing errors
    
    //------STATES---------//
    const [status, setStatus] = useState({isLoading: false,  showPlace: false })
    const [places, setPlaces] = useState([])
    const [searchPlace, setSearchPlace] = useState('')

    //----- EVENTS -----//
    const handleClick = async () => {

        if(!searchPlace){
            ShowErrorToast(toast, "Tienes que elegir una ciudad....")
            return;
        }

        setStatus({...status, isLoading: true})
            try {
                let response = await axios.get(sheetsUrls[searchPlace].url)
                let placesData = parseSheetJson(response)
                setPlaces(placesData) //saves places list in state
                setStatus({...status, isLoading: false, showPlace: true}) //updates State
                setFooter('newsletter')
            } catch (error) {
                console.log("error =>", error)
                setStatus({...status, isLoading: false, showPlace: false})
                ShowErrorToast(toast, "Ocurrió un error", "No pudimos traer tu recomendación u.u")
            }  
    }

    //object deconstructions from state and props
    const {heading, description, place, buttonText, setFooter} = props
    const {showPlace, isLoading} = status;

    return ( 
        <>
            {/* ------ Home Landing Component ----- */}
            {(!showPlace && !isLoading) && (
                <Flex align="center" justify="center" direction="column" mx={2} >
                    <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={5} width="100%">
                            <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>{heading}</Heading>
                            <Text textAlign="center" m={0} fontSize={["lg", "xl", "2xl"]} align="center" color="gray.600" width="100%">
                                <b>{description} 
                                    <Text color="red.300"  width="100%" mt={2} px={4} py={2}>{place}</Text>
                                </b>
                            </Text>
                               <Select placeholder="Elige una ciudad 🤠" size="lg" width="100%" onChange={e => {setSearchPlace(e.target.value)}}>
                                    <option value="chihuahua">Chihuahua</option>
                                    <option value="juarez">Juarez</option>
                                    <option value="elpaso">El Paso TX</option>
                                    <option value="cuauhtemoc">Cuauhtemoc</option>
                                    <option value="parral">Parral</option>
                                    <option value="delicias">Delicias</option>
                                    <option value="meoqui">Meoqui</option>
                                    <option value="creel">Creel</option>
                                </Select>
                                <Button variantColor="red"  my={19} size={["lg"]} width="100%" onClick={(e) => {handleClick(e)}}>{buttonText}</Button>
                    </Box>
                </Flex>
            )}

            {/* ---- Loading Place Spinner */}
            {isLoading && ( <Loading message="Recorriendo la ciudad en busqueda de tu nuevo lugar favorito"/> )}

            {/* ---------- Showing Place Component -------- */}
            {(showPlace && !isLoading && places.length > 0) && ( <Place places={places} sheetIndex={sheetsUrls[searchPlace].sheetIndex} /> )}
         </>

     );
}
export default WelcomeBlock;

// ------------------FUNCTIONS--------------

//Function to Show Toast Eror
const ShowErrorToast = (toast, title, description) => {
    toast({ title: title, description: description, status: "error", duration: 5000, isClosable: true })
}