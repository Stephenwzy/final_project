mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/stephenwzy/ckvwuj27t521t14m6wdjnm7d4',
    center: [-122.32559, 47.641025],
    zoom: 11,
    scrollZoom: true
});

async function geojsonFetch() {

    let response, starbucks;
    response = await fetch('assets/starbucks_sea.geojson');
    starbucks = await response.json()

    map.on('load', () => {

        
        
        map.addLayer({
            id: 'median_dwelltime',
            type: 'circle',
            source: {
                type: 'geojson',
                data: starbucks
            },
            paint: {
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['number', ['get','median_dwell']],
                    0, 2,
                    5, 6,
                    10, 10,
                    20, 16,
                    40, 22,
                    80, 28
                ],
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['number', ['get','median_dwell']],
                    0,
                    '#2DC4B2',
                    5,
                    '#3BB3C3',
                    10,
                    '#669EC4',
                    20,
                    '#8B88B6',
                    40,
                    '#A2719B',
                    80,
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

function bk(){
    window.location.href = 'index.html';
}