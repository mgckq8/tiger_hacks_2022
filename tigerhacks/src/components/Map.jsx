import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

export default function Map({Data}) {


    const mapContainer = useRef(null);
    const map = useRef(null);
    // eslint-disable-next-line
    const [lng, setLng] = useState(-92.330150);
    // eslint-disable-next-line
    const [lat, setLat] = useState(38.946053);
    // eslint-disable-next-line
    const [zoom, setZoom] = useState(11);
    if (Data) {
        console.log("This this the passed Data", Data);
        let DataHold = Data.toString();
        var arr = DataHold.split(',');
        console.log("first lat: " + arr[0]);
        // console.log("This this the passed Data", Object.values(Data));
    }
    // console.log("This this the passed Data", Data);
    // let DataHold = Data.toString();
    // var arr = DataHold.Split(',');
    // console.log("first lat: " + arr[0]);
    // console.log("This this the passed Data", Object.values(Data));


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div className='sectioncontainer'>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}