var map;



function initMap(){
    var options = {
        zoom: 10,
        center: {lat: -32.1158387, lng:115.8424257},
        mapId: '281418b42608306f'
    };

    map = new google.maps.Map(document.getElementById('map'),options);

    // Papa.parse("./all_perth_310121.csv",{
    //     download: false,
    //     header: true,
    //     complete: function(results) {
    //         const houseData = results.data;
    //         const geocoder = new google.maps.Geocoder();
    //         geocodeAddresses(geocoder, map, houseData);
    //         console.log(results);
    //     }
    // });

    const address = "1 Acorn Place, Perth, Australia";
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({
        address: address
    }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
            addMarker({
                coords:{lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()}
            })
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });



    // addMarker({
    //     coords:{lat: 39.916668, lng:116.383331},
    //     iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    //     content:'<h1>Beijing</h1>'
    // });
    // addMarker({
    //     coords:{lat:40.37636 , lng:115.22403},
    //     content:'<h1>Zhuolu</h1>'
    // });
    
    //find position of user
    locateUser();
    

    
 
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
function locateUser(){
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

// function geocodeAddresses(geocoder, map, houseData) {
//     houseData.forEach(house => {
//       geocoder.geocode({ address: house.ADDRESS }, (results, status) => {
//         if (status === "OK") {
//           const marker = new google.maps.Marker({
//             position: results[0].geometry.location,
//             map: map,
//             title: `Price: $${house.PRICE}`
//           });

//           const infoWindow = new google.maps.InfoWindow({
//             content: `Price: $${house.PRICE}`
//           });

//           marker.addListener('click', () => {
//             infoWindow.open(map, marker);
//           });
//         } else {
//           console.error("Geocode was not successful for the following reason: " + status);
//         }
//       });
//     });
//   }



//add marker
function addMarker(properties){
    var marker = new google.maps.Marker({
        position:properties.coords,
        map:map
    });

    if(properties.iconImage){
        marker.setIcon(properties.iconImage);
    }

    if(properties.content){
        var inforWindow = new google.maps.InfoWindow({
            content:properties.content
        });
        marker.addListener('click',function(){
            inforWindow.open(map,marker);
        });
    }
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



initMap();