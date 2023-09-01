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
  });

export default styles