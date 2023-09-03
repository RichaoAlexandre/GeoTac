import React from 'react';
import MapboxGL from "@rnmapbox/maps";
import { View, Text, Button,Dimensions,TouchableOpacity,PermissionsAndroid, SafeAreaView  } from 'react-native';
import Slider from '@react-native-community/slider'
import { useState, useEffect } from 'react';


import UserGrid from '../components/UserGrid';
import styles from '../utils/style';

MapboxGL.setWellKnownTileServer('Mapbox'); // so you don't get the http ressourceurl error
MapboxGL.setAccessToken("pk.eyJ1IjoibWF4dGFjMjA3NyIsImEiOiJjbG0waHE1bmIwN2pyM2pzNmUwZjM0MXg0In0.TSjPnJP4peh5CTxnKCrhKg");

MapboxGL.setConnected(true);

const colors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Violet', value: '#EE82EE' },
  { name: 'Yellow', value: '#FFFF00' },
];

const Component1 = () => <Text>Component 1</Text>;
const Component2 = () => <Text>Component 2</Text>;
const Component3 = () => <Text>Component 3</Text>;

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

    const [activeComponent, setActiveComponent] = useState(1);
    const [radiusInMeters, setRadius] = useState(0);      // Initial value
    const [createMode, setCreateMode] = useState(false);
    const [circleCenter, setCircleCenter] = useState(center);
    const [zoomLevel, setZoomLevel] = useState(13); 
    const [displayedZones, setDisplayedZones] = useState([]);
    const [selectedColor, setSelectedColor] = useState(colors[0].value);
    const [hasLocationPermissions,sethasLocationPermissions] = useState(false)
    const [userLocation, setUserLocation] = useState(null)
    const [center, setCenter] = useState([2.294481, 48.858370]);
    const [areaPlaced, setPlaced] = useState(false)

    const coordinates = circlePoints(center,radiusInMeters)

    

    const requestLocationPermission = async  () => 
    {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          sethasLocationPermissions(true)
          console.log("You can use the location")
        } else {
          console.log("location permission denied")
          alert("Location permission denied");
        }
      } catch (err) {
        console.warn(err)
      }
    }
  
    useEffect(()=>{
        requestLocationPermission()
    },[])
  

    switch (activeComponent) {
      case 1:
        DisplayedComponent = Component1;
        break;
      case 2:
        DisplayedComponent = Component2;
        break;
      case 3:
        DisplayedComponent = Component3;
        break;
    }

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

      const interpolateColor = (value) => {
        // This function will interpolate between red and blue based on value
        const red = Math.floor(255 * (1 - value));
        const blue = Math.floor(255 * value);
    
        return `rgb(${red}, 0, ${blue})`;
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
                          setPlaced(true)
                      }
                    }}
                >
                  <MapboxGL.Camera centerCoordinate={center} zoomLevel={zoomLevel} />
                    {createMode && (<View>
                    
                    <MapboxGL.ShapeSource id="source" shape={polygon}>
                        <MapboxGL.FillLayer id="fill" style={{ fillColor: selectedColor, fillOpacity: 0.3 }} />
                        <MapboxGL.LineLayer id="line" style={{ lineColor: "black", lineWidth: 2 }} />
                    </MapboxGL.ShapeSource>
                    </View>)}
                    {
                        displayedZones.map((zone, index) => (
                            <MapboxGL.ShapeSource key={index} id={`source-${index}`} shape={zone.polygon}>
                                <MapboxGL.FillLayer id={`fill-${index}`} style={{ fillColor: zone.color, fillOpacity: 0.3 }} />
                                <MapboxGL.LineLayer id={`line-${index}`} style={{ lineColor: "black", lineWidth: 2 }} />
                            </MapboxGL.ShapeSource>
                        ))
                    }
                    
                <MapboxGL.UserLocation
                    visible={true}
                    androidRenderMode={'compass'}
                    showsUserHeadingIndicator={true}
                    onUpdate={newLocation => {
                      console.log(newLocation)
                      if(!userLocation){
                        setUserLocation(true)
                        console.log(newLocation.coords.latitude)
                        console.log(newLocation.coords.longitude)
                        setCenter([newLocation.coords.longitude, newLocation.coords.latitude])
                      }
                    }}
                />
                </MapboxGL.MapView>
            </View>
      
            {activeComponent == 1 && <View id="actionbuttons">
            {!createMode && <Button
                title="Créer une zone"
                onPress={() => {
                  setCreateMode(true)
                  setRadius(0.001)
                  }}
            />}
            {createMode && (areaPlaced ? (<View>
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
            <Text style = {styles.text}>Choisissez la couleur de la zone</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: color.value,
                    width: 40,
                    height: 40,
                    margin: 5,
                    borderWidth: selectedColor === color.value ? 2 : 0,
                    borderColor: '#000'
                  }}
                  onPress={() => setSelectedColor(color.value)}
                />
              ))}
            </View>
            <Button
                title="Terminé"
                onPress={() => {
                  setDisplayedZones(prevZones => [...prevZones, { polygon: polygon, color: selectedColor }]);
                  setCreateMode(false);
                  setRadius(0)
                  setPlaced(false)
              }}
            />
            <Button
                title="Annuler"
                onPress={() => {
                  setCreateMode(false);
                  setRadius(0)
                  setPlaced(false)
              }}
            />
            
            </View>
            ) : <Text> Hello World </Text>)}
            </View>}

            {activeComponent == 2 && 
              <UserGrid
  data={[
    { name: "John Doe", color: "red", role: "Admin" },
    { name: "Jane Smith", color: "blue", role: "User" },
    { name: "John Doe", color: "red", role: "Admin" },
    { name: "Jane Smith", color: "blue", role: "User" },
    { name: "John Doe", color: "red", role: "Admin" },
    { name: "Jane Smith", color: "blue", role: "User" },
    { name: "John Doe", color: "red", role: "Admin" },
    { name: "Jane Smith", color: "blue", role: "User" },
    { name: "John Doe", color: "red", role: "Admin" },
    { name: "Jane Smith", color: "blue", role: "User" },
  ]}
/>
                                        }

            <View style={styles.content}>
              <Text> </Text>
          <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => setActiveComponent(1)}>
          <Text>Commandes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setActiveComponent(2)}>
          <Text>Equipiers</Text>
        </TouchableOpacity>
      </View>
            </View>
          
        </View>
  );
};


export default CarteAdmin;