import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpPage from './Sign_up';
import LoginPage from './Login';



export default function HomeApp() {
  return (
    <View style={styles.container}>
      
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});