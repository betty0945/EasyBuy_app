import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { db } from './FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const AccountPage = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [userPaymentMethod, setUserPaymentMethod] = useState(null);
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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
        mediaTypes: ImagePicker.MediaType.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      const { uri } = result.assets[0];
      if (uri) {
        uploadImage(uri);
      } else {
        Alert.alert('Error', 'No image selected. Please try again.');
      }
    } catch (error) {
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
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('StoreList')}>
          <Ionicons name="home" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cart" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileSection}>
          <Pressable onPress={handleImagePick}>
            <View style={styles.profilePicture}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileImage} />
              ) : (
                <Text style={styles.profilePictureText}>+ Add Image</Text>
              )}
            </View>
          </Pressable>
          <Text style={styles.accountName}>{userName.toUpperCase()}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Address:</Text>
          {userAddress ? (
            <>
              <Text style={styles.infoText}>
                {`${userAddress.streetAddress || ''}, ${userAddress.city || ''}, ${userAddress.state || ''} ${userAddress.zipCode || ''}`}
              </Text>
              <Pressable style={styles.button} onPress={() => navigation.navigate('ChangeAddress')}>
                <Text style={styles.buttonText}>Edit Address</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('ChangeAddress')}>
              <Text style={styles.buttonText}>Add Address</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Payment Method:</Text>
          {userPaymentMethod ? (
            <>
              <Text style={styles.infoText}>Card Number: **** **** **** {userPaymentMethod.cardNumber.slice(-4)}</Text>
              <Text style={styles.infoText}>Expires: {userPaymentMethod.expirationDate}</Text>
              <Text style={styles.infoText}>Cardholder: {userPaymentMethod.cardholderName}</Text>
              <Pressable style={styles.button} onPress={() => navigation.navigate('PaymentMethods')}>
                <Text style={styles.buttonText}>Edit Payment Method</Text>
              </Pressable>
            </>
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('PaymentMethods')}>
              <Text style={styles.buttonText}>Add Payment Method</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Order History:</Text>
          {userOrderHistory.length > 0 ? (
            userOrderHistory.map((order, index) => (
              <Text key={index} style={styles.infoText}>
                {order}
              </Text>
            ))
          ) : (
            <Pressable style={styles.button} onPress={() => navigation.navigate('OrderHistory')}>
              <Text style={styles.buttonText}>View Order History</Text>
            </Pressable>
          )}
        </View>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fceade',
    height: 60,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
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
});

export default AccountPage;
