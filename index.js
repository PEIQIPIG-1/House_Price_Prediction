var map
function initMap(){
    var options = {
        zoom: 8,
        center: {lat: 39.916668, lng:116.383331},
        mapId: '281418b42608306f'
    };

    map = new google.maps.Map(document.getElementById('map'),options);

    addMarker({
        coords:{lat: 39.916668, lng:116.383331},
        iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        content:'<h1>Beijing</h1>'
    });
    addMarker({
        coords:{lat:40.37636 , lng:115.22403},
        content:'<h1>Zhuolu</h1>'
    });
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

    //find position of user
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

    
 
    //load json  这种方法用于请求jsonp
    // var script = document.createElement('script');
    // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';    
    // document.getElementsByTagName('head')[0].appendChild(script);

    //这种方法用于请求跨域资源共享(CROS) 这一行不需要eqfeed_callback()   谷歌 开发者工具 网络 response header Access-Control-Allow-Origin:*  说明允许请求
    //也可用于加载本地资源
    map.data.loadGeoJson('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson');   
    
    
    
    
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
window.eqfeed_callback = eqfeed_callback;