import { NextSeo } from 'next-seo';
import WelcomeBlock from '../components/welcomeblock';
import React, { useState, useEffect} from 'react';
import MadeBy from '../components/madeby'


const Home = () => {
  let emojisList = ["🌮", "🌯", "🥑", "🍰", "🍺", "🍔", "🍜", "🥩", "🥦", "🥙"]
  let placesList = ["Cd. Chihuahua", "Cd. Juarez", "El Paso TX", "Cd. Cuauthemoc", "Delicias", "Meoqui", "Creel"]
  const [title, setTitle] = useState("Korima Food " + emojisList[0] )
  const [place, setPlace] = useState(placesList[0])


  useEffect(() => {
    let emojiIndex = 0
    let placeindex = 0
    setInterval(() => {
      emojiIndex ++
      placeindex ++
      if(emojiIndex === emojisList.length-1){emojiIndex = 0}
      if(placeindex === placesList.length-1){placeindex = 0}
      setTitle("Korima Food " + emojisList[emojiIndex])
      setPlace(placesList[placeindex])
      }, 1500);
    }, [])

    



    

  return (
    <div className="container">
      <NextSeo
      title={`${title} - Comida en Chihuahua México`}  
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
      
      <WelcomeBlock 
        heading={title} 
        description="Encuentra un lugar distinto para comer en "
        place={place}
        buttonText="Recomiendame un lugar"
      /> 

      <MadeBy/>

      

      {/* -------CSS------- */}

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
