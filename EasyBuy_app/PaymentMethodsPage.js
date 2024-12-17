import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, SafeAreaView, Platform,KeyboardAvoidingView, Alert } from 'react-native';
import { db } from './FirebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import { useNavigation } from '@react-navigation/native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentMethodsPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const navigation = useNavigation();

  const handleSavePaymentMethod = async () => {
    if (!cardNumber || !expirationDate || !cvv || !cardholderName || !streetAddress || !city || !state || !zipCode) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        throw new Error('User is not authenticated');
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        paymentMethod: {
          cardNumber,
          expirationDate,
          cvv,
          cardholderName,
          billingAddress: {
            streetAddress,
            city,
            state,
            zipCode,
          },
        },
      });

      Alert.alert('Success', 'Payment method saved successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('AccountPage') }, 
      ]);
    } catch (error) {
      console.error('Error saving payment method:', error);
      Alert.alert('Error', 'There was an issue saving your payment method. Please try again.');
    }
  };

  return (

    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>Payment Methods</Text>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChangeText={setExpirationDate}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          value={cardholderName}
          onChangeText={setCardholderName}
        />
        <Text style={styles.sectionTitle}>Billing Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={setStreetAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
        />
        <Pressable style={styles.button} onPress={handleSavePaymentMethod}>
          <Text style={styles.buttonText}>Save Payment Method</Text>
        </Pressable>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fceade', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fceade',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#25ced1',
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default PaymentMethodsPage;
