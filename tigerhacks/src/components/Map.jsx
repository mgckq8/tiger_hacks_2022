import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import { MapboxDirections } from '@mapbox/mapbox-gl-directions';
// import { Button, TextField } from '@mui/material';
import './Map.css';
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');
// import { setFlagsFromString } from 'v8';
// var mapboxgl1 = require('mapbox-gl');
// var MapboxDirections = require('@mapbox/mapbox-gl-directions');

mapboxgl.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';
// MapboxDirections.accessToken = 'pk.eyJ1IjoibWdja3E4IiwiYSI6ImNsYTN6OHpiZzA2YjMzd3A5ZG5vdmE3NnAifQ.Ss29X7LJUswMcvJX5tWexw';

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
        // console.log("This this the passed Data", Data);
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

            setRoute(startLatitude, startLongitude, destLatitude, destLongitude);
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


      // create a function to make a directions request
      async function setRoute(startLatitude, startLongitude, destLatitude, destLongitude) {

        const routeQuery = await fetch (
            `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${destLongitude},${destLatitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await routeQuery.json();
        // console.log("my route json " + json.toString());
        const data = json.routes[0];
        const route = data.geometry.coordinates; // THIS IS HOW WE DO THE IMPORTANT POINTS ALONG THE WAY !!!!! UNEXPECTED DUB ??!!???
        console.log('right b4')   ;
        await map.current.addSource('source_id', {
                type: 'geojson',
                data: {
                type: 'FeatureCollection',
                features: []
                }
            });
            const geojsonSource = await map.current.getSource('source_id');
            // Update the data after the GeoJSON source was created
            await geojsonSource.setData({
                "type": "FeatureCollection",
                "features": [{
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": route
                }
                }]
            });

            if (map.current) {
                console.log('1')   ;
                // map.current(geojson);
                // map.current.setData(geojson);
            //    await geojsonSource.setData(geojson);
                // map.current.addSource('line', {
                //     type: 'geojson',
                //     lineMetrics: true,
                //     data: geojsonSource
                // });
                 await map.current.addLayer({  // STYLE IS NOT DONE LOADING
                    id: 'point',
                    type: 'circle',
                    source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                        {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                            type: 'LineString',
                            coordinates: route
                            }
                        }
                        ]
                    }
                },
                    paint: {
                    'circle-radius': 10,
                    // 'circle-color': '#ffffff'
                      'circle-color': '#3887be'
                    }
                });
        
                const end = {
                    type: 'FeatureCollection',
                    features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                        type: 'Point',
                        coordinates: [destLongitude, destLatitude]
                        }
                    }
                    ]
                };
            
                if (map.current.getLayer('end')) {
                    await map.current.getSource('end').setData(end);
                    console.log('2')   ;
                } else {
                    console.log('3')   ;
                    await map.current.addLayer({
                    id: 'end',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                            type: 'Feature',
                            // properties: {},
                            geometry: {
                                properties: {},
                                // type: 'LineString',
                                coordinates: route,
                                type: 'LineString'
                                // coordinates: [destLongitude, destLatitude]
                            }
                            }
                        ]
                        }
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#f30'
                    }
                    });
                
            }
            }
            // otherwise, we'll make a new request
            else {
                console.log('4')   ;
            await map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                type: 'geojson',
                data: geojsonSource // quewstionable
                },
                layout: {
                'line-join': 'round',
                'line-cap': 'round'
                },
                paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
                }
            });
            }

        // add turn instructions here at the end
    //   }
    console.log('5')   ;
    }

      // end

    //   map.on('load', () => {
    //     // make an initial directions request that
    //     // starts and ends at the same location
    //     setRoute([startLatitude, startLongitude]);
        // Add starting point to the map
        // map.addLayer({
        //   id: 'point',
        //   type: 'circle',
        //   source: {
        //     type: 'geojson',
        //     data: {
        //       type: 'FeatureCollection',
        //       features: [
        //         {
        //           type: 'Feature',
        //           properties: {},
        //           geometry: {
        //             type: 'Point',
        //             coordinates: [startLatitude, startLongitude]
        //           }
        //         }
        //       ]
        //     }
        // },
        //   paint: {
        //     'circle-radius': 10,
        //     'circle-color': '#3887be'
        //   }
        // });
//   // this is where the code from the next step will go
        // });
    //     map.on('click', (event) => {
    //   const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
    //   const end = {
    //     type: 'FeatureCollection',
    //     features: [
    //       {
    //         type: 'Feature',
    //         properties: {},
    //         geometry: {
    //           type: 'Point',
    //           coordinates: coords
    //         }
    //       }
    //     ]
    //   };
    //   if (map.getLayer('end')) {
    //     map.getSource('end').setData(end);
    //   } else {
    //     map.addLayer({
    //       id: 'end',
    //       type: 'circle',
    //       source: {
    //         type: 'geojson',
    //         data: {
    //           type: 'FeatureCollection',
    //           features: [
    //             {
    //               type: 'Feature',
    //               properties: {},
    //               geometry: {
    //                 type: 'Point',
    //                 coordinates: coords
    //               }
    //             }
    //           ]
    //         }
    //       },
    //       paint: {
    //         'circle-radius': 10,
    //         'circle-color': '#f30'
    //       }
    //     });
    //   }
    // //   setRoute(coords);
    // });
// }

    return (
        <div className='sectioncontainer'>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}