import React from 'react';
import { View, StyleSheet } from 'react-native';
import Items from './ItemsPage'; 
import CartScreen from './CartPage';
import LoginPage from './Login';
import SignUpPage from './Sign_up';

import StoreListPage from './StoreListPage';


const HomeApp = () => {
  return (
    <View style={styles.container}>
      {/* < LoginPage />   */}
       {/* <SignUpPage />   */}
        <StoreListPage/>  
         {/* <Items />   */}
       
      {/* <CartScreen/> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeApp;

