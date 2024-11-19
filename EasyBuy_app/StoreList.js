import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Stores = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="home" size={25} color="black" />
          </TouchableOpacity>
          <TextInput 
            placeholder="search for items" 
            style={styles.searchInput} 
          />
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.itemsContainer}>
          <Store name="Wegmans" imageUri={"https://logodix.com/logo/900649.jpg"} description="Healthy Groceries"></Store>
          <Store name="Walmart" imageUri={"https://www.freepnglogos.com/uploads/walmart-logo-7.jpeg"} description="Grocery and Department Store"></Store>
          <Store name="Trader Joe's" imageUri={"https://logonoid.com/images/trader-joes-logo.png"} description="Cheap Groceries"></Store>
          <Store name="ALDI" imageUri={"https://logocharts.com/wp-content/uploads/2021/12/Aldi-Logo-1600x1964.png"} description="Cheaper Groceries"></Store>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  const Store = ({ name, imageUri, description }) => {
    return (
      <View style={styles.store}>
        <Image source={{ uri: imageUri }} style={styles.storeImage} />
        <Text style={styles.storeName}>{name}</Text>
        <Text style={styles.storeDescription}>{description}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>go to store</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff', 
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
    searchInput: {
      flex: 1,
      height: 38, 
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginHorizontal: 5, 
    },
    itemsContainer: {
      padding: 10,
    },
    store: {
      marginBottom: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#fff', 
    },
    storeImage: {
      width: '100%',
      height: 150,
      borderRadius: 5, 
    },
    storeName: {
      fontSize: 18,
    },
    storeDescription: {
        fontSize: 12,
    },
    addButton: {
      backgroundColor: '#25ced1', 
      padding: 10,
      marginTop: 10,
      borderRadius: 5, 
      width: '100%', 
      alignItems: 'center', 
    },
    addButtonText: {
      color: '#fff',
      textAlign: 'center',
    }
  });
  
  export default Items;
