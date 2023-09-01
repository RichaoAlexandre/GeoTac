import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setWellKnownTileServer('Mapbox'); // so you don't get the http ressourceurl error
MapboxGL.setAccessToken("pk.eyJ1IjoibWF4dGFjMjA3NyIsImEiOiJjbG0waHE1bmIwN2pyM2pzNmUwZjM0MXg0In0.TSjPnJP4peh5CTxnKCrhKg");

MapboxGL.setConnected(true);

const Carte = () => {

    const center = [12.4924, 41.8902];
    const radiusInMeters = 1000;      // 1 km

    const data = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: {
        radius: radiusInMeters,
        },
        geometry: {
        type: 'Point',
        coordinates: center,
        },
    }],
    };

  return (
    
    <View style={styles.container}>
       <Text style = {styles.title}>GeoTacOPS</Text>
       <View style={styles.mapContainer}>
       <MapboxGL.MapView style={styles.map}>
       <MapboxGL.ShapeSource
  id="circleSource"
  shape={data}
>
  <MapboxGL.CircleLayer
    id="circleLayer"
    style={{
      circleRadius: [
        'interpolate',
        ['linear'],
        ['zoom'],
        12, ['*', ['get', 'radius'], 0.005],   // Adjust multiplier as needed
        15, ['*', ['get', 'radius'], 0.01],    // Adjust multiplier as needed
        18, ['*', ['get', 'radius'], 0.02]     // Adjust multiplier as needed
      ],
      circleColor: 'rgba(255, 0, 0, 0.3)',
      circleStrokeColor: 'red',
      circleStrokeWidth: 2
    }}
  />
</MapboxGL.ShapeSource>
      </MapboxGL.MapView>
        </View>
      <Text>Hello, What is up this is so cool!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  mapContainer: {
    aspectRatio: 1,  
    maxWidth: "100%",  
    width: "90%",  
    backgroundColor: "tomato",
    marginBottom: 10, 
    borderRadius: 15, 
    overflow: 'hidden'
  },
  map: {
    ...StyleSheet.absoluteFillObject,  
  },
  title: {
    fontSize: 40,       
    fontWeight: 'bold', 
    textAlign: 'center',
    marginVertical: 10,
  }
});



export default Carte;