$(document).ready(function(){
      console.log("document ready");

      var AllTruckData = jQuery.get("https://exo-foodtruck.firebaseio.com/trucks.json");
      var zoomLevel = 9;
      var exositeHomeGPS = [44.98014269999999,-93.28874739999999];
      // set up the map
      map = new L.Map('map');

      // create the tile layer with correct attribution
      var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

      function initmap() {

        // start the map in South-East England
          map.setView(exositeHomeGPS,zoomLevel);
          map.addLayer(osm);
        }

      function add_food_trucks_to_map() {
        $.each(AllTruckData.responseJSON, function(idx, val) {
          console.log("RID: ", idx, "Food Truck: ", val['name'])
          var circle = L.circle(  [ val['status']['gps']['lat'],
                                    val['status']['gps']['long']
                                  ],
                       500, {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5
          }).addTo(map);

          popupContent = '<p>' + val['name'] +'<br />'+ '<button type="button" class="addtruck btn btn-primary btn-sm">Stalk this Truck!</button></p>';
          circle.bindPopup(popupContent);
            // .setContent('<p>' + val['name'] +'<br />'+ '<button type="button">' + Stalk this Truck! + '</button></p>');
        });
      }

      initmap();
      jQuery.when(AllTruckData).done(add_food_trucks_to_map)


      // console.log(AllTruckData.responseJSON)
      // $.each(AllTruckData.responseJSON, function(idx, val) {
      //   console.log("RID: ", idx, "Food Truck: ", val['name'])
      // });




    });
