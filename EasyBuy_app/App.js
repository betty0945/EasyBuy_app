import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Home';
import CartScreen from './CartPage';
import LoginPage from './Login';
import SignUpPage from './Sign_up';
import AccountPage from './AccountPage';
import ChangeAddressPage from './ChangeAddressPage';
import PaymentMethodsPage from './PaymentMethodsPage';
import SettingsPage from './SettingsPage';
import StoreListPage from './StoreListPage';
import OrderHistoryPage from './OrderHistoryPage';
import ItemsPage from './ItemsPage'; 


const Stack = createNativeStackNavigator();

const HomeApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="Account" component={AccountPage} />
        <Stack.Screen name="ChangeAddress" component={ChangeAddressPage} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="StoreList" component={StoreListPage} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryPage} /> 
        <Stack.Screen name="ItemsPage" component={ItemsPage} />
        <Stack.Screen name="AccountPage" component={AccountPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeApp;