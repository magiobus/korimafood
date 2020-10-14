import Head from 'next/head'
import { Flex, Heading, Text, Box, Button} from "@chakra-ui/core";
import React, { useState, useEffect} from 'react';

const Home = () => {
 
  return (
    <div className="container">
      <Head>
        <title>Korima Food </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex align="center" justify="center" direction="column" mx={2} >
        <Box textAlign="center" bg="gray.50" borderWidth="1px" rounded="10px"  p={5}>
          <Heading as="h1" size={["2xl"]} color="red.500" mb={3}>Korima Food 🌮</Heading>
          <Text textAlign="center" m={0} fontSize={["xl", "xl", "2xl"]} align="center">Encuentra un lugar distinto para comer en la ciudad de Chihuahua</Text>
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
          background-image: url('/backgrounds/background1.jpg');
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
