import { useEffect, useState } from 'react';
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
import { loginUser, setPasswordApi } from '../../../services/auth/auth';
import { getUserProfile } from '../../../services/user/user';
import { mainColor } from '../../../utils/colors';

const SetPassword = ({ navigation }: any) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin = () => {
    const data = {
      password,
    };
    if (password !== password2) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setPasswordApi(data)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>New Password</Text>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder='Password'
          keyboardType='default'
          secureTextEntry
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={password2}
          onChangeText={setPassword2}
          placeholder='Password'
          keyboardType='default'
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dontHaveAccount}>
        <Text style={styles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToRegister}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetPassword;

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
