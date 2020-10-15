import { useEffect, useState} from 'react';
import { Button, Heading, Text} from '@chakra-ui/core';


const Place = ({places, setPlaces}) => {

const [selectedPlace, setSelectedPlace] = useState({});
    
    useEffect(() => {
        getRandomPlace(places)
    }, [])

    const getRandomPlace = (places) => {
        let randomPlace = places[Math.floor(Math.random() * places.length)];
        setSelectedPlace(randomPlace)
        console.log("randomPlace =>", randomPlace)
    }


    const {name, description} = selectedPlace;

    return(
        <>
            <Heading>{name}</Heading>
            <Text>{description}</Text>
            <Button variantColor="red" onClick={() => { getRandomPlace(places)}}>Trae otra recomendación</Button>
        </>
    )
}

export default Place;