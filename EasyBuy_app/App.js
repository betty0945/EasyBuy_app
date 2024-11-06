import React from 'react';
import { View, StyleSheet } from 'react-native';
import Items from './ItemsPage'; 
import CartScreen from './CartPage';
import LoginPage from './Login';
import SignUpPage from './Sign_up';
import AccountPage  from './AccountPage';
import ChangeAddressPage from './ChangeAddressPage';
import PaymentMethodsPage  from './PaymentMethodsPage';
import SettingsPage from './SettingsPage';

import StoreListPage from './StoreListPage';


const HomeApp = () => {
  return (
    <View style={styles.container}>
      < LoginPage />  
       {/* <SignUpPage />   */}
      {/* <AccountPage/>   */}
        {/* <PaymentMethodsPage />    */}
               {/* <ChangeAddressPage />   */}
                   {/* <StoreListPage/>   */}
                       {/* <SettingsPage/>   */}

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

