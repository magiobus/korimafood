import { NextSeo } from 'next-seo';
import { Flex, Box, Heading, Text, FormControl, Input, Button, Select, useToast} from '@chakra-ui/core';
import React, { useState, useEffect} from 'react';
import { Textarea } from '@chakra-ui/core';


const AddPlace = () => {

  const toast = useToast(); //toast for showing errors
  
  // FORM FIELdS
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [isOwner, setIsOwner] = useState('') 
  const [review, setReview] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  
  const [showReview, setShowReview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sucess, setSuccess] = useState(false)


  const handleOwner = (value) => {
    if(value === 'true'){
      setIsOwner(true)
      setShowReview(false)
    } else {
      setIsOwner(false)
      setShowReview(true)
    }
  }


  const handlePlaceSubmission = (e) => {
    e.preventDefault();
    setIsLoading(true)
    let data =  { name, address, city, phone, isOwner, review, ownerPhone, ownerEmail }
    // ShowErrorToast(toast, "Ocurrió un error", "No pudimos Agregar tu recomendación u.u")
    console.log("ay me dieorn click... =>", data)
  }


  return (
    <div className="container">
      <NextSeo
      title="Korima Food - Agrega tu negocio en Chihuahua 🏠"  
      description="Encuentra lugares de comida en el estado de Chihuahua México - ELP"
      canonical="https://www.korimafood.com/"
      openGraph={{
        url: 'https://www.korimafood.com/',
        title: 'Korima Food 🌮',
        description: 'Encuentra lugares de comida en el estado de Chihuahua México - ELP',
        images: [ {url: 'http://korimafood.com/images/opengraph.jpg', width: 1280, height: 720, alt: 'Korima Food, Comida en Chihuahua'}],
        site_name: 'Korima Food 🌮, lugares de comida en Chihuahua México',
      }}
      twitter={{ handle: '@magiobus', site: '@magiobus', cardType: 'summary_large_image'}}
    />

       <Flex align="center" justify="center" direction="column" mx={2} width={["90%","90%","90%","60%"]}>
            <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px" p={5} width="100%">
                    <Heading textAlign="left" as="h1" size={["lg"]} color="red.500" mb={3}>Agrega un lugar 🏠</Heading>
                    <Text textAlign="left" mb={8}>
                        <b>KorimaFood tiene una gran cantidad de lugares que se han obtenido de diferentes fuentes de internet.</b> <br/>
                        Sin embargo, no hay nada como las recomendaciones que puedes aportar tu! <br/> <br/>
                        Agrega ese lugar especial que no mucha gente conoce y que todo el 🌎 debería de conocer.
                    </Text>    

                    <form onSubmit={(e) => {handlePlaceSubmission(e)}}>
                        <FormControl isRequired>
                            <Input id="name" placeholder="Nombre del lugar" size="lg"  onChange={e => {setName(e.target.value)}} />
                        </FormControl >
                        <FormControl mt={4} isRequired>
                            <Input id="address" placeholder="Dirección" size="lg" onChange={e => {setAddress(e.target.value)}}/>
                        </FormControl>
                        <Select mt={4} placeholder="Elige una ciudad" size="lg" width="100%" onChange={e => {setCity(e.target.value)}} isRequired>
                            <option value="CUU">Chihuahua</option>
                            <option value="juarez">Juarez</option>
                            <option value="elpaso">El Paso TX</option>
                            <option value="cuauhtemoc">Cuauhtemoc</option>
                            <option value="parral">Parral</option>
                            <option value="delicias">Delicias</option>
                            <option value="meoqui">Meoqui</option>
                            <option value="creel">Creel</option>
                          </Select>
                        <FormControl mt={4}>
                            <Input id="phone" placeholder="Teléfono (Opcional)" size="lg"  onChange={e => {setPhone(e.target.value)}}/>
                        </FormControl>
                        <Select placeholder="Eres el dueño del lugar?" mt={4} size="lg" width="100%" onChange={e => {handleOwner(e.target.value)}} isRequired>
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </Select>
                         {isOwner ? (
                           <>                           
                            <Text mt={10}><b>Dejanos tu información de contacto, nos encanta colaborar con nuevos lugares!</b> </Text>
                            <Input mt={2} id="contactPhone" placeholder="Tu Teléfono" size="lg" onChange={e => {setOwnerPhone(e.target.value)}} isRequired />
                            <Input mt={4}id="contactEmail" placeholder="Tu Correo Electronico" size="lg"  onChange={e => {setOwnerEmail(e.target.value)}}/>
                           </>
                         ): null}

                         {showReview && (
                           <FormControl mt={4}>
                              <Textarea placeholder="¿Qué es lo mejor de este lugar?" onChange={e => {setReview(e.target.value)}} isRequired/>
                            </FormControl>
                         )}

                         <Button variantColor="red" my={19} size={["lg"]} width="100%" type="submit">{isLoading ? 'Enviando...':'Enviar'}</Button>

                    </form>

            </Box>
        </Flex>



      


      {/* -------CSS------- */}

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url('./images/background.jpg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          transition: background-image 0.5s ease-in-out;
        }
       
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default AddPlace


//Function to Show Toast Eror
const ShowErrorToast = (toast, title, description) => {
    toast({ title: title, description: description, status: "error", duration: 5000, isClosable: true })
}