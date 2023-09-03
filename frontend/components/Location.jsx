import React, { useState, useEffect } from 'react';
import MapboxGL from "@rnmapbox/maps";
import Geolocation from '@react-native-geolocation-service';
import { View } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';


const Location = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);

    useEffect(() => {
        // Request permission and get user location
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }, []);

    return (
        <View>
    
            {userLocation && (
                <MapboxGL.PointAnnotation
                    id="userLocation"
                    coordinate={userLocation}
                    title="You are here"
                >
                    <MapboxGL.Callout title="You are here" />
                </MapboxGL.PointAnnotation>
            )}
        </View>
    );
};

export default Location