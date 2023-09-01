import styles from '../utils/style';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, Alert } from 'react-native';


const Accueil = (props) => {
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [registered, setRegistered] = useState(false);

    const handleRegister = () => {
        setRegistered(true);
        props.setUser(username)
        Alert.alert("Succès", `En avant, ${username}!`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title2}>Se connecter</Text>
            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter our username"
                onChangeText={setUsername}
                value={username}
            />
            <View style={styles.switchContainer}>
                <Text style={styles.label}>Êtes-vous un admin ?</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isAdmin ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={setIsAdmin}
                    value={isAdmin}
                />
            </View>
            <Button title="Submit" onPress={handleRegister} />
        </View>
    );
};



export default Accueil;