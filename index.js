var map;
var heatmap;
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
    // document.getElementById("hide-markers").addEventListener("click", hideMarkers);
    // document.getElementById("toggle-heatmap").addEventListener("click", toggleHeatmap);
    document.getElementById("search").addEventListener("click", searchAddress);

    getData(geocoder);



    // const address = "1 Acorn Place, Perth, Australia";
    // const geocoder = new google.maps.Geocoder();

    // geocoder.geocode({
    //     address: address
    // }, (results, status) => {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //         console.log(results[0].geometry.location.lat());
    //         console.log(results[0].geometry.location.lng());
    //         addMarker({
    //             coords:{lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
    //         })
    //     } else {
    //         alert('Geocode was not successful for the following reason: ' + status);
    //     }
    // });



    //find position of user
    locateUser();
    hideMarkers();
    toggleHeatmap();


    initCanvas();

    setHeatMap();

    // map.setCenter({lat:-32.1159,lng:115.84245});




    // load json  这种方法用于请求jsonp
    // var script = document.createElement('script');
    // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';    
    // document.getElementsByTagName('head')[0].appendChild(script);

    //这种方法用于请求跨域资源共享(CROS) 这一行不需要eqfeed_callback()   谷歌 开发者工具 网络 response header Access-Control-Allow-Origin:*  说明允许请求
    //也可用于加载本地资源
    //map.data.loadGeoJson('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson');   




}
// const eqfeed_callback = function (results) {
//     for (let i = 0; i < results.features.length; i++) {
//         const coords = results.features[i].geometry.coordinates;
//         const latLng = new google.maps.LatLng(coords[1], coords[0]);

//         //document.getElementById('test').innerHTML = coords[1];
//         new google.maps.Marker({
//             position: latLng,
//             map: map,
//           });
//     }
// };
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

    //console.log(address);

    table.forEach(row => {
        const column = row.split(',');
        // const address_data = column[13];
        // const address_data_text = address_data.toLowerCase();
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
                    "<p>" + "Year built: " + column[11] + "</p>"
            })
        }

    })

    //const coordinate = document.getElementById('address_input').value;
    //console.log(coordinate);
    // const co = coordinate.split(',');
    // const lat = parseFloat(co[0]);
    // const lng = parseFloat(co[1]);
    // //console.log(lat);
    // //console.log(lng);

    // //39.916668,116.383331

    // map.setCenter({lat:lat,lng:lng});

    // addMarker({
    //     coords:{lat: lat,lng:lng}
    // })
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
    //const response = await fetch('all_perth_310121.csv');  // Fetch the CSV file
    const response = await fetch('clean_data(1).csv');
    const data = await response.text();
    //console.log(data);

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
        // addMarker({
        //     coords: { lat: lat, lng: lng },
        //     content:
        //         "<p>" + "Address: " + column[13] + "</p>" +
        //         "<p>" + "Price: " + column[0] + 'k' + "</p>" +
        //         "<p>" + "Bedrooms: " + column[1] + "</p>" +
        //         "<p>" + "Bathrooms: " + column[2] + "</p>" +
        //         "<p>" + "Sqm living: " + column[3] + "</p>" +
        //         "<p>" + "Year built: " + column[11] + "</p>"
        // });
    }

    // //only a part of the data
    // for(i=0;i<1000;i++){
    //     const row = table[i];
    //     const column = row.split(',');
    //     //console.log(column);
    //     const address = column[0]+","+column[1]+","+"Perth";
    //     const price = parseInt(column[2]);
    //     const lat = parseFloat(column[14]);
    //     const lng = parseFloat(column[15]);
    //     if(price >= 2000000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 11});
    //         ylabels[10] += 1;
    //     }else if(price >= 1500000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 10});
    //         ylabels[9] += 1;
    //     }else if(price >= 1000000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 9});
    //         ylabels[8] += 1;
    //     }else if(price >= 900000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 8});
    //         ylabels[7] += 1;
    //     }else if(price >= 800000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 7});
    //         ylabels[6] += 1;
    //     }else if(price >= 700000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 6});
    //         ylabels[5] += 1;
    //     }else if(price >= 600000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 5});
    //         ylabels[4] += 1;
    //     }else if(price >= 500000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 4});
    //         ylabels[3] += 1;
    //     }else if(price >= 400000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 3});
    //         ylabels[2] += 1;
    //     }else if(price >= 300000){
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 2});
    //         ylabels[1] += 1;
    //     }else {
    //         heatMapData.push({location: new google.maps.LatLng(lat, lng), weight: 1});
    //         ylabels[0] += 1;
    //     }


    //     addMarker({coords:{lat:lat,lng:lng},
    //     content:
    //     "<p>"+"Address: "+address+"</p>"+
    //     "<p>"+"Price: "+column[2]+"</p>"+
    //     "<p>"+"Bedrooms: "+column[3]+"</p>"+
    //     "<p>"+"Bathrooms: "+column[4]+"</p>"+
    //     "<p>"+"Garage: "+column[5]+"</p>"+
    //     "<p>"+"Land Area: "+column[6]+"</p>"+
    //     "<p>"+"Floor Area: "+column[7]+"</p>"+
    //     "<p>"+"Build Yead: "+column[8]+"</p>"
    //     });

    //     //geocode has limit on times of usage
    //     // geocoder.geocode({
    //     //         address: address
    //     //         }, (results, status) => {
    //     //             if (status == google.maps.GeocoderStatus.OK) {
    //     //                 addMarker({
    //     //                     coords:{lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
    //     //                 })
    //     //             } else {
    //     //                 alert('Geocode was not successful for the following reason: ' + status);
    //     //             }
    //     //         });

    // }

    //deal with all of the data
    // table.forEach(row=>{
    //     const column = row.split(',');
    //     //console.log(column);
    //     const address = column[0]+","+column[1]+","+"Perth";
    //     //console.log(address);

    //use lat and lng in csv, speed is low
    //     const lat = parseFloat(column[14]);
    //     const lng = parseFloat(column[15]);
    //     addMarker({coords:{lat:lat,lng:lng}});

    //use geocoder convert address to lat and lng, cant't load massive data
    //     // geocoder.geocode({
    //     // address: address
    //     // }, (results, status) => {
    //     //     if (status == google.maps.GeocoderStatus.OK) {
    //     //         console.log(results[0].geometry.location.lat());
    //     //         console.log(results[0].geometry.location.lng());
    //     //         addMarker({
    //     //             coords:{lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
    //     //         })
    //     //     } else {
    //     //         alert('Geocode was not successful for the following reason: ' + status);
    //     //     }
    //     // });

    // })



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
    heatmap.setMap(map);
}
function toggleHeatmap() {
    const locationButton = document.createElement("button");

    locationButton.textContent = "hide heatmap";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        heatmap.setMap(heatmap.getMap() ? null : map);
    });

    
}

function hideMarkers() {
    const locationButton = document.createElement("button");

    locationButton.textContent = "hide markers";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        markers.forEach(marker => {
            marker.setMap(marker.getMap() ? null : map);
        });
    });
    
}
function deleteMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = []; 
}



//add marker
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
    markers.push(marker);
}
// addMarker({
//     coords:{lat: 39.916668, lng:116.383331},
//     iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//     content:'<h1>Beijing</h1>'
// });


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




initMap();


