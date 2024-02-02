
  document.getElementById('addparcel').addEventListener('submit', function(event) {
      
      var alanInput = document.getElementById('alan1');

      
      alanInput.value = alanInput.value.replace(',', '').split('.')[0];

     
      var tarlaId = document.getElementById('tarla_id').value;
      var tarlaAdiInput = document.getElementById('tarla_adi');
      tarlaAdiInput.value = 'Tarla ' + tarlaId;

    
      return true;
  });





 
  const apiKey = 'aee9368ab4b3e538bec75d39005eccf3';

  function getHavaDurumu() {
      
      const selectedCityElement = document.getElementById('ilce');
      const selectedCity = selectedCityElement.options[selectedCityElement.selectedIndex].text

      document.getElementById('selectedCity').innerHTML = 'Seçilen Şehir: ' + selectedCity;
      
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity},TR&appid=${apiKey}`;

      
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              

              const temperatureKelvin = data.main.temp;
              const temperatureCelsius = Math.round(temperatureKelvin - 273.15); // Kelvin'i Celsius'a çeviriyorum.

              const description = data.weather[0].main;

              
              document.getElementById('temperature').innerHTML = 'Sıcaklık: ' + temperatureCelsius + '°C';
              document.getElementById('description').innerHTML = 'Açıklama: ' + description;

          })
          .catch(error => console.error('Hava durumu bilgileri alınamadı:', error));
  }


  function getHavaDurumuSayfaonLoad() {
      

    
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=KESAN,TR&appid=${apiKey}`; //Sayfa acilirken kesanin hava durumunu yazar 

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            

            const temperatureKelvin = data.main.temp;
            const temperatureCelsius = Math.round(temperatureKelvin - 273.15); // Kelvin'i Celsius'a çeviriyorum.

            const description = data.weather[0].main;

            document.getElementById('selectedCity').innerHTML = 'Seçilen Şehir: ' + "Keşan";
            document.getElementById('temperature').innerHTML = 'Sıcaklık: ' + temperatureCelsius + '°C';
            document.getElementById('description').innerHTML = 'Açıklama: ' + description;

        })
        .catch(error => console.error('Hava durumu bilgileri alınamadı:', error));
}


function submitForm() {
  var form = document.getElementById("addparcel");
  form.submit();
}
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXhyb2ciLCJhIjoiY2xyM20yZmU0MTM2MjJqdGF5MjdqbHgwcSJ9.2eHrPl9VUmwid4F2tyDJIg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [
    32.85398,
    39.92032
  ], 
    zoom: 10
  });


