import React from 'react';
import { View, Text, Button, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useFontSize } from './FontSizeContext';

const SettingsPage = () => {
  const { fontSize, setFontSize } = useFontSize();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => {}}>
            <Text style={[styles.headerText, { fontSize }]}>Account</Text>
          </Pressable>
          <Text style={[styles.headerText, { fontSize }]}>Settings</Text>
        </View>
        <View style={styles.settingsBox}>
          <Text style={[styles.settingsLabel, { fontSize }]}>Text Size</Text>
          <View style={styles.fontSizeControls}>
            <Button title="-" onPress={() => setFontSize(fontSize - 1)} />
            <Text style={[styles.fontSizeText, { fontSize }]}>{fontSize}</Text>
            <Button title="+" onPress={() => setFontSize(fontSize + 1)} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FCEADE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  settingsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    marginVertical: 10,
  },
  settingsLabel: {
    color: 'black',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeText: {
    marginHorizontal: 10,
    color: 'black',
  },
});

export default SettingsPage;