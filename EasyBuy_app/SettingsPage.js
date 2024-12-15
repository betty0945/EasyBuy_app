import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const SettingsPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color={currentRoute === 'Home' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('StoreList')}>
          <Ionicons name="storefront-outline" size={25} color={currentRoute === 'StoreList' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={25} color={currentRoute === 'Cart' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AccountPage')}>
          <Ionicons name="person" size={25} color={currentRoute === 'AccountPage' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="settings"
            size={25}
            color={ '#25ced1'}
          />
        </TouchableOpacity>
      </View>

      {/* Settings Content */}
      <View style={styles.container}>
        <View style={styles.header}>
         
        </View>
        <View style={styles.settingsBox}>
          <Text style={styles.settingsLabel}>Text Size</Text>
          <View style={styles.fontSizeControls}>
            <Button title="-" onPress={() => setFontSize(fontSize - 1)} />
            <Text style={styles.fontSizeText}>{fontSize}</Text>
            <Button title="+" onPress={() => setFontSize(fontSize + 1)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fceade',
  },
  iconButton: {
    padding: 8,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 20, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  settingsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginVertical: 10,
  },
  settingsLabel: {
    color: 'black',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeText: {
    marginHorizontal: 10,
    color: 'black',
  },
});

export default SettingsPage;
