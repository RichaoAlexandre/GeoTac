import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setWellKnownTileServer('Mapbox'); // so you don't get the http ressourceurl error
MapboxGL.setAccessToken("pk.eyJ1IjoibWF4dGFjMjA3NyIsImEiOiJjbG0waHE1bmIwN2pyM2pzNmUwZjM0MXg0In0.TSjPnJP4peh5CTxnKCrhKg");

MapboxGL.setConnected(true);

const App = () => {
  return (
    
    <View style={styles.container}>
       <Text style = {styles.title}>GeoTacOPS</Text>
       <View style={styles.mapContainer}>
          <MapboxGL.MapView style={styles.map} />
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



export default App;