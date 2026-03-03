import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../src/context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login(email, password);
    router.push('/'); // va al home después de login
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}