import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from './FirebaseConfig'; // Ensure you have Firebase and Firebase Auth initialized
import { collection, query, getDocs, doc, setDoc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Items = ({ route }) => {
  const { storeId } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = auth.currentUser?.uid; // Get the user ID from the authenticated user
  const navigation = useNavigation(); // Initialize the navigation hook

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

  useEffect(() => {
    if (storeId) {
      fetchItems();
    }
  }, [storeId]);

  const filteredItems = items.filter(item => 
    (item.Name && item.Name.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (item.Description && item.Description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddToCart = async (item) => {
    if (!userId) {
      console.log('User not logged in');
      return;
    }

    try {
      const userRef = doc(db, 'Users', userId); // Reference to user's document

      // Check if the user's document exists
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userRef, {
          Cart: [] // Initialize the cart as an empty array if the user document doesn't exist
        });
        console.log('User document created');
      }

      // Get the current cart data (if exists)
      const userDocData = userDoc.data();
      const currentCart = userDocData?.Cart || [];

      // Check if the item is already in the cart
      const itemExists = currentCart.some(cartItem => cartItem.itemId === item.id);

      if (!itemExists) {
        // Add the item to the cart only if it's not already in there
        await updateDoc(userRef, {
          Cart: arrayUnion({
            itemId: item.id,
            name: item.Name,
            price: item.Price,
            imageURL: item.imageURL,
            rating: item.Rating,
            quantity: 1, // Set initial quantity to 1
          })
        });
        console.log('Item added to cart successfully!');
      } else {
        console.log('Item already exists in the cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const Product = ({ name, price, imageUri, rating, item }) => {
    return (
      <View style={styles.product}>
        <Image source={{ uri: imageUri }} style={styles.productImage} />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>${price}</Text>
        <Text style={styles.productRating}>{rating} stars</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => handleAddToCart(item)} // Call the handleAddToCart function
        >
          <Text style={styles.addButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        {/* Cart icon */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        {/* Home icon */}
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('StoreList')}>
          <Ionicons name="home" size={25} color="black" />
        </TouchableOpacity>
        <TextInput 
          placeholder="Search for items" 
          style={styles.searchInput} 
          value={searchTerm}
          onChangeText={setSearchTerm} 
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person" size={25} color="black" onPress={() => navigation.navigate('AccountPage')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings" size={25} color="black" onPress={() => navigation.navigate('Settings')}/>
        </TouchableOpacity>
      </View>

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
              item={item} // Pass the full item to the Product component
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
