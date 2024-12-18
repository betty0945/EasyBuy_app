import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { db, auth } from './FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFontSize } from './FontSizeContext';

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state.routes[state.index].name);
  const userId = auth.currentUser?.uid;
  const { fontSize } = useFontSize();

  const fetchCartItems = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const cart = userDoc.data().Cart || [];
        console.log('Fetched Cart Data:', cart);
        setItems(cart);

        const totalCost = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
        setTotal(totalCost);
      } else {
        setItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleUpdateQuantity = async (itemId, delta) => {
    if (!userId) return;

    try {
      const itemToUpdate = items.find(item => item.itemId === itemId);
      if (!itemToUpdate) return;

      const updatedItems = items.map(item => {
        if (item.itemId === itemId) {
          return {
            ...item,
            quantity: Math.max((item.quantity || 0) + delta, 1)
          };
        }
        return item;
      });

      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { Cart: updatedItems });

      setItems(updatedItems);

      const totalCost = updatedItems.reduce((sum, item) => 
        sum + (item.price || 0) * (item.quantity || 0), 0);
      setTotal(totalCost);
      
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const removeItem = async (itemId) => {
    const updatedItems = items.filter((item) => item.itemId !== itemId);
    setItems(updatedItems);
    updateCartInFirestore(updatedItems);
  };

  const updateCartInFirestore = async (updatedItems) => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { Cart: updatedItems });

      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
      setTotal(newTotal);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleCheckout = async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const { OrderHistory = [], paymentMethod, address } = userData;

        if (!paymentMethod || !address) {
          let missingInfo = [];
          if (!paymentMethod) missingInfo.push("Payment Method");
          if (!address) missingInfo.push("Address");

          alert(`Please add your ${missingInfo.join(' and ')} before checking out.`);
          return;
        }

        const orderId = `order_${new Date().getTime()}`;
        const currentTimestamp = new Date().toISOString();

        const newOrder = {
          id: orderId,
          items: items,
          total: total,
          timestamp: currentTimestamp,
        };

        await updateDoc(userRef, {
          OrderHistory: [...OrderHistory, newOrder],
          Cart: [],
        });

        setItems([]);
        setTotal(0);
        alert('Checkout successful! Your order has been saved.');
      } else {
        console.error('User document does not exist.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to process checkout.');
    }
  };

  const renderCartItems = () => {
    if (loading) {
      return <Text style={[styles.loadingText, { fontSize }]}>Loading cart...</Text>;
    }

    if (items.length === 0) {
      return <Text style={[styles.emptyText, { fontSize }]}>Your cart is empty.</Text>;
    }

    return (
      <ScrollView style={styles.cartContainer}>
        {items.map((item, index) => (
          <View key={item.itemId || index} style={styles.cartItem}>
            <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, { fontSize }]}>{item.name}</Text>
              <Text style={[styles.itemPrice, { fontSize }]}>{`Price: $${(item.price || 0).toFixed(2)}`}</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.itemId, -1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#25ced1" />
                </TouchableOpacity>
                <Text style={[styles.quantityText, { fontSize }]}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.itemId, 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="#25ced1" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.itemId)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fceade" />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={25} color={currentRoute === 'Home' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('StoreList')}>
          <Ionicons
            name="storefront-outline"
            size={25}
            color={currentRoute === 'StoreList' ? '#25ced1' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart" size={25} color={currentRoute === 'Cart' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AccountPage')}>
          <Ionicons name="person" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput placeholder="Search your cart" style={[styles.searchInput, { fontSize }]} />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {renderCartItems()}

      <View style={styles.checkoutContainer}>
        <Text style={[styles.totalText, { fontSize }]}>{`Total: $${(total || 0).toFixed(2)}`}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={[styles.checkoutButtonText, { fontSize }]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
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
    position: 'relative',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    height: 40,
    width: 40,
    backgroundColor: '#25ced1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
  cartContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemPrice: {
    marginTop: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  checkoutContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fceade',
  },
  totalText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#25ced1',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartPage;