import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SuggestedLocations.css'

export default function SuggestedLocations() {
    const [submitValue, setSubmitValue] = React.useState({
        location: ""
    });
    const [cards, setCards] = React.useState("");

    const pageLength = 10; // number of objects per page

    let lon;
    let lat;

    let offset = 0; // offset from first object in the list
    let count; // total objects count
    const apiKey = "5ae2e3f221c38a28845f05b69115ae715c39b2204f6e301bad540769";

    async function apiGet(method, query) {
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
    async function handleSubmit() {
        setSubmitValue({
            location: "New York City"
        })
        let name = "New York City";
        await apiGet("geoname", "name=" + name).then(function (data) {
            let message = "Name not found.";
            if (data.status === "OK") {
                console.log(data);
                message = data.name + ', ' + 'United States of America';
                // message = data.name + ", " + getCountryName(data.country);
                lon = data.lon;
                lat = data.lat;
                firstLoad();
            }
        });
        console.log(submitValue)
    }
    async function firstLoad() {
        await apiGet(
            "radius",
            `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
        ).then(function (data) {
            count = data.count;
            offset = 0;
            //   document.getElementById(
            //     "info"
            //   ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
            loadList();
        });
    }

    // TODO !!!!
    /*
      format the list being passed so that the data goes into the cards instead of into
      the <p> element "list".
    */
    async function loadList() {
        await apiGet(
            "radius",
            `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`
        ).then(function (data) {
            setCards(data)
            console.log(cards);
            //   let nextBtn = document.getElementById("nextBtn");
            //   if (count < offset + pageLength) S
            //     nextBtn.style.visibility = "hidden";
            //   } else {
            //     nextBtn.style.visibility = "visible";
            //     nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
            //   }
        });
    }
    //   function onShowPOI(data) {
    //     let poi = document.getElementById("poi");
    //     poi.innerHTML = "";
    //     if (data.preview) {
    //       poi.innerHTML += `< img src = "${data.preview.source}" > `;
    //     }
    //     poi.innerHTML += data.wikipedia_extracts
    //       ? data.wikipedia_extracts.html
    //       : data.info
    //       ? data.info.descr
    //       : "No description";

    //     poi.innerHTML += `< p > <a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p > `;
    //   }

    // async function handleNext() {
    //     offset += pageLength;
    //     await loadList();
    // }

    return (
        <div className="cardsContainter">
            <button id="submitBtn" onClick={handleSubmit}>Submit</button>
            {/* <button id="nextBtn" onClick={handleNext}>Next</button> */}
            <div className="section">
                <div className="containertitle">
                    <p className='containertitletext'>Suggested Locations</p>
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
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}