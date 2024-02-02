import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearInputs } from './../../../utils/clearInput';
import { loginUser, registerUser } from '../../../services/auth/auth';
import { getUserProfile } from '../../../services/user/user';
import { mainColor } from '../../../utils/colors';

const Register = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const data = {
      phone,
      password,
      groups: 5,
    };
    registerUser(data)
      .then(async (res) => {
        await AsyncStorage.setItem('token', res.access);
        navigation.navigate('Verification');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Register</Text>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder='Phone Number'
          keyboardType='phone-pad'
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          keyboardType='default'
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dontHaveAccount}>
        <Text style={styles.text}>Have an account?</Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.linkText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    justifyContent: 'center',
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  subheading: {
    fontSize: 18,
    color: '#979C9E',
    textAlign: 'left',
  },
  // inputs
  registerContainer: {
    marginTop: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginVertical: 10,
    borderRadius: 14,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  haveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  dontHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    color: '#ffffffd2',
  },
  linkText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  forgotLink: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
