import { TextField } from '@mui/material';
import React from 'react';
import './Input.css'

export default function Input(){
    const [startLocation, setStartLocation] = React.useState("");
    const [destination, setDestination] = React.useState("");

    const handleStartChange = (event) => {
        setStartLocation(event.target.value);
    }
    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    }
    
    return(
        <div className="inputcontainer">
            <TextField label="Start Location" value={startLocation} onChange={handleStartChange}/>
            <TextField label="Destination" value={destination} onChange={handleDestinationChange}/>
        </div>
    )
}