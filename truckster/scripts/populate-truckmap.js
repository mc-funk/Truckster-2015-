$(document).ready(function(){
      console.log("document ready");

      var myFirebaseRef = new Firebase("https://exo-foodtruck.firebaseio.com/");

      var AllTruckData = jQuery.get("https://exo-foodtruck.firebaseio.com/trucks.json");
      var zoomLevel = 12;
      var exositeHomeGPS = [44.98014269999999,-93.28874739999999];
      // set up the map
      var map = new L.Map('map');

      // create the tile layer with correct attribution
      var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {minZoom: 8, attribution: osmAttrib});
      var truckOnline;
      var outlineColor;
      var fillsColor;
      var circles = {};

      function initmap() {

        // start the map in South-East England
          map.setView(exositeHomeGPS,zoomLevel);
          map.addLayer(osm);
        }

      function add_food_trucks_to_map(data) {
        $.each(data, function(idx, val) {
          console.log("RID: ", idx, "Food Truck: ", val['name']);
          console.log("Val:", val);
          truckOnline = val['status']['online'];
          if (truckOnline == true) {
            fillsColor = "#B83C30";
            outlineColor = "#AC7143"
          } else {
            outlineColor = '#000000';
            fillsColor = '#222222';
          }

          circles[val['name']] = L.circle(  [ val['status']['gps']['lat'],
                                    val['status']['gps']['long']
                                  ],
                       150, {
            color: outlineColor,
            fillColor: fillsColor,
            fillOpacity: 0.8
          }).addTo(map);

          popupContent = '<p>' + val['name'] +'<br />'+ '<button type="button" class="addtruck btn btn-primary btn-sm">Stalk this Truck!</button></p>';
          circles[val['name']].bindPopup(popupContent);
            // .setContent('<p>' + val['name'] +'<br />'+ '<button type="button">' + Stalk this Truck! + '</button></p>');
        });
      }

      initmap();
      jQuery.when(AllTruckData).done(function() {
        add_food_trucks_to_map(AllTruckData.responseJSON);
      });
      myFirebaseRef.on('value', function(dataSnapshot) {
        console.log("Map refreshing - new data");+
        console.log(dataSnapshot.val()['trucks']);
        map.removeLayer(circles);
        add_food_trucks_to_map(dataSnapshot.val()['trucks']);
      });


      // console.log(AllTruckData.responseJSON)
      // $.each(AllTruckData.responseJSON, function(idx, val) {
      //   console.log("RID: ", idx, "Food Truck: ", val['name'])
      // });




    });
