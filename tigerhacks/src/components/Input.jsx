import { Button, TextField } from '@mui/material';
import React from 'react';
import './Input.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Location } from '../interface/location';
import Map from './Map';
import './Map.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

export default function Input() {
    const [startLocation, setStartLocation] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [locations, setLocations] = React.useState({
        startLocation: "",
        destinationLocation: ""
    });
    const [submitLocations, setSubmitLocations] = React.useState();

    
    const handleStartChange = e => {
        setStartLocation(e.target.value);
    }
    const handleDestinationChange = e => {
        setDestination(e.target.value);
    }

    const handleClear = () => {
        setStartLocation('');
        setDestination('');
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
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
    async function handleSubmit() {
        const startCordinates = await getCordinatesFromAPI(startLocation);
        const startLongitude = startCordinates[0];
        const startLatitude = startCordinates[1];
        const destCordinates = await getCordinatesFromAPI(destination);
        const destLongitude = destCordinates[0];
        const destLatitude = destCordinates[1];
        var firstLocation = new Location();
        firstLocation.locationName = startLocation;
        firstLocation.latitude = startLatitude;
        firstLocation.longitude = startLongitude;
        var secondLocation = new Location();
        secondLocation.locationName = destination;
        secondLocation.latitude = destLatitude;
        secondLocation.longitude = destLongitude;
        const start = startLocation;
        const destinationLocation = destination;
        setSubmitLocations(startLatitude + "," + startLongitude + "," + destLatitude + "," + destLongitude)
        await sleep(2000);
        setSubmitLocations(null);
    }
    return (
        <><div className="inputcontainer">
            <div className='textfields'>
                <TextField id="geocoder" size="small" className='inputItem' label="Start Location" value={startLocation} onChange={handleStartChange} />
                <TextField id="output" size="small" className='inputItem' label="Destination" value={destination} onChange={handleDestinationChange} />
            </div>
            <div className='submitbutton'>
                <Button className='inputItem' onClick={handleSubmit} variant="contained" size='small'>Submit</Button>
                <Button className='inputItem' onClick={handleClear} variant="contained" size='small'>Clear</Button>
            </div>
        </div><Map Data={submitLocations}/>
        </>
        )
}