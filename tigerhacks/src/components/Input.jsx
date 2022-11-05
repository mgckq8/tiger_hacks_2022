import { Button, TextField } from '@mui/material';
import React from 'react';
import './Input.css'

export default function Input() {
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

    const handleSubmit = () => {
        const start = startLocation;
        const destinationLocation = destination;
        setSubmitValue({
            startLocation: start,
            destinationLocation: destinationLocation
        })
        console.log(submitValue)

    }
    return (
        <div className="inputcontainer">
            <div className='textfields'>
                <TextField size="small" className='inputItem' label="Start Location" value={startLocation} onChange={handleStartChange} />
                <TextField size="small" className='inputItem' label="Destination" value={destination} onChange={handleDestinationChange} />
            </div>
            <div className='submitbutton'>
                <Button className='inputItem' onClick={handleSubmit} variant="contained" size='small'>Submit</Button>
            </div>
        </div>
    )
}