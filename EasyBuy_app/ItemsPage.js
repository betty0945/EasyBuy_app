import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Ensure you have these icons properly installed

const Items = () => {
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
        <Product name="Carrots" price="$3.99" imageUri="https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg" rating="4.5" />
        <Product name="Onions" price="$5.56" imageUri="https://www.foodpoisoningnews.com/wp-content/uploads/2024/10/fresh-onions-vegetables-stockpack-deposit-photos-scaled.jpg" rating="3" />
        <Product name="Conditioner" price="$20" imageUri="https://www.westinstore.com/images/products/lrg/westin-hotel-conditioner-HB-304-WT_lrg.webp" rating="5" />
        <Product name="Bar Soap" price="$7" imageUri="https://shoparchipelago.com/cdn/shop/products/sku_1921223180_03_1400x.jpg?v=1677180648" rating="5" />
      </ScrollView>
    </SafeAreaView>
  );
};

const Product = ({ name, price, imageUri, rating }) => {
  return (
    <View style={styles.product}>
      <Image source={{ uri: imageUri }} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <Text style={styles.productRating}>{rating} stars</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>add to cart</Text>
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
  product: {
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff', 
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 5, 
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
  },
  productRating: {
    fontSize: 14,
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
