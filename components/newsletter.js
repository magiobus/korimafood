import {Text, Input, Button, Flex, useToast} from "@chakra-ui/core";
import { useState } from 'react';
import axios from 'axios';

export const Newsletter = () => {

    const toast = useToast(); //toast for showing errors
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [hide, setHide] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(!name && !email){ 
            ShowErrorToast(toast, "Ocurrió un error", "Por favor llena los campos")
            setIsLoading(false)
            return;
        }

        try {
            let response = await axios.post('/api/addnewsletter', { name, email })
            if(response.status === 200){
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    setHide(true)
                }, 3000);
            }
        } catch (error) {
            ShowErrorToast(toast, "Ocurrió un error", "No pudimos agregarte a la lista u.u")
        }
        setIsLoading(false)
    }

    if(hide){return null} else {
        if(!success){
            return(
            <Flex direction={["column", "column", "row", "row"]} textAlign={["center", "center", "left", "left"]} justify="center" py={4} mt={5} bg="black" borderWidth="1px"  width="80%">
                <Text color="white" px={5}><b>Obten nuevos lugares en tu email semanalmente</b> </Text>
                <Flex m={0}>
                    <Input placeholder="Nombre" width="30%" mx={4} onChange={e => {setName(e.target.value)}}/>
                    <Input placeholder="Email" width="30%" mr={4} onChange={e => {setEmail(e.target.value)}}/>
                    <Button variantColor="red"size={["md"]} width="25%" border="none" onClick={(e) => {handleSubmit(e)}}>{isLoading ? 'Enviando...' : 'Enviar'}</Button>
                </Flex>
            </Flex> 
            )
        } else if(success) {
            return (
                <>
                <Flex direction={["column", "column", "row", "row"]} textAlign={["center", "center", "left", "left"]} justify="center" py={4} mt={5} bg="black" borderWidth="1px"  width="80%">
                    <Text color="white" px={5}><b>Hemos recibido tu información 👍🏻</b> </Text>
                </Flex> 
                </> 
            )
        }
    }

}


//Function to Show Toast Eror
const ShowErrorToast = (toast, title, description) => {
    toast({ title: title, description: description, status: "error", duration: 5000, isClosable: true })
}

