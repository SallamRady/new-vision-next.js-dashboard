'use client'
import { useState } from 'react'

import { Box } from '@mui/material'
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api'

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '400px',
  position: 'relative'
}

const center = {
  lat: 21.5292,
  lng: 39.1611
}

const polylineOptions = {
  strokeColor: 'blue',
  strokeOpacity: 1.0,
  strokeWeight: 2
}

export default function SetAddressGoogleMap() {
  // declare and define component state and variables
  const [clickedPositions, setClickedPositions] = useState<PointPositionType[]>([])

  // declare and define component helper methods
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedPosition: PointPositionType = { lat: event.latLng.lat(), lng: event.latLng.lng() }

      setClickedPositions(prev => [...prev, clickedPosition])
      console.log('clickedPosition:', clickedPosition)
    }
  }

  // return component uiF
  return (
    <Box
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        height: '400px',
        width: '100%',
        my: 4
      }}
    >
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13} onClick={handleMapClick}>
          {/* Markers */}
          {clickedPositions.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          {/* Polyline */}
          {clickedPositions.length > 1 && <Polyline path={clickedPositions} options={polylineOptions} />}
        </GoogleMap>
      </LoadScript>
    </Box>
  )
}

type PointPositionType = { lat: number; lng: number }
