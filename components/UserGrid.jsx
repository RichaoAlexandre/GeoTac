import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const UserGrid = ({ data }) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold',marginBottom: 10}]}> Coéquipiers </Text>
      <View style={styles.headerRow}>
        <Text style={[styles.header, styles.cell]}>Name</Text>
        <Text style={[styles.header, styles.cell]}>Color</Text>
        <Text style={[styles.header, styles.cell]}>Role</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.text]}>{item.name}</Text>
            <Text style={[styles.cell, styles.text, { color: item.color }]}>{item.color}</Text>
            <Text style={[styles.cell, styles.text]}>{item.role}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2.5,
    margin: 10,
  },
  headerRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
  },
  cell: {
    width: '33.33%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
});

export default UserGrid;