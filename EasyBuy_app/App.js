import React from 'react';
import { View, StyleSheet } from 'react-native';
import Items from './ItemsPage'; 

const HomeApp = () => {
  return (
    <View style={styles.container}>
      <Items />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeApp;

