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
    starbucks = await response.json();

    starbucks.features.forEach((site, i) => {
        site.properties.id = i;
    });

    map.on('load', () => {

        map.addSource('starbucks', {
            'type': 'geojson',
            'data': starbucks
        });

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl:mapboxgl,
            marker:true,
            bbox: [-122.437866,47.513784,-122.239633,47.774180],
            placeholder: 'Search in Seattle ...',
        });

        buildLocationList(starbucks);
        map.addControl(geocoder, 'top-right');
        addMarkers();

        geocoder.on('result', (event) => {
            const searchResult = event.result.geometry;

            const options = {
                units: 'miles'
            };
            for (const site of starbucks.features) {
                site.properties.distance = turf.distance(
                    searchResult,
                    site.geometry,
                    options
                );
            }

            starbucks.features.sort((a, b) => {
                if (a.properties.distance > b.properties.distance) {
                    return 1;
                }
                if (a.properties.distance < b.properties.distance) {
                    return -1;
                }
                return 0;
            });


            const listings = document.getElementById('listings');
            while (listings.firstChild) {
                listings.removeChild(listings.firstChild);
            }
            buildLocationList(starbucks);
            createPopUp(starbucks.features[0]);

            const activeListing = document.getElementById(
                `listing-${starbucks.features[0].properties.id}`
            );
            activeListing.classList.add('active');


            const bbox = getBbox(starbucks, 0, searchResult);
            map.fitBounds(bbox, {
                padding: 100
            });
        });
    });


    function getBbox(sortedStarbucks, siteIdentifier, searchResult) {
        const lats = [
            sortedStarbucks.features[siteIdentifier].geometry.coordinates[1],
            searchResult.coordinates[1]
        ];

        const lons = [
            sortedStarbucks.features[siteIdentifier].geometry.coordinates[0],
            searchResult.coordinates[0]
        ];

        const sortedLons = lons.sort((a, b) => {
            if (a > b) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            return 0;
        })

        const sortedLats = lats.sort((a, b) => {
            if (a > b) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            return 0;
        })
    }


    function addMarkers() {
        for (const marker of starbucks.features) {
            const el = document.createElement('div');
            el.id = `marker-${marker.properties.id}`;
            el.className = 'marker';

            new mapboxgl.Marker(el, {
                    offset: [0, -23]
                })
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);

            el.addEventListener('click', (e) => {
                flyToStore(marker);
                createPopUp(marker);
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(
                    `listing-${marker.properties.id}`
                );
                listing.classList.add('active');
            });
        }
    }

    function buildLocationList(starbucks) {
        for (const site of starbucks.features) {
            const listings = document.getElementById('listings');
            const listing = listings.appendChild(document.createElement('div'));
            listing.id = `listing-${site.properties.id}`;
            listing.className = 'item';

            const link = listing.appendChild(document.createElement('a'));
            link.href = '#';
            link.className = 'title';
            link.id = `link-${site.properties.id}`;
            link.innerHTML = `${site.properties.street_address}`;

            const details = listing.appendChild(document.createElement('div'));
            details.innerHTML = `${site.properties.city}`;
            if (site.properties.phone_number) {
                details.innerHTML += ` &middot; ${site.properties.phone_number}`;
            }
            details.innerHTML += ` &middot; ${site.properties.postal_code}`;


            if (site.properties.distance) {
                const roundedDistance =
                    Math.round(site.properties.distance * 100) / 100;
                details.innerHTML += `<div><strong>${roundedDistance} miles away</strong><div>`;
            }




            link.addEventListener('click', function () {
                for (const feature of starbucks.features) {
                    if (this.id === `link-${feature.properties.id}`) {
                        flyToStore(feature);
                        createPopUp(feature);
                    }
                }
                const activeItem = document.getElementsByClassName('active');
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                this.parentNode.classList.add('active');

            });
        }
    }

    function flyToStore(currentFeature) {
        map.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 13
        });
    }


    function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({
                closeOnClick: false
            })
            .setLngLat(currentFeature.geometry.coordinates)
            .setHTML(
                `<h3>STARBUCKS</h3><h4>${currentFeature.properties.street_address}</h4>`
            )
            .addTo(map);
    }


}
geojsonFetch();

function rv() {
    window.location.href = 'visitorcount.html';
}

function md(){
    window.location.href = 'dwelltime.html';
}

function bk(){
    window.location.href = 'index.html';
}