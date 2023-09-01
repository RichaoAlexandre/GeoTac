import React,{ useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CarteAdmin from './pages/CarteAdmin';
import styles from './utils/style';
import Accueil from './pages/Accueil';


const App = () => {
  const [username, setUsername] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GeoTacOPS</Text>
      {username ? <CarteAdmin /> : <Accueil setUser={setUsername} />}
       
    </View>
  );
};

export default App;