import React, { useState } from 'react';
import { Text,Image, View, StyleSheet, TextInput, TouchableOpacity,SafeAreaView, Alert } from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { useFontSize } from './FontSizeContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { fontSize } = useFontSize();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('StoreList'); 
    } catch (error) {
      console.error(error);
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is invalid.';
      }
      Alert.alert('Login Failed', errorMessage, [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
  
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>
   
        <Image 
          source={require('./easybuylogo2.png')} 
          style={styles.logo} 
          resizeMode="contain" 
        />

        <Text style={styles.title}>EasyBuy</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
  
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
   
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
     
        <Text style={styles.link} onPress={() => Alert.alert('Reset Password', 'Redirect to reset password functionality.')}>
          Forgot password
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Create account
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
  },
  backButtonText: {
    color: '#25CED1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCEADE',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: -50,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#25CED1',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
  },
  link: {
    color: '#25CED1',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
