mapboxgl.accessToken = 'pk.eyJ1IjoiZXhyb2ciLCJhIjoiY2xyM20yZmU0MTM2MjJqdGF5MjdqbHgwcSJ9.2eHrPl9VUmwid4F2tyDJIg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [32.85398, 39.92032], 
    zoom: 10
});

function selectParcel(row) {
    var mahalle = row.getAttribute('data-mahalle');
    var ada = row.getAttribute('data-ada');
    var parsel = row.getAttribute('data-parsel');

    fetch('https://cbsapi.tkgm.gov.tr/megsiswebapi.v3/api/parsel/download/'+mahalle+'/' + ada + '/' + parsel + '/json')
        .then(response => response.json())
        .then(data => {
            map.getSource('custom-polygon').setData(data);

            var polygonCenter = getPolygonCenter(data.features[0].geometry.coordinates[0]);
            map.jumpTo({
                center: polygonCenter,
                zoom: 17
            });

        })
        .catch(error => {
            console.error('API İsteği Hatası:', error);
        });
}



function getPolygonCenter(coordinates) {
    var x = 0;
    var y = 0;
    var len = coordinates.length;

    coordinates.forEach(coord => {
        x += coord[0];
        y += coord[1];
    });

    return [x / len, y / len];
}

map.on('load', function () {
    map.addSource('custom-polygon', {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    });

    map.addLayer({
        'id': 'parcel',
        'type': 'fill',
        'source': 'custom-polygon',
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.5
        }
    });

    map.on('click', 'parcel', function (e) {
        var coordinates = e.features[0].geometry.coordinates[0];
        var polygonCenter = getPolygonCenter(coordinates);

        document.getElementById('general-popup').style.display = 'block';
        document.getElementById('popup-overlay').style.display = 'block';
    });

    map.on('mouseleave', 'parcel', function () {
        map.getCanvas().style.cursor = '';
    });
});


