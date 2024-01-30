// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken = 'pk.eyJ1IjoibWxub3ciLCJhIjoiY2t0dnZwcm1mMmR5YzMycDNrcDZtemRybyJ9.Br-G0LTOB3M6w83Az4XGtQ'; 
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/mlnow/clrsijwv3006101pq67hv2suy', 
  center: [-122.41835, 37.75832],
  zoom: 14.5
});

map.on('load', function () {
    map.resize();
  });

  // load my map layers
map.on("load", function () {
    mapDetailsFunction("id", "visible");
      map.addLayer(mapDetails);
  });

/* 
Add an event listener that runs
when a user clicks on the map element.
*/
map.on('click', (event) => {
// If the user clicked on one of your markers, get its information.
const features = map.queryRenderedFeatures(event.point, {
layers: ['mission-st-vacancy-v4'] // replace with your layer name
});
if (!features.length) {
return;
}
const feature = features[0];

/* 
Create a popup, specify its options 
and properties, and add it to the map.
*/
const popup = new mapboxgl.Popup({ offset: [0, -15] })
.setLngLat(feature.geometry.coordinates)
.setHTML(
`<h3>${feature.properties.Address}</h3>`
+ '<img class="center" style="max-width: 700px; width: 100%" src="mission-vacancy-img/'+feature.properties.img_name+'">'
)
.addTo(map);

});

map.on('mouseenter', 'id', function () {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'id', function () {
    map.getCanvas().style.cursor = '';
});

map.addControl(new mapboxgl.NavigationControl());