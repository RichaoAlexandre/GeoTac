import styles from '../utils/style';
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';

import connectToServer from '../utils/api';

const Accueil = (props) => {
    const [username, setUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [serverAction, setServerAction] = useState('launch'); // 'launch' or 'join'
    const [serverNumber, setServerNumber] = useState(''); // Server number for joining

    const handleRegister = () => {
        setRegistered(true);
        props.setUser(username);
        if (serverAction === 'launch') {
            connectToServer(username)
            Alert.alert("Succès", `Lancement du serveur par ${username}!`);
        } else {
            Alert.alert("Succès", `${username} a rejoint le serveur ${serverNumber}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title2}>Connexion</Text>
            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
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
            <View style={styles.segmentedControl}>
                <TouchableOpacity 
                    style={[styles.segment, serverAction === 'launch' && styles.activeSegment]} 
                    onPress={() => setServerAction('launch')}>
                    <Text style={serverAction === 'launch' ? styles.activeText : styles.inactiveText}>Launch Server</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.segment, serverAction === 'join' && styles.activeSegment]} 
                    onPress={() => setServerAction('join')}>
                    <Text style={serverAction === 'join' ? styles.activeText : styles.inactiveText}>Join Server</Text>
                </TouchableOpacity>
            </View>
            {serverAction === 'join' && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter server number to join"
                    onChangeText={setServerNumber}
                    value={serverNumber}
                />
            )}
            <Button title="Submit" onPress={handleRegister} />
        </View>
    );
};


export default Accueil;