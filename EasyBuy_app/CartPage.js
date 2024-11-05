import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ item, onUpdate }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => onUpdate(item.id, -1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onUpdate(item.id, 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const CartScreen = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Carrots', price: 3.99, quantity: 2, image: 'https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg' },
    { id: 2, name: 'Onions', price: 5.56, quantity: 1, image: 'https://www.foodpoisoningnews.com/wp-content/uploads/2024/10/fresh-onions-vegetables-stockpack-deposit-photos-scaled.jpg'},
    { id: 3, name: 'Conditioner', price: 20, quantity: 2, image: 'https://www.westinstore.com/images/products/lrg/westin-hotel-conditioner-HB-304-WT_lrg.webp' },
  ]);

  const handleUpdateQuantity = (id, delta) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: updatedQuantity > 0 ? updatedQuantity : 0 };
      }
      return item;
    });
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home" size={25} color="black" />
        </TouchableOpacity>
        <TextInput 
          placeholder="Search for items" 
          style={styles.searchInput}
          placeholderTextColor="#666"
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
        {items.map(item => (
          <CartItem key={item.id} item={item} onUpdate={handleUpdateQuantity} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Check out</Text>
      </TouchableOpacity>
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
    </SafeAreaView>
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
    backgroundColor: '#fceade',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemsContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemInfo: {
    marginLeft: 10,
    flex: 1,
  },
  itemText: {
    fontSize: 26,
  },
  itemName: {
    fontSize: 26, 
   
  },
  itemPrice: {
    fontSize: 18, 
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    marginHorizontal: 10,
    backgroundColor: '#25ced1',
    padding: 5,
    borderRadius: 5,
  },
  quantityAmount: {
    fontSize: 26,
  },
  quantityText: {
    fontSize: 26,
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#25ced1',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 25,
      padding: 10, 
      backgroundColor: '#fff', 
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
      padding: 5, 
    },
});

export default CartScreen;
