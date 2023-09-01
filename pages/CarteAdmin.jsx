import React from 'react';
import MapboxGL from "@rnmapbox/maps";
import { View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider'
import { useState } from 'react';
import { Dimensions } from 'react-native';

import styles from '../utils/style';

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
      coordinates.push([x, y]);
    }
  
    return coordinates;
  };

const CarteAdmin = () => {

    const [center, setCenter] = useState([2.294481, 48.858370]);
    const [radiusInMeters, setRadius] = useState(0);      // Initial value
    const [createMode, setCreateMode] = useState(false);
    const [circleCenter, setCircleCenter] = useState(center);
    const [zoomLevel, setZoomLevel] = useState(13); 
    const [displayedZones, setDisplayedZones] = useState([]);

    const coordinates = circlePoints(center,radiusInMeters)

    const [polygon, setPolygon] = useState({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordinates],
        },
      });

      const screenWidth = Dimensions.get('window').width; // les dimensions du slider pour quand on va l'utiliser

      const updateCircle = (newCenter, newRadius) => {
        const newCoords = circlePoints(newCenter, newRadius);
        setPolygon({
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [newCoords],
            },
        });
    };

      const handleSliderChange = (value) => {
        setRadius(value);
        updateCircle(circleCenter, value);

        // Adjust the zoom level based on the radius. This is just a basic formula and can be adjusted.
        
    };

  return (
    <View style={styles.container}>
            
            <View style={styles.mapContainer}>
                <MapboxGL.MapView
                    style={styles.map}
                    onPress={(e) => {
                        if (createMode) {
                          const lngLat = e.geometry.coordinates;
                          //console.log(lngLat)
                          setCircleCenter(lngLat);
                          updateCircle(lngLat, radiusInMeters);
                          setCenter(lngLat); // Set the center to where the user touched
                      }
                    }}
                >
                  <MapboxGL.Camera centerCoordinate={center} zoomLevel={zoomLevel} />
                    {createMode && (<View>
                    
                    <MapboxGL.ShapeSource id="source" shape={polygon}>
                        <MapboxGL.FillLayer id="fill" style={{ fillColor: "red", fillOpacity: 0.3 }} />
                        <MapboxGL.LineLayer id="line" style={{ lineColor: "black", lineWidth: 2 }} />
                    </MapboxGL.ShapeSource>
                    </View>)}
                   {
                    displayedZones.map((zone, index) => (
                        <MapboxGL.ShapeSource key={index} id={`source-${index}`} shape={zone}>
                            <MapboxGL.FillLayer id={`fill-${index}`} style={{ fillColor: "red", fillOpacity: 0.3 }} />
                            <MapboxGL.LineLayer id={`line-${index}`} style={{ lineColor: "black", lineWidth: 2 }} />
                        </MapboxGL.ShapeSource>
                    ))
                }
                </MapboxGL.MapView>
            </View>
            {!createMode && <Button
                title="Créer une zone"
                onPress={() => {
                  setCreateMode(true)
                  setRadius(0.001)}}
            />}
            {createMode && (<View>
              <Text style = {styles.text}>Ajustez la taille de la zone</Text>
                <Slider
                style={{ width: screenWidth, height: 40 }}
                minimumValue={0.001}
                maximumValue={0.01}
                value={radiusInMeters}
                onValueChange={handleSliderChange}
                thumbTintColor="#FF6347"  // Red-ish color for the thumb
                minimumTrackTintColor="#1FB6FF"  // Blue-ish color for the selected part
                maximumTrackTintColor="#d3d3d3"  // Grey color for the unselected part
            />
            <Button
                title="Terminé"
                onPress={() => {
                  setDisplayedZones(prevZones => [...prevZones, polygon]);
                  setCreateMode(false);
                  setRadius(0)
              }}
            />
            <Button
                title="Annuler"
                onPress={() => {
                  setCreateMode(false);
                  setRadius(0)
              }}
            />
            </View>
            )}
            <Text>Hello, What is up this is so cool!</Text>
        </View>
  );
};


export default CarteAdmin;