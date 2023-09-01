import {StyleSheet} from 'react-native';

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
      fontSize: 20,        
      textAlign: 'center',
      marginVertical: 10,
    },
    title: {
        fontSize: 40,       
        fontWeight: 'bold', 
        textAlign: 'center',
        marginVertical: 10,
        }
  });

export default styles