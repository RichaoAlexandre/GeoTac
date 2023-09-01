import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carte from './pages/Carte';

const App = () => {
  return (
    
    <View style={styles.container}>
       <Carte />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  }
});

export default App;