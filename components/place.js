import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import Loading from './loading';
import loadingPhrases from '../lib/loadingphrases'
import {titleParser} from '../helpers/titleParser';
import { Button, Heading, Text, Flex, Box, Image, Link, useToast} from '@chakra-ui/core';
import axios from 'axios';

const Place = props => {

    const toast = useToast(); //toast for showing errors

    const {places, sheetIndex, city} = props;
    const [selectedPlace, setSelectedPlace] = useState({});
    const [_places, _setPlaces] = useState([...places]) //copy of places in local
    const [placeLoading, setPlaceLoading] = useState(false)
    const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0])

    const router = useRouter()

    useEffect(() => { getRandomPlace(places) }, [])

    const getRandomPlace = () => {
        setLoadingPhrase(getRandomLoadingPhrase(loadingPhrases))
        setPlaceLoading(true)
        setTimeout(function(){ 
            let randomPlace = _places[Math.floor(Math.random() * _places.length)];
            setSelectedPlace(randomPlace)
            let newPlaces = _places.filter(_place => { return _place.id != randomPlace.id })
            _setPlaces(newPlaces)
            setPlaceLoading(false)
        }, 300);
    }

    const removePlaceFromSheet = async (id) => {
         try {
            let response = await axios.post('/api/deleteplace', { id, sheetIndex })
            if(response.status === 200){ toast({ title: "Si se borro!", description: "Todo cool my friend", status: "sucess", duration: 5000, isClosable: true }) }
        } catch (error) {
            toast({ title: "NO se borro!", description: "No se pudo borrar", status: "error", duration: 5000, isClosable: true })
        }
    }


    const getRandomLoadingPhrase = (loadingPhrases) => { return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]; }

    const handlePhotoLoading = () => {
        setPhotoLoading(false)
    }

    if(selectedPlace){
        return (
            <Flex align="center" justify="center" direction="column" mx={2} width={["100%", "95%", "80%", "75%"]}>
                <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={10} width="auto">
                    {placeLoading ? (<Loading message={loadingPhrase}/>): 
                    (
                        <>
                            <Flex align={["center", "center", "center", "left"]} direction={["column-reverse", "column-reverse", "column-reverse", "row"]} justify="start" >
                                <Flex direction="column" justify="center">
                                    <Heading as="h1" color="red.600" mb={0} textAlign={["center", "center", "center", "left"]} fontSize={["2xl", "2xl", "2xl", "3xl"]}>{selectedPlace.title}</Heading>
                                    <Text textAlign={["center", "center", "center", "left"]} as="cite" mb={2} py={1}>{selectedPlace.address}</Text>
                                    
                                    {selectedPlace.review && (
                                        <Box my={4} textAlign={["center", "center", "center", "left"]}>
                                            <Text as="em">{selectedPlace.review}</Text>
                                        </Box>
                                    )}
                                    
                                    <Box textAlign={["center", "center", "center", "left"]} mt={2}>
                                        <Link href={selectedPlace.mapsUrl} isExternal >
                                            <Button variantColor="red" border="none" mb={4}>¿Cómo llegar? 🚖</Button>
                                        </Link>

                                        {selectedPlace.website && (
                                            <Link href={selectedPlace.website} isExternal >
                                                <Button variantColor="red" border="none" mx={4} mb={4}>Website 💻</Button>
                                            </Link>
                                        )} 

                                        {/* <!-- Sharingbutton Facebook --> */}
                                        <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=korimafood.com" target="_blank" rel="noopener" aria-label="Facebook">
                                        <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg></div>Facebook</div>
                                        </a>

                                        {/* <!-- Sharingbutton WhatsApp --> */}
                                        <a class="resp-sharing-button__link" href="whatsapp://send?text=Encuentra%20un%20lugar%20distinto%20para%20comer%20en%20la%20ciudad%20de%20Chihuahua%2C%20Juarez%2C%20El%20Paso.%20%20korimafood.com" target="_blank" rel="noopener" aria-label="WhatsApp">
                                        <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"/></svg></div>WhatsApp</div>
                                        </a>




                                            
                                        
                                       

                                    </Box>
                                    <Button onClick={() => getRandomPlace()} size="lg" variantColor="red" border="none" mt={5} p={5} width={["100%", "100%", "100%", "80%", "90%"]}>Recomiendame otro lugar 🙏🏻</Button>
                                    <Button mt={5} p={5} variantColor="red" border="none" width={["100%", "100%", "100%", "80%", "90%"]} onClick={e => {router.push('/agregarlugar')} }>Agrega un Lugar 🏠</Button>
                                    <Button mt={5} p={5} variantColor="red" border="none" width={["100%", "100%", "100%", "80%", "90%"]} onClick={() => {removePlaceFromSheet(selectedPlace.id)} }>Borrar un Lugar</Button>

                                </Flex>
                                <Box mx={4}>
                                    <Image size={["100%", "250px", "250", "300px", "300px"]} rounded="20px" src={selectedPlace.photoUrl} alt="Cargando Imagen..." />
                                </Box>
                            </Flex>
                        </>
                    )}
                </Box>
            </Flex>
        )
    } else {
        return (
            <Flex align="center" justify="center" direction="column" mx={2} width={["100%", "95%", "80%", "75%"]}>
                <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={5}>
                    <Heading as="h1" color="red.600">Ya no tengo recomendaciones uwu</Heading>
                </Box>
            </Flex>
        )
    }
}

export default Place;