function ParselBul() {
    console.log("Sorgulama Basarili");
    const idcek = document.getElementById('locationSelect').value
    const ada = document.getElementById('ada1').value
    const parsel = document.getElementById('parsel1').value

    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhyb2ciLCJhIjoiY2xyM20yZmU0MTM2MjJqdGF5MjdqbHgwcSJ9.2eHrPl9VUmwid4F2tyDJIg';


    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
      32.85398,
      39.92032
    ], 
      zoom: 10
    });



    var a = idcek
    var b = ada
    var c = parsel
    let jsonUrlGeoMap = 'https://cbsapi.tkgm.gov.tr/megsiswebapi.v3/api/parsel/download/' + a + '/' + b + '/' + c + '/json'

    document.getElementById("ada").innerHTML = document.getElementById('ada1').value;
    document.getElementById("parsel").innerHTML = document.getElementById('parsel1').value;

    fetch(jsonUrlGeoMap)
      .then(response => response.json())
      .then(data => {
        var feature = data.features[0];
        var coordinates = feature.geometry.coordinates[0].map(coord => [coord[0], coord[1]]);

        var polygonCenter = getPolygonCenter(coordinates);
       
        map.on('load', function () {
          map.addLayer({
            'id': 'parcel',
            'type': 'fill',
            'source': {
              'type': 'geojson',
              'data': feature
            },
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.5
            }

          }

          );
          map.flyTo({
            center: polygonCenter,
            zoom: 15
          });

          
          map.on('click', 'parcel', function (e) {
            var properties = e.features[0].properties;
            document.getElementById("alan").innerHTML = properties.Alan
            document.getElementById("alan1").value = properties.Alan
            
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(
                '<h3>Parsel Bilgileri</h3>' +
                '<p>Ada: ' + properties.Ada + '</p>' +
                '<p>Parsel No: ' + properties.ParselNo + '</p>' +
                '<p id="alan" >Alan: ' + properties.Alan + '</p>' +
                '<p>Mevkii: ' + properties.Mevkii + '</p>' +
                '<p>Nitelik: ' + properties.Nitelik + '</p>' +
                '<button id="mapBtn" ref=${this.buttonRef.current}>Tarlayi Ekle</button>'
              )
              .addTo(map);
              const mapBtn = document.getElementById("mapBtn");
              mapBtn.addEventListener("click", () => {
                document.getElementById('submitbtn').click();
            });
          });



          
          map.on('mouseenter', 'parcel', function () {
            map.getCanvas().style.cursor = 'pointer';
          });

          
          map.on('mouseleave', 'parcel', function () {
            map.getCanvas().style.cursor = '';
          });
        });

      })
      .catch(error => console.error('JSON okuma hatası:', error));

    function getPolygonCenter(polygonCoordinates) {
      var bounds = polygonCoordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(polygonCoordinates[0], polygonCoordinates[0]));

      return bounds.getCenter();
    }


  }
  function ilsec() {
    const json3 = 'https://cbsapi.tkgm.gov.tr/megsiswebapi.v3/api/IdariYapi/illiste/ '

    const illocationSelect = document.getElementById('il');

    illocationSelect.addEventListener('change', function () {
      const selectedOptionValue2 = illocationSelect.value;

      
      console.log('Seçilen il ID:', selectedOptionValue2);
    });
    fetch(json3)
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const option = document.createElement('option');
          option.value = feature.properties.id;
          option.text = feature.properties.text;
          illocationSelect.add(option);
        });
      })
      .catch(error => console.error('API hatası:', error));
  }

  function ilcesec() {
    bx = document.getElementById("il").value;
    const json2 = 'https://cbsapi.tkgm.gov.tr/megsiswebapi.v3/api//idariYapi/ilceListe/' + bx

    const ilcelocationSelect = document.getElementById('ilce');

    ilcelocationSelect.addEventListener('change', function () {
      const selectedOptionValue1 = ilcelocationSelect.value;

      console.log('Seçilen ilce ID:', selectedOptionValue1);
    });
    fetch(json2)
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const option = document.createElement('option');
          option.value = feature.properties.id;
          option.text = feature.properties.text;
          ilcelocationSelect.add(option);
        });
      })
      .catch(error => console.error('API hatası:', error));
  }

  function mahallesec() {
    ax = document.getElementById("ilce").value;
    const jsonUrl = 'https://cbsapi.tkgm.gov.tr/megsiswebapi.v3/api/IdariYapi/mahalleListe/' + ax;

    const locationSelect = document.getElementById('locationSelect');

    locationSelect.addEventListener('change', function () {
      const selectedOptionValue = locationSelect.value;

      console.log('Seçilen Mahalle ID:', selectedOptionValue);
      document.getElementById('mahalle_id').value = selectedOptionValue;
    });

    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        data.features.forEach(feature => {
          const option = document.createElement('option');
          option.value = feature.properties.id;
          option.text = feature.properties.text;
          locationSelect.add(option);

        });
      })
      .catch(error => console.error('API hatası:', error));
  }

  onLoad = ilsec();
  document.getElementById('ilce').addEventListener('change', function () {
    clearMahalleOptions();
  });

  function clearMahalleOptions() {
    var locationSelect = document.getElementById('locationSelect');

    locationSelect.innerHTML = '';

  }

  document.getElementById('il').addEventListener('change', function () {
    clearilceOptions();
  });

  function clearilceOptions() {
    var locationSelect = document.getElementById('ilce');

    locationSelect.innerHTML = '';

  }



  window.onload = getHavaDurumuSayfaonLoad(); // Bu kod sayfa ilk acilirken fonksiyonu cagirir.