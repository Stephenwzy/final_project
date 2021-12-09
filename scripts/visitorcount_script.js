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
    starbucks = await response.json()

    map.on('load', () => {

        
        
        map.addLayer({
            id: 'raw_visit',
            type: 'circle',
            source: {
                type: 'geojson',
                data: starbucks
            },
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['number', ['get','raw_visit_counts']],
                    0, 2,
                    50, 6,
                    100, 10,
                    500, 16,
                    1000, 22,
                    3000, 28
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

        /*document
        .getElementById('filters')
        .addEventListener('change', (event) => {
            const day = event.target.value;
            for (const site of starbucks.features){
                if (day == site.properties.popularity_by_day[0]) {
                    filterDay = ['!=', ['string', ['get', 'popularity_by_day']], 'placeholder'];
                } else{
                    console.error('error');
                }
            }
            
            
            map.setFilter('raw_visit', ['all', filterDay]);

        });*/


    });

};
geojsonFetch();