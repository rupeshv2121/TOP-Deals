
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    style: "mapbox://styles/mapbox/streets-v12",
    container: "map",
    center: [78.0802674, 27.8723029],
    zoom: 9,
});
