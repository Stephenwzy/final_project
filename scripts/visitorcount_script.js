mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-122.32559, 47.641025],
    zoom: 11,
    scrollZoom: true
});

async function geojsonFetch() {

    let response, raw_visit;
    response = await fetch('assets/starbucks_sea.geojson');
    raw_visit = await response.json()

    map.on('load', () => {

        map.addLayer({
            id: 'raw_visit',
            type: 'circle',
            source: {
                type: 'geojson',
                data: raw_visit
            },
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['number', ['get', 'raw_visit_counts']],
                    0, 4,
                    50, 6,
                    100, 8,
                    500, 12,
                    1000, 16,
                    3000, 24
                ],
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['number', ['get', 'raw_visit_counts']],
                    0,
                    '#2DC4B2',
                    50,
                    '#3BB3C3',
                    100,
                    '#669EC4',
                    500,
                    '#8B88B6',
                    1000,
                    '#A2719B',
                    3000,
                    '#AA5E79'
                ],
                'circle-opacity': 0.8
            },
        });


    });

};
geojsonFetch();