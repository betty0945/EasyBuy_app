import React, { useState } from 'react';
<<<<<<< HEAD
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
=======
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, Image, SafeAreaView } from 'react-native';
>>>>>>> 5c1d9e2 (Added the add to cart, order history and checkout functionality and adjusted the pages)
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
<<<<<<< HEAD
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('StoreList');
=======
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('StoreList'); 
>>>>>>> 5c1d9e2 (Added the add to cart, order history and checkout functionality and adjusted the pages)
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
<<<<<<< HEAD
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize }]}>EasyBuy</Text>
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, { fontSize }]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={[styles.buttonText, { fontSize }]}>Login</Text>
      </TouchableOpacity>
      <Text style={{ fontSize }}>Forgot password</Text>
      <Text style={{ fontSize }}>Create account</Text>
    </View>
=======
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
>>>>>>> 5c1d9e2 (Added the add to cart, order history and checkout functionality and adjusted the pages)
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
<<<<<<< HEAD
});
=======
  link: {
    color: '#25CED1',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
>>>>>>> 5c1d9e2 (Added the add to cart, order history and checkout functionality and adjusted the pages)
