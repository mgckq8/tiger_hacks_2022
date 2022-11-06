import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SuggestedLocations.css'

export default function SuggestedLocations({RouteInfo}) {
    const [submitValue, setSubmitValue] = React.useState({
        location: ""
    });
    const [apiVal, setapiVal] = React.useState();
    const [cards, setCards] = React.useState("");
    const pageLength = 10; // number of objects per page
    let offset = 0; // offset from first object in the list
    let count; // total objects count
    const apiKey = "5ae2e3f221c38a28845f05b69115ae715c39b2204f6e301bad540769";

    let apiCallsCount = 0;
// /40.71224487090236, -73.99756690244274
    let lon = -73.99756690244274;
    let lat =40.71224487090236;
    let newRouteInfo;
    const hasFailed = false;

    async function getAddressesFromAPI(long, lat) {

        // start.replace(/\s/g, '%')
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
            long + "," + lat + 
            '.json?access_token=pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

        return await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                const responseCenter = responseJson.features[2].place_name;
                console.log(responseCenter);
                return responseCenter;
            })
            .catch((error) => {
                console.error(error);
            });
    }


    async function apiGet(method, query) {
        if (!hasFailed) {
            let url = "https://api.opentripmap.com/0.1/en/places/" +
                method +
                "?apikey=" +
                apiKey;
            if (query !== undefined) {
                url += "&" + query;
            }
            return await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    async function handleSubmit() {
        loadList();
    }

    async function firstLoad() {
        await apiGet(
            "radius",
            `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
        ).then(function (data) {
            count = data.count;
            offset = 0;
            loadList();
        });
    }

    async function loadList() {
        if (!hasFailed) {
        await apiGet(
            "radius",
            `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
        ).then(function (data) {
            setCards(data)
        });
    }

    }

    return (
        <div className="cardsContainter">
            {/* <button id="nextBtn" onClick={handleNext}>Next</button> */}
            <div className="section">
                <div className="containertitle">
                {/* <Button className='inputItem' onClick={handleClear} variant="contained" size='small'>Clear</Button> */}

                <Button className='inputItem'id="submitBtn" onClick={handleSubmit} variant="contained" size='small'>Find Suggested Locations</Button>
                    {/* <p className='containertitletext'>Suggested Locations</p> */}
                </div>
                <div className="scrollable">
                    { cards && cards.map((item, index) =>
                        <div className='carditem'key={index}>
                            <Card sx={{ maxWidth: 200 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        User Rated: {item.rate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* <Button size="small">Learn More</Button> */}
                                </CardActions>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}