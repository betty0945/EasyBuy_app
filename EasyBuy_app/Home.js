import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
return (
    <View style={styles.container}>
        <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
        <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Go to Account" onPress={() => navigation.navigate('Account')} />
        <Button title="Go to Change Address" onPress={() => navigation.navigate('ChangeAddress')} />
        <Button title="Go to Payment Methods" onPress={() => navigation.navigate('PaymentMethods')} />
        <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
        <Button title="Go to Store List" onPress={() => navigation.navigate('StoreList')} />
        <Button title="Go to Order History" onPress={() => navigation.navigate('OrderHistory')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;