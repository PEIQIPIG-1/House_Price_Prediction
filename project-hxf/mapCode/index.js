var map;
var heatmap;
var info;
var imagepath;
const ylabels = [];
for (i = 0; i < 11; i++) {
    ylabels.push(0);
}
var heatMapData = [];
var markers = [];
var markersSearch = [];

function initMap() {
    var options = {
        zoom: 10,
        center: { lat: 47.6345285, lng: -122.3668965 },
        mapId: '281418b42608306f'
    };

    map = new google.maps.Map(document.getElementById('map'), options);
    
    map.addListener("zoom_changed", () => {
        const zoom = map.getZoom();
      
        if (zoom) {
          // Only show each marker above a certain zoom level.
          markers.forEach(marker => {
            marker.setMap(zoom>14? map:null);
        });
        }
      });

    const geocoder = new google.maps.Geocoder();
    document.getElementById("hide-markers").addEventListener("click", hideMarkers);
    document.getElementById("toggle-heatmap").addEventListener("click", toggleHeatmap);
    document.getElementById("search_img").addEventListener("click", searchAddress);

    getData(geocoder);

    locateUser();

    setHeatMap();
}
function locateUser() {
    var infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

async function searchAddress() {
    deleteMarkers();
    const response = await fetch('clean_data(1).csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    const address = document.getElementById('address_input').value.toLowerCase();

    table.forEach(row => {
        const column = row.split(',');
        if ((column[13] || ' ').toLowerCase().includes(address)) {
            const lat = parseFloat(column[14]);
            const lng = parseFloat(column[15]);

            const property = {
                address: column[13],
                price: '$' + column[0] + 'k',
                type: "home",
                bed: column[1],
                bath: column[2],
                size: column[3],
                position: {
                    lat: lat,
                    lng: lng,
                },
                index: parseInt(column[18]),
            }
            addMarkerSearch(property);
        }
    })
    map.setZoom(10);
}

async function getData(geocoder) {
    const response = await fetch('clean_data(1).csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const column = row.split(',');
        const lat = parseFloat(column[14]);
        const lng = parseFloat(column[15]);

        const property = {
            address: column[13],
            price: '$' + column[0] + 'k',
            type: "home",
            bed: column[1],
            bath: column[2],
            size: column[3],
            position: {
                lat: lat,
                lng: lng,
            },
            index: parseInt(column[18]),
        }
        addMarker(property);
    })

    for (i = 0; i < 4000; i++) {
        const row = table[i];
        const column = row.split(',');
        const lat = parseFloat(column[14]);
        const lng = parseFloat(column[15]);
        const price = parseFloat(column[0]);

        if (price >= 2000) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 11 });
            ylabels[10] += 1;
        } else if (price >= 1500) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 10 });
            ylabels[9] += 1;
        } else if (price >= 1000) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 9 });
            ylabels[8] += 1;
        } else if (price >= 900) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 8 });
            ylabels[7] += 1;
        } else if (price >= 800) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 7 });
            ylabels[6] += 1;
        } else if (price >= 700) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 6 });
            ylabels[5] += 1;
        } else if (price >= 600) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 5 });
            ylabels[4] += 1;
        } else if (price >= 500) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 4 });
            ylabels[3] += 1;
        } else if (price >= 400) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 3 });
            ylabels[2] += 1;
        } else if (price >= 300) {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 2 });
            ylabels[1] += 1;
        } else {
            heatMapData.push({ location: new google.maps.LatLng(lat, lng), weight: 1 });
            ylabels[0] += 1;
        }
    }
}
async function setHeatMap() {
    await getData();
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatMapData
    });
    const gradient = [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
    ];

    heatmap.set("gradient", gradient);
}
function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function hideMarkers() {
    markers.forEach(marker => {
        marker.setMap(marker.getMap() ? null : map);
    });
    markersSearch.forEach(marker => {
        marker.setMap(marker.map == null ? map : null);
    });
}

function deleteMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markersSearch.forEach(marker =>{
        marker.setMap(null);
    })
    markers = [];
    markersSearch = [];
}

async function addMarker(property) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { CollisionBehavior } = await google.maps.importLibrary("marker");

    const marker = new AdvancedMarkerElement({
        position: property.position,
        collisionBehavior: CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
        map: null,
    });


    var inforWindow = new google.maps.InfoWindow({
        content: buildContent(property)
    });
    marker.addListener('click', function () {
        inforWindow.open(map, marker);
    });

    marker.addListener("click", () => {
        info = property.index;
    })
    markers.push(marker);
}

async function addMarkerSearch(property){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { CollisionBehavior } = await google.maps.importLibrary("marker");

    const marker = new AdvancedMarkerElement({
        position: property.position,
        collisionBehavior: CollisionBehavior.REQUIRED,
        map: map,
    });


    var inforWindow = new google.maps.InfoWindow({
        content: buildContent(property)
    });
    marker.addListener('click', function () {
        inforWindow.open(map, marker);
    });

    marker.addListener("click", () => {
        info = property.index;
    })
    markersSearch.push(marker);
}

function generateImage1() {
    if (typeof info !== "undefined") {

        imagepath = "./pictures/" + info + ".png";

        var imgElement = document.getElementById("outputImage");
        imgElement.src = imagepath;

        var delete_btn = document.getElementById("delete-button");
        delete_btn.style.display = 'block';
        const imageContainer = document.querySelector('.image-container');
        imageContainer.style.display = 'block';
    }
}

function generateImage2() {
    if (typeof info !== "undefined") {
        imagepath = "./Gradient/" + info + ".png";
        var imgElement = document.getElementById("outputImage");
        imgElement.src = imagepath;

        var delete_btn = document.getElementById("delete-button");
        delete_btn.style.display = 'block';
        const imageContainer = document.querySelector('.image-container');
        imageContainer.style.display = 'block';
    }
}

function generateImage3() {
    if (typeof info !== "undefined") {
        imagepath = "./RandomForest/" + info + ".png";

        var imgElement = document.getElementById("outputImage");
        imgElement.src = imagepath;

        var delete_btn = document.getElementById("delete-button");
        delete_btn.style.display = 'block';
        const imageContainer = document.querySelector('.image-container');
        imageContainer.style.display = 'block';
    }
}

function buildContent(property) {
    const content = document.createElement("div");

    content.classList.add("property");
    content.innerHTML = `
      <div class="details">
          <div class="price">${property.price}</div>
          <div class="address">${property.address}</div>
          <div class="features">
            <div>
                <img class="icon" src=./icon/bed.png>
                
                <span>${property.bed}</span>
            </div>
            <div>
                <img class="icon" src=./icon/bathtub.png>
                
                <span>${property.bath}</span>
            </div>
            <div>
                <img class="icon" src=./icon/ruler.png>
                
                <span>${property.size} m<sup>2</sup></span>
            </div>
          </div>
      </div>
      `;
    return content;
}

function deleteImage() {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.style.display = 'none';
        imagepath = undefined;
    }
}

initMap();