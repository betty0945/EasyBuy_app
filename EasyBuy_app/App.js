import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpPage from './Sign_up';
import LoginPage from './Login';
import StoreListPage from './StoreListPage';



export default function HomeApp() {
  return (
    <View style={styles.container}>
      
      <StoreListPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});