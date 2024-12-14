import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from './FirebaseConfig';
import { collection, query, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Items = ({ route }) => {
  const { storeId } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation();
  const currentRoute = useNavigationState((state) => state.routes[state.index].name);

  const fetchItems = async () => {
    try {
      const itemsCollection = collection(db, 'Stores', storeId, 'Items');
      const itemsQuery = query(itemsCollection);
      const querySnapshot = await getDocs(itemsQuery);

      if (querySnapshot.empty) {
        console.log('No items found in this store');
      } else {
        const itemList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemList);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartCount = async () => {
    if (!userId) return;

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const cart = userDoc.data()?.Cart || [];
        setCartItems(cart);
      } else {
        console.log('User document does not exist');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchItems();
    }
    fetchCartCount();
  }, [storeId, userId]);

  const filteredItems = items.filter(item =>
    (item.Name && item.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.Description && item.Description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddToCart = async (item) => {
    if (!userId) {
      Alert.alert('Error', 'Please log in to add items to your cart.');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, { Cart: [] });
        console.log('User document created');
      }

      const userDocData = userDoc.data();
      const currentCart = userDocData?.Cart || [];
      const itemExists = currentCart.some(cartItem => cartItem.itemId === item.id);

      if (!itemExists) {
        await updateDoc(userRef, {
          Cart: arrayUnion({
            itemId: item.id,
            name: item.Name,
            price: item.Price,
            imageURL: item.imageURL,
            rating: item.Rating,
            quantity: 1,
          }),
        });

        setCartItems((prevCartItems) => [...prevCartItems, {
          itemId: item.id,
          name: item.Name,
          price: item.Price,
          imageURL: item.imageURL,
          rating: item.Rating,
          quantity: 1,
        }]);

        Alert.alert('Added to Cart', `${item.Name} has been added to your cart.`);
      } else {
        Alert.alert('Already in Cart', `${item.Name} is already in your cart.`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      Alert.alert('Error', 'Failed to add item to cart. Please try again.');
    }
  };

  const Product = ({ name, price, imageUri, rating, item }) => (
    <View style={styles.product}>
      <Image source={{ uri: imageUri }} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>${price}</Text>
      <Text style={styles.productRating}>{rating} stars</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

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
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AccountPage')}>
          <Ionicons name="person" size={25} color={currentRoute === 'AccountPage' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={25} color={currentRoute === 'Settings' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for items"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Item List */}
      {loading ? (
        <Text style={styles.loadingText}>Loading items...</Text>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <Product
              key={item.id}
              name={item.Name}
              price={item.Price}
              imageUri={item.imageURL}
              rating={item.Rating}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={<Text>No items available in this store.</Text>}
        />
      )}
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fceade',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
    fontSize: 18,
    color: 'gray',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  product: {
    flex: 0.48,
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
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4,
  },
  productRating: {
    fontSize: 12,
    marginTop: 4,
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
  },
});

export default Items;
