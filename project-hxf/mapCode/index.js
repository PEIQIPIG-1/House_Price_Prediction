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

function initMap() {
    var options = {
        zoom: 10,
        center: { lat: 47.6345285, lng: -122.3668965 },
        mapId: '281418b42608306f'
    };

    map = new google.maps.Map(document.getElementById('map'), options);
    const geocoder = new google.maps.Geocoder();
    document.getElementById("hide-markers").addEventListener("click", hideMarkers);
    document.getElementById("toggle-heatmap").addEventListener("click", toggleHeatmap);
    document.getElementById("search_img").addEventListener("click", searchAddress);

    getData(geocoder);

    locateUser();

    initCanvas();

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
            addMarker({
                coords: { lat: lat, lng: lng },
                content:
                    "<p>" + "Address: " + column[13] + "</p>" +
                    "<p>" + "Price: " + column[0] + 'k' + "</p>" +
                    "<p>" + "Bedrooms: " + column[1] + "</p>" +
                    "<p>" + "Bathrooms: " + column[2] + "</p>" +
                    "<p>" + "Sqm living: " + column[3] + "</p>" +
                    "<p>" + "Year built: " + column[11] + "</p>",
                index: parseFloat(column[18])
            })
        }

    })
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

async function getData(geocoder) {
    const response = await fetch('clean_data(1).csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);

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
}
function deleteMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = []; 
}

function addMarker(properties) {
    var marker = new google.maps.Marker({
        position: properties.coords,
        map: map,
    });

    if (properties.iconImage) {
        marker.setIcon(properties.iconImage);
    }

    if (properties.content) {
        var inforWindow = new google.maps.InfoWindow({
            content: properties.content
        });
        marker.addListener('click', function () {
            inforWindow.open(map, marker);
        });
    }
    marker.addListener("click",()=>{
        info = properties.index;
    })
    markers.push(marker);
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

async function initCanvas() {
    await getData();
    const ctx = document.getElementById('myChart');
    //console.log(ylabels);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['under 300K', '300K-400K', '400K-500K', '500K-600K', '600K-700k', '700k-800k', '800k-900k', '900k-1m', '1m-1.5m', '1.5m-2m', 'over 2m'],
            datasets: [{
                label: 'the amount of house within corresponding price range',
                data: ylabels,
                borderWidth: 1
            }]
        }
    });
}

function deleteImage() {
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer) {
        imageContainer.style.display = 'none';
        imagepath = undefined;
    }
}

initMap();