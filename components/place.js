import { useEffect, useState} from 'react';
import Loading from './loading';
import loadingPhrases from '../lib/loadingphrases'
import { Button, Heading, Text, Flex, Box, Image, Badge} from '@chakra-ui/core';

const Place = props => {

    const {places} = props;
    const [selectedPlace, setSelectedPlace] = useState({});
    const [_places, _setPlaces] = useState([...places]) //copy of places in local
    const [placeLoading, setPlaceLoading] = useState(false)
    const [loadingPhrase, setLoadingPhrase] = useState(loadingPhrases[0])
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
        }, 1300);
    }

    const getRandomLoadingPhrase = (loadingPhrases) => { return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]; }

    if(selectedPlace){
        return (
            <Flex align="center" justify="center" direction="column" mx={2} width={["100%", "95%", "80%", "75%"]}>
                <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={10} width="auto">
                    {placeLoading ? (<Loading message={loadingPhrase}/>): 
                    (
                        <>
                            <Flex align={["center", "center", "center", "left"]} direction={["column-reverse", "column-reverse", "column-reverse", "row"]} justify="start" >
                                <Flex direction="column" justify="center">
                                    <Heading as="h1" color="red.600" mb={5} textAlign={["center", "center", "center", "left"]}>{selectedPlace.name }</Heading>
                                    <Box bg="red.100" py={2} px={4} rounded="10px" width={["100%", "100%", "100%", "90%"]}>
                                        <Text textAlign={["center", "center", "center", "left"]} fontSize={["lg", "lg", "lg", "2xl"]} color="gray.900" ><b>{selectedPlace.description}</b></Text>
                                    </Box>
                                </Flex>
                                <Image size={["100%", "250px", "250", "300px", "300px"]} rounded="20px" src={selectedPlace.coverUrl} alt="Korima Food Place" />
                            </Flex>
                            <Button onClick={() => getRandomPlace()} size={["lg"]} variantColor="red" mt={10}>Recomiendame otro lugar</Button>
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
