import React, { useState } from 'react';
import { View, Text,TextInput, StyleSheet, Pressable, Alert, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { db } from './FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFontSize } from './FontSizeContext';

const ChangeAddressPage = () => {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [notes, setNotes] = useState('');
  const navigation = useNavigation();
  const { fontSize } = useFontSize();

  const handleAddressChange = async () => {
    if (!streetAddress || !city || !state || !zipCode) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        address: {
          streetAddress,
          city,
          state,
          zipCode,
          notes,
        },
      });

      Alert.alert('Address Changed', 'Your address has been successfully updated.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('AccountPage'),
        },
      ]);
    } catch (error) {
      console.error('Error saving address:', error);
      Alert.alert('Error', 'There was an issue saving your address. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Button inside SafeAreaView */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {/* Form Fields */}
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Street Address"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="State"
            value={state}
            onChangeText={setState}
          />
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
          />
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Additional Notes (Optional)"
            value={notes}
            onChangeText={setNotes}
          />
          <Pressable style={styles.button} onPress={handleAddressChange}>
            <Text style={[styles.buttonText, { fontSize }]}>Save Address</Text>
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
    padding: 10,
    backgroundColor: '#fceade',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
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

export default ChangeAddressPage;
