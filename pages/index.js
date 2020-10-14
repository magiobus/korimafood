import Head from 'next/head'
import { Flex, Heading, Text, Box, Button} from "@chakra-ui/core";
import { NextSeo } from 'next-seo';

const Home = () => {
 
  return (
    <div className="container">
      <NextSeo
      title="Korima Food 🌮 | Comida en Chihuahua México"
      description="Encuentra lugares de comida en la ciudad de Chihuahua México"
      canonical="https://www.korimafood.com/"
      openGraph={{
        url: 'https://www.korimafood.com/',
        title: 'Korima Food 🌮',
        description: 'Encuentra un lugar distinto para comer en la ciudad de Chihuahua',
        images: [ {url: '/images/opengraph.jpg', width: 1280, height: 720, alt: 'Korima Food, Comida en Chihuahua'}],
        site_name: 'Korima Food 🌮, lugares de comida en Chihuahua México',
      }}
      twitter={{ handle: '@magiobus', site: '@magiobus', cardType: 'summary_large_image'}}
    />
  
      <Flex align="center" justify="center" direction="column" mx={2} >
        <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px"  p={5}>
          <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>Korima Food 🌮</Heading>
          <Text textAlign="center" m={0} fontSize={["lg", "xl", "2xl"]} align="center" color="gray.600"><b>Encuentra un lugar distinto para comer en la ciudad de Chihuahua</b></Text>
          <Button variantColor="red"  my={19}size={["lg"]}>Recomiendame un lugar</Button>
        </Box>
      </Flex>

      <style jsx>{`

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url('/images/background.jpg');
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

export default Home
