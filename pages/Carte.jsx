import * as turf from '@turf/turf';
import React from 'react';
import MapboxGL from "@rnmapbox/maps";
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

MapboxGL.setWellKnownTileServer('Mapbox'); // so you don't get the http ressourceurl error
MapboxGL.setAccessToken("pk.eyJ1IjoibWF4dGFjMjA3NyIsImEiOiJjbG0waHE1bmIwN2pyM2pzNmUwZjM0MXg0In0.TSjPnJP4peh5CTxnKCrhKg");

MapboxGL.setConnected(true);

const circlePoints = (center, radius) => {
    const coordinates = [];
    const numberOfPoints = 360; // One point for each degree; can be adjusted for less/more granularity.
  
    for (let i = 0; i < numberOfPoints; i++) {
      const angle = (i * 2 * Math.PI) / numberOfPoints;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      coordinates.push([x*0.1, y]);
    }
  
    return coordinates;
  };

const Carte = () => {

    const center = [2.294481, 48.858370];
    const radiusInMeters = 0.005;      // 1 km

    const coordinates = circlePoints(center,radiusInMeters)

    const [polygon, setPolygon] = useState({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            coordinates,
          ],
        },
      });

  return (
    
    <View style={styles.container}>
       <Text style = {styles.title}>GeoTacOPS</Text>
       <View style={styles.mapContainer}>
       <MapboxGL.MapView style={styles.map}>
       <MapboxGL.Camera
        centerCoordinate={center}
        zoomLevel={13}
      />
        <MapboxGL.ShapeSource id="source" shape={polygon}>
                <MapboxGL.FillLayer id="fill" style={{ fillColor: "red", fillOpacity:0.3}} />
                <MapboxGL.LineLayer
                    id="line"
                    style={{ lineColor: "red", lineWidth: 2 }}
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