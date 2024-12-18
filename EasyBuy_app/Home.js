import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { useFontSize } from './FontSizeContext';

const HomePage = ({ navigation }) => {
  const { fontSize } = useFontSize();

  const handleLoginPress = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      navigation.navigate('StoreList'); 
    } else {
      navigation.navigate('Login'); 
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image 
          source={require('./easybuylogo2text.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />
        
        <Text style={[styles.title, { fontSize }]}>Welcome to Easy Buy!</Text>
        <Text style={[styles.description, { fontSize }]}>
          Your ultimate shopping companion! Explore nearby stores, add your favorite products to the cart, and enjoy quick and seamless checkout—all at your fingertips.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginPress}
          >
            <Text style={[styles.buttonText, { fontSize }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={[styles.buttonText, { fontSize }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fceade', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 400, 
    height: 400,
    marginBottom: -50,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#25ced1', 
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  registerButton: {
    backgroundColor: '#ff7f50', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomePage;