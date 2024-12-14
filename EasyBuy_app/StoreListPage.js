import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, TextInput, StatusBar, Platform } from 'react-native';
import { db, auth } from './FirebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const userId = auth.currentUser?.uid;
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);

  const fetchStores = async () => {
    try {
      const storesCollection = collection(db, 'Stores');
      const storeSnapshot = await getDocs(storesCollection);
      const storeList = storeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStores(storeList);
      setFilteredStores(storeList);
    } catch (error) {
      console.error('Error fetching stores:', error);
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
        setCartCount(cart.length);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  useEffect(() => {
    fetchStores();
    fetchCartCount();
  }, [userId]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredStores(stores);
    } else {
      const filtered = stores.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStores(filtered);
    }
  }, [searchQuery, stores]);

  const handleStoreSelect = (storeId) => {
    navigation.navigate('ItemsPage', { storeId });
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const renderStoreItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleStoreSelect(item.id)}
      style={styles.store}
    >
      <Image source={{ uri: item.imageURL }} style={styles.storeImage} />
      <Text style={styles.storeName}>{item.name}</Text>
      <Text style={styles.storeDescription}>{item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fceade" />
      <View style={styles.navBar}>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name="home"
            size={25}
            color={currentRoute === 'Home' ? '#25ced1' : 'black'}
          />
        </TouchableOpacity>

    
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="storefront-outline"
            size={25}
            color={ '#25ced1' }
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
          <Ionicons name="cart" size={25} color="black" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('AccountPage')}
        >
          <Ionicons name="person" size={25} color="black" />
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for stores"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading stores...</Text>
      ) : (
        <FlatList
          data={filteredStores}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={<Text>No stores available</Text>}
        />
      )}
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
  store: {
    flex: 0.48,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  storeImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  storeDescription: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
});

export default StorePage;
