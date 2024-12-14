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
import { FontSizeProvider } from './FontSizeContext';
import OrderHistoryPage from './OrderHistoryPage';
import ItemsPage from './ItemsPage'; 


const Stack = createNativeStackNavigator();

const HomeApp = () => {
  return (
    <FontSizeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Account"
          component={AccountPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ChangeAddress"
          component={ChangeAddressPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethodsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="StoreList"
          component={StoreListPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistoryPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ItemsPage"
          component={ItemsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountPage"
          component={AccountPage}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </FontSizeProvider>
  );
};


export default HomeApp;