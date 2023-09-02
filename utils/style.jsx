import {StyleSheet} from 'react-native';
import {Dimensions } from 'react-native';

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
    text: {
      fontSize: 15,        
      textAlign: 'center',
      marginVertical: 2,
    },
    title: {
        fontSize: 40,       
        fontWeight: 'bold', 
        textAlign: 'center',
        marginVertical: 10,
        },
        label: {
          fontSize: 18,
          marginBottom: 10,
      },
      title2: {
        fontSize: 30,       
        fontWeight: 'bold', 
        textAlign: 'center',
        marginVertical: 10,
        },
        label: {
          fontSize: 18,
          marginBottom: 10,
      },
      input: {
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          marginBottom: 15,
          borderRadius: 5,
      },
      switchContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          justifyContent: 'space-between',
      },
      content: {
        flex: 1,
        justifyContent: 'space-between',
        position: 'relative',
      },
      bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: Dimensions.get('window').width,  // Full width  // Set position to absolute
        bottom: 0,
        position: 'relative',  // Set position to absolute
      },
      button: {
        flex: 1,  // Divide the width by 3
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,  // Adjust as needed
        borderTopWidth: 1,    // Optional: add border if you want
        borderColor: '#d1d1d1' // Optional: add border color if you want
      }
  });

export default styles