import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyUser } from '../../../services/auth/auth';
import { mainColor } from '../../../utils/colors';

interface VerificationProps {}

const Verification: React.FC<VerificationProps> = ({ navigation }: any) => {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const inputRefs = useRef<TextInput[]>([]);

  const handleVerification = () => {
    const allCode = verificationCode.join('');
    const data = {
      code: allCode,
    };
    verifyUser(data)
      .then(async (res) => {
        console.log(res);
        await AsyncStorage.setItem('token', res.access)
          .then(() => {
            navigation.navigate('SetPassword');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeText = (text: string, index: number) => {
    let newCode = [...verificationCode];
    newCode[index] = text;
    if (index < 5 && text !== '') {
      inputRefs.current[index + 1].focus();
    }
    setVerificationCode(newCode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          Enter the verification code you received via SMS:
        </Text>
        <View style={styles.codeInputContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              keyboardType='numeric'
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleVerification}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  content: {
    flex: 0.4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#054A80',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: 'gray',
  },
  codeInputContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  codeInput: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 16,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: mainColor,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Verification;
