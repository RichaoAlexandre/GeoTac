import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Mapbox from '@rnmapbox/maps';

const Map = () => {
    return (<View>
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
    </View>);
    
}

export default Map;