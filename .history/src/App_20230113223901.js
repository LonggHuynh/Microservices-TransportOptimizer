import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  SkeletonText,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import './App.css'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')



  if (!isLoaded) {
    return <></>
  }

  async function calculateRoute() {
    
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: 1,
      destination: 2,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
  }

  return (
    <div
      className='container'
    >
      <div className='mapContainer'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className='console'  >
        <div>
          <div >
            <Autocomplete>
              <input type='text' placeholder='Origin' />
            </Autocomplete>
          </div>
          <div>
            <Autocomplete>
              <input type='text' placeholder='Destination' />
            </Autocomplete>
          </div>

          <button type='submit' onClick={calculateRoute}>
            Calculate Route
          </button>

        </div>
        <div>
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>

          <FaLocationArrow onClick={() => {
            map.panTo(center)
            map.setZoom(15)
          }} />

        </div>
      </div>
    </div>
  )
}

export default App
