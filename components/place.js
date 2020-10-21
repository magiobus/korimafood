import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import Loading from './loading';
import loadingPhrases from '../lib/loadingphrases'
import {titleParser} from '../helpers/titleParser';
import { Button, Heading, Text, Flex, Box, Image, Link} from '@chakra-ui/core';

const Place = props => {

    const {places} = props;
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
                                    </Box>
                                    <Button onClick={() => getRandomPlace()} size="lg" variantColor="red" border="none" mt={5} p={5} width={["100%", "100%", "100%", "80%", "90%"]}>Recomiendame otro lugar 🙏🏻</Button>
                                    <Button mt={5} p={5} variantColor="red" border="none" width={["100%", "100%", "100%", "80%", "90%"]} onClick={e => {router.push('/agregarlugar')} }>Agrega un Lugar 🏠</Button>
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
                    <Heading as="h1" color="red.600">Ya no tengo recomendaciones u.u</Heading>
                </Box>
            </Flex>
        )
    }
}

export default Place;
