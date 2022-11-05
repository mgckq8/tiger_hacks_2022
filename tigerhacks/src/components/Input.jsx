import { Button, TextField } from '@mui/material';
import React from 'react';
import './Input.css'

export default function Input() {
    const [startLocation, setStartLocation] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [submitValue, setSubmitValue] = React.useState({
        start: "",
        end: ""
    });
    

    const handleStartChange = e => {
        setStartLocation(e.target.value);
    }
    const handleDestinationChange = e => {
        setDestination(e.target.value);
    }

    const handleSubmit = () => {

        setSubmitValue({
            start: startLocation,
            end: destination
        })
        console.log(submitValue);

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