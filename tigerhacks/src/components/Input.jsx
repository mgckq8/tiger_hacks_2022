import { Button, TextField } from '@mui/material';
import React from 'react';
import './Input.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

export default function Input(){
    const [startLocation, setStartLocation] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [submitValue, setSubmitValue] = React.useState({
        startLocation: "",
        destinationLocation: ""
    });

    const handleStartChange = (event) => {
        setStartLocation(event.target.value);
    }
    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    }
    
    async function getCordinatesFromAPI(start) {

        start.replace(/\s/g, '%') 
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            start +
            '.json?access_token=pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

        return await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            const responseCenter = responseJson.features[0].center;
            const longitude = responseCenter[0];
            const latitude = responseCenter[1];
            const arr = [longitude, latitude];
          return arr;
        })
        .catch((error) => {
          console.error(error);
        });
     }

    async function handleSubmit() {
        const start = startLocation;
        const destinationLocation = destination;
        setSubmitValue({
            startLocation: start,
            destinationLocation: destinationLocation
        })

        const cordinates = await getCordinatesFromAPI(startLocation);
        const longitude = cordinates[0];
        const latitude = cordinates[1];
        console.log("longitude: " + longitude);
        console.log("latitude: " + latitude);
        console.log(startLocation);
        console.log(submitValue)

    }
    return (
        <div className="inputcontainer">
            <div className='textfields'>
                <TextField id="geocoder" size="small" className='inputItem' label="Start Location" value={startLocation} onChange={handleStartChange} />
                <TextField id="output" size="small" className='inputItem' label="Destination" value={destination} onChange={handleDestinationChange} />
            </div>
            <div className='submitbutton'>
                <Button className='inputItem' onClick={handleSubmit} variant="contained" size='small'>Submit</Button>
            </div>
        </div>
    )
}