import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';

const ChangeAddressPage = () => {
  const handleAddressChange = () => {
    Alert.alert("Address Changed", "Your address has been successfully changed.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
          <Text style={styles.headerText}>Account</Text>
        </Pressable>
        <Text style={styles.headerText}>Change Address</Text>
      </View>
      <TextInput style={styles.input} placeholder="Street Address" />
      <TextInput style={styles.input} placeholder="City" />
      <TextInput style={styles.input} placeholder="State" />
      <TextInput style={styles.input} placeholder="Zip Code" />
      <TextInput style={styles.input} placeholder="Additional Notes" />
      <Pressable style={styles.button} onPress={handleAddressChange}>
        <Text style={styles.buttonText}>Save Address</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: 'lightgray',
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