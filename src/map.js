"use strict";

function loadSpaces () {
  fetch("fairshops-geo.json")
    .then(function (response) {
      return response.json();
    })
    .then(initMap);
}

function onEachFeature(feature, layer) {
  var converter = new showdown.Converter();

  var popupContent = converter.makeHtml(feature.properties.markdown);
  var tooltipContent = feature.properties.name;

  layer.bindPopup(popupContent);
  layer.bindTooltip(tooltipContent);
}

function initMap(spaces) {
  var map = L.map("map").setView([51.9601, 7.5939], 12);
  window.lmap = map;

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidWJlcmdlc3VuZGhlaXQiLCJhIjoiY2szMGV0eWltMGh4ZzNicWowYzdzenRqYiJ9.Q45K2MzwSKBq9n7L8Q_9rw", {
    maxZoom: 16,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.light"
  }).addTo(map);

  var spacesLayer = L.geoJSON(spaces, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 6,
        fillColor: "#008000",
        color: "#00FF00",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  }).addTo(map);

  map.fitBounds(spacesLayer.getBounds(), { padding: [ 20, 20 ] });
}

window.addEventListener("DOMContentLoaded", loadSpaces);
