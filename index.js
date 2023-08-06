function initMap(){
    var options = {
        zoom: 8,
        center: {lat: -36.848461, lng:174.763336}
    };

    var map = new google.maps.Map(document.getElementById('map'),options);
    
    // var marker = new google.maps.Marker({
    //     position:{lat:42.4668, lng:-70.9495},
    //     map:map,
    //     icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    // });
    
    // var infoWindow = new google.maps.InfoWindow({
    //     content:'<h1>Lynn Ma</h1>'
    // });
    // marker.addListener('click',function(){
    //     infoWindow.open(map,marker);
    // });

    addMarker({
        coords:{lat: -36.848461, lng:174.763336},
        iconImage:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        content:'<h1>Auckland</h1>'
    });
    addMarker({
        coords:{lat:-36.7266638 , lng:174.6999972}
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
            var infoWindow = new google.maps.InfoWindow({
                content:properties.content
            });
            marker.addListener('click',function(){
                infoWindow.open(map,marker);
            });
        }
    }

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

initMap();