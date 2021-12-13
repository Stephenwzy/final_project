mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/stephenwzy/ckx44cvyk5rls15umly8powbx',
    center: [-122.32559, 47.641025],
    zoom: 11,
    scrollZoom: true
});

async function geojsonFetch() {

    let response, starbucks;
    response = await fetch('assets/starbucks.geojson');
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
                    '#f6eff7',
                    5,
                    '#d0d1e6',
                    10,
                    '#a6bddb',
                    20,
                    '#67a9cf',
                    40,
                    '#1c9099',
                    80,
                    '#016c59'
                ],
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