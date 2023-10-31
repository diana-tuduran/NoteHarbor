import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Alert } from 'react-native';

const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@domain\.com$/i;

    if (name.length >= 3 && !/\s/.test(name) && email.match(emailPattern) && password.length >= 6) {
      // Successful registration, navigate to the "Login" page.
      Alert.alert('Registration Successful', 'You can now log in.');
      navigation.navigate('Login');
    } else {
      // Display an error message for incomplete or invalid registration data.
      Alert.alert('Registration Failed', 'Please fill in all registration fields correctly.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require('./path_to_your_image.png')} style={styles.logo} />
      <Text style={styles.heading}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name (at least 3 characters, no spaces)"
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email (e.g., user@domain.com)"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password (at least 6 characters)"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Register" onPress={handleRegister} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default RegisterPage;
