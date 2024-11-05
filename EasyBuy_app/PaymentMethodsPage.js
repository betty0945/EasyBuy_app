import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';

const PaymentMethodsPage = () => {
  const handleSavePaymentMethod = () => {
    // Handle saving payment method logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {}}>
          <Text style={styles.headerText}>Account</Text>
        </Pressable>
        <Text style={styles.headerText}>Payment Methods</Text>
      </View>
      <TextInput style={styles.input} placeholder="Card Number" />
      <TextInput style={styles.input} placeholder="Expiration Date" />
      <TextInput style={styles.input} placeholder="CVV" />
      <TextInput style={styles.input} placeholder="Cardholder Name" />
      <Text style={styles.sectionTitle}>Billing Address</Text>
      <TextInput style={styles.input} placeholder="Street Address" />
      <TextInput style={styles.input} placeholder="City" />
      <TextInput style={styles.input} placeholder="State" />
      <TextInput style={styles.input} placeholder="Zip Code" />
      <Pressable style={styles.button} onPress={handleSavePaymentMethod}>
        <Text style={styles.buttonText}>Save Payment Method</Text>
      </Pressable>
    </ScrollView>
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

export default PaymentMethodsPage;