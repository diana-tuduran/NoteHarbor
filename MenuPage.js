import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MenuPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu</Text>
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title="Songs"
        onPress={() => navigation.navigate('Songs')}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MenuPage;
