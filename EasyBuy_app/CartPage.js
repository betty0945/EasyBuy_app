import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from './FirebaseConfig'; // Firebase config
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const CartItem = ({ item, onUpdate, fontSize }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { fontSize }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { fontSize }]}>{`$${item.price.toFixed(2)}`}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => onUpdate(item.id, -1)} style={styles.quantityButton}>
            <Text style={[styles.quantityButtonText, { fontSize }]}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantityText, { fontSize }]}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onUpdate(item.id, 1)} style={styles.quantityButton}>
            <Text style={[styles.quantityButtonText, { fontSize }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};



const CartScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const user = getAuth().currentUser;

  const fetchCartItems = async () => {
    if (user) {
      try {
        const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cartItems');
        const cartDocSnap = await getDoc(cartDocRef);

        if (cartDocSnap.exists()) {
          const cartData = cartDocSnap.data().items || [];
          setItems(cartData);
        } else {
          console.log("No cart data found.");
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (itemId, delta) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(updatedQuantity, 1) }; // Ensure quantity doesn't go below 1
      }
      return item;
    });

    setItems(updatedItems);

    // Update Firestore with the new quantity
    if (user) {
      try {
        const cartDocRef = doc(db, 'Users', user.uid, 'Cart', 'cartItems');
        await updateDoc(cartDocRef, {
          items: updatedItems
        });
      } catch (error) {
        console.error("Error updating cart: ", error);
      }
    }
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
          style={[styles.searchInput, { fontSize }]}
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
          <CartItem key={item.id} item={item} onUpdate={handleUpdateQuantity} fontSize={fontSize} />
        ))}
      </ScrollView>

      {loading ? (
        <Text style={styles.loadingText}>Loading cart...</Text>
      ) : (
        <ScrollView style={styles.itemsContainer}>
          {items.map(item => (
            <CartItem key={item.id} item={item} onUpdate={handleUpdateQuantity} />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={[styles.checkoutText, { fontSize }]}>Check out</Text>
      </TouchableOpacity>
      <Text style={[styles.totalText, { fontSize }]}>Total: ${total.toFixed(2)}</Text>
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
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 26, 
    fontSize: 16,
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
  quantityButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  quantityText: {
    fontSize: 18,
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
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
});

export default CartScreen;