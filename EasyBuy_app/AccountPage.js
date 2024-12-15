import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { db } from './FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';  
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useFontSize } from './FontSizeContext';

const AccountPage = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userPaymentMethod, setUserPaymentMethod] = useState(null);
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
HEAD
  const { fontSize } = useFontSize();

  const currentRoute = useNavigationState((state) => state.routes[state.index].name);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getAuth().currentUser?.uid;
        if (!userId) {
          throw new Error('User is not authenticated');
        }

        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.username || 'User Name');
          setUserImage(data.profileImage || null);
          setUserAddress(data.address || null);
          setUserPaymentMethod(data.paymentMethod || null);
          setUserOrderHistory(data.orderHistory || []);
        } else {
          throw new Error('User document not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'You need to allow access to your photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        console.log('Image selection was canceled');
        return;
      }

      const { uri } = result.assets[0];
      if (!uri) {
        Alert.alert('Error', 'No image selected. Please try again.');
        return;
      }

      uploadImage(uri);
    } catch (error) {
      console.error('Error during image picker:', error);
      Alert.alert('Error', 'Something went wrong with the image picker.');
    }
  };

  const uploadImage = async (uri) => {
    try {
      const userId = getAuth().currentUser?.uid;
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { profileImage: uri });
      setUserImage(uri);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while uploading the image.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while signing out.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
 
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
     
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person" size={25} color={currentRoute === 'AccountPage' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={25} color={currentRoute === 'Settings' ? '#25ced1' : 'black'} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <Pressable onPress={handleImagePick}>
            <View style={styles.profilePicture}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileImage} />
              ) : (
                <Text style={[styles.profilePictureText, { fontSize }]}>+ Add Image</Text>
              )}
            </View>
          </Pressable>
          <Text style={[styles.accountName, { fontSize }]}>{userName.toUpperCase()}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { fontSize }]}>Address:</Text>
          {userAddress ? (
            <>
              <Text style={[styles.infoText, { fontSize }]}>
                {`${userAddress.streetAddress || ''}, ${userAddress.city || ''}, ${userAddress.state || ''} ${userAddress.zipCode || ''}`}
              </Text>
              <Pressable style={styles.button} onPress={() => navigation.navigate('ChangeAddress')}>
                <Text style={[styles.buttonText, { fontSize }]}>Edit Address</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('ChangeAddress')}>
              <Text style={[styles.buttonText, { fontSize }]}>Add Address</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { fontSize }]}>Payment Method:</Text>
          {userPaymentMethod ? (
            <>
              <Text style={[styles.infoText, { fontSize }]}>Card Number: **** **** **** {userPaymentMethod.cardNumber.slice(-4)}</Text>
              <Text style={[styles.infoText, { fontSize }]}>Expires: {userPaymentMethod.expirationDate}</Text>
              <Text style={[styles.infoText, { fontSize }]}>Cardholder: {userPaymentMethod.cardholderName}</Text>
              <Pressable style={styles.button} onPress={() => navigation.navigate('PaymentMethods')}>
                <Text style={[styles.buttonText, { fontSize }]}>Edit Payment Method</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('PaymentMethods')}>
              <Text style={[styles.buttonText, { fontSize }]}>Add Payment Method</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoLabel, { fontSize }]}>Order History:</Text>
          {userOrderHistory.length > 0 ? (
            userOrderHistory.map((order, index) => (
              <Text key={index} style={[styles.infoText, { fontSize }]}>
                {order}
              </Text>
            ))
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('OrderHistory')}>
              <Text style={[styles.buttonText, { fontSize }]}>View Order History</Text>
            </Pressable>
          )}
        </View>

 
        <Pressable style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
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
  scrollContainer: {
    padding: 20,
    paddingTop: 80,
  },
  iconButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profilePictureText: {
    color: '#fff',
    fontSize: 18,
  },
  accountName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    marginVertical: 15,
    backgroundColor: '#fceade',
    borderRadius: 10,
    padding: 15,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#25ced1',
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default AccountPage;