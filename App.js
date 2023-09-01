import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Carte from './pages/Carte';
import styles from './utils/style';

const App = () => {
  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>GeoTacOPS</Text>
       <Carte />
    </View>
  );
};

export default App;