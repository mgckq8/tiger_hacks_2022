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
    // const newRouteInfo = useRef(null);
    // console.log(RouteInfo);
    // if (!hasFailed) {
    //     if(RouteInfo){
    //         newRouteInfo = RouteInfo;
    //         const arrLen = newRouteInfo.length;
    //         var addressArr = []
    //         const increment = Math.ceil(arrLen/ 10);
    //         var i = increment;
    //         var dummy = [];
    //         var temp =[];
    //         if (!hasFailed) {
    //         for(i; i<arrLen; i+=increment){
    //             lon = newRouteInfo[i][0];
    //             lat = newRouteInfo[i][1];
    //             addressArr[i] += getAddressesFromAPI(newRouteInfo[i][0], newRouteInfo[i][1])
    //             temp[i] = addressArr[i];

    //             // dummy[i] += loadList(newRouteInfo[i][0], newRouteInfo[i][1])
    //         } 
    //         setCards(temp)
    //         console.log("Card stuff",cards)
    //     }
    //     }
    // }
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    //  }

    // if (RouteInfo) {
    //     newRouteInfo = RouteInfo;
    //     const arrLen = newRouteInfo.length;
    //     var addressArr = []
    //     for (var i =0; i < arrLen; i++) {
    //         addressArr += getAddressesFromAPI(newRouteInfo[i][0], newRouteInfo[i][1])
    //     } 
    // }



    //https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.
    //json?access_token=pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd
    //3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw



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

    // "radius",
    // `radius=10000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=json`

    // useEffect(() => {
    //     let query="radius=10000&limit="
    //     + pageLength
    //     + "&offset=" + offset + "&lon=" + lon + "&lat=" +lat +"&rate=2&format=json";

    //     let url = "https://api.opentripmap.com/0.1/en/places/" +
    //     "radius" +
    //     "?apikey=" + apiKey;
    //     if (query !== undefined) {
    //         url += "&" + query;
    //     }

    //     fetch(url).then(res => res.json()).then(data=> {
    //         setapiVal(data);
    //     })
    // }, [])

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
                    // console.log("apiget : " + responseJson);
                    // apiCallsCount++;

                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    async function handleSubmit() {
        loadList();
        // if (RouteInfo) {

    // }
        // setSubmitValue({
        //     location: "New York City"
        // })
        // let name = "New York City";
        // await apiGet("geoname", "name=" + name).then(function (data) {
        //     let message = "Name not found.";
        //     if (data.status === "OK") {
        //         console.log(data);
        //         message = data.name + ', ' + 'United States of America';
        //         // message = data.name + ", " + getCountryName(data.country);
        //         lon = data.lon;
        //         lat = data.lat;
        //         firstLoad();
        //     }
        // });
        // console.log(submitValue)
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
        if (!hasFailed) {
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