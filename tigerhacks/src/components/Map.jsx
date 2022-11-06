import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css';
// import { setFlagsFromString } from 'v8';

mapboxgl.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

//https://api.mapbox.com/directions/v5/mapbox/driving/
//-73.816334%2C
//40.70032525%3B
//-73.781749%2C
//40.642421999999996%3B
//-73.8389075%2C
//40.652682999999996
//?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=

export default function Map({Data}) {
    let startLatitude;
    let startLongitude;
    let destLatitude;
    let destLongitude;

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

        startLatitude = parseFloat(arr[0]);
        startLongitude = parseFloat(arr[1]);
        destLatitude = parseFloat(arr[2]);
        destLongitude = parseFloat(arr[3]);

        let dynzoom = getZoom(startLongitude, destLongitude);

        if (startLatitude && startLongitude && destLatitude && destLongitude) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [(startLongitude+destLongitude)/2, ((startLatitude+destLatitude)/2)],
                zoom: dynzoom
            });

            const marker = new mapboxgl.Marker({
                draggable: true
            })
            .setLngLat([startLongitude, startLatitude])
            .addTo(map.current);

            const marker2 = new mapboxgl.Marker({
                draggable: true
            })
            .setLngLat([destLongitude, destLatitude])
            .addTo(map.current);
        }
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    });

    function getZoom(start, dest) {
        let dif = Math.abs(start-dest);

        if (dif > 30) {
            return 2.5;
        } else if (dif > 25) {
            return 3;
        }
        else if (dif > 20) {
            return 3.5;
        } else if (dif > 10) {
            return 4;
        } else {
            return 4.5;
        }
    }

    return (
        <div className='sectioncontainer'>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}