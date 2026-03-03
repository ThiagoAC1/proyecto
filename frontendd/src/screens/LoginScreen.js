import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />
      <Button mode="contained" onPress={() => login(email, password)} loading={loading}>
        Login
      </Button>
      <Text style={{ marginTop:10, textAlign:'center' }} onPress={() => navigation.navigate('Register')}>
        ¿No tienes cuenta? Registrate
      </Text>
    </View>
  );
}