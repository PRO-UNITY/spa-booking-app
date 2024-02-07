import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { mainColor } from '../../../utils/colors';
import { forgetPassword } from '../../../services/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }: any) => {
  const [phone, setPhone] = useState('');

  const handleForgotPassword = async () => {
    if (!phone) {
      console.log('Phone number is required');
      return;
    }
    forgetPassword({ phone: phone })
      .then(async (res) => {
        console.log(res);
        await AsyncStorage.setItem('token', res.access).then(() => {
          navigation.navigate('Verification');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email address below to receive a password reset link.
        </Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder='Phone number'
          keyboardType='number-pad'
          autoCapitalize='none'
        />
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainColor,
    padding: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: '#fff',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetButton: {
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 14,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgotPassword;
