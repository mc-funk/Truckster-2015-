var truckOnline;
var outlineColor;
var fillsColor;
var circles = {};
var openStatus;

$(document).ready(function(){
      console.log("document ready");

      var myFirebaseRef = new Firebase("https://exo-foodtruck.firebaseio.com/");

      var AllTruckData = jQuery.get("https://exo-foodtruck.firebaseio.com/trucks.json");
      var zoomLevel = 12;
      var exositeHomeGPS = [44.98014269999999,-93.28874739999999];
      // set up the map
      var map = new L.Map('map');

      // create the tile layer with correct attribution
      var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      var osm = new L.TileLayer(osmUrl, {minZoom: 8, attribution: osmAttrib});

      function initmap() {

        // start the map in South-East England
          map.setView(exositeHomeGPS,zoomLevel);
          map.addLayer(osm);
        }

      function add_food_trucks_to_map(data) {
        $.each(data, function(idx, val) {
          console.log("RID: ", idx, "Food Truck: ", val['name']);
          console.log("Val name:", val['name']);
          truckOnline = val['status']['online'];
          if (truckOnline == true) {
            fillsColor = "#B83C30";
            outlineColor = "#AC7143"
            openStatus = "Currently open here!";
          } else {
            outlineColor = '#000000';
            fillsColor = '#222222';
            openStatus = "Closed, last seen here";
          }

          circles[val['name']] = L.circle(  [ val['status']['gps']['lat'],
                                    val['status']['gps']['long']
                                  ],
                       150, {
            color: outlineColor,
            fillColor: fillsColor,
            fillOpacity: 0.8
          }).addTo(map);


          function subscribe_form(name, id) {
            return "<h4>Subscribe to " + name + "</h4>\
                                  <form action='/truckster/' method='post'>\
                                  <input type='hidden' name='rid' value="+id+">\
                                  <input type='hidden' name='truck_name' value="+name+">\
                                  Name: <input type='text' name='name' value='' required>\
                                  <br>\
                                  Preferred contact method: <input type='radio' name='contact_method' value='sms' checked>SMS\
                                  <input type='radio' name='contact_method' value='email'>Email\
                                  <br>\
                                  Contact info: <input type='text' name='contact' value='' required>\
                                  <br>\
                                  Notify when within 1KM of address: <input type='text' name='address' value=''>\
                                  <br>\
                                  <input class='subscribe-btn btn btn-primary btn-sm' type='submit' value='Stalk this truck!'>\
                                  <span class='cancel-btn btn btn-danger btn-sm' value='cancel'>Cancel</span>\
                                  </form>"
          }

          popupContent = '<p>' + val['name'] +'<br /><em>'+ openStatus + '</em><br /><button type="button" data-id="'+ idx +'" data-name="'+ val['name'] + '"" class="addtruck btn btn-primary btn-sm">Stalk this Truck!</button></p>';
          //popupContent = subscribe_form;
          circles[val['name']].bindPopup(popupContent);
            // .setContent('<p>' + val['name'] +'<br />'+ '<button type="button">' + Stalk this Truck! + '</button></p>');
            $('#map').on('click', '.addtruck', function() {
              console.log("Add truck clicked");
              var thisName = $(this).data('name');
              var thisIdx = $(this).data('id');
              console.log("ThisIdx, thisName: ", thisIdx, thisName);
              $('#subscribe').empty().slideDown().html(subscribe_form(thisName, thisIdx));
            });

            $('#subscribe').on('click', '.subscribe-btn, .cancel-btn', function() {
              console.log("Subscribe truck or cancel clicked");
              $('#subscribe').slideUp().empty();

            });
        });


      }

      initmap();
      jQuery.when(AllTruckData).done(function() {
        add_food_trucks_to_map(AllTruckData.responseJSON);
      });
      myFirebaseRef.on('value', function(dataSnapshot) {
        console.log("Map refreshing - new data");+
        console.log(dataSnapshot.val()['trucks']);
        console.log('circles: ', circles);
        for (var drawnCircle in circles) {
          console.log("drawnCircle", drawnCircle);
          map.removeLayer(circles[drawnCircle]);
        }
        add_food_trucks_to_map(dataSnapshot.val()['trucks']);
      });


      // console.log(AllTruckData.responseJSON)
      // $.each(AllTruckData.responseJSON, function(idx, val) {
      //   console.log("RID: ", idx, "Food Truck: ", val['name'])
      // });

    });
