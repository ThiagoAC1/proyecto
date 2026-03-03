import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register, loading } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={{ borderWidth:1, marginBottom:10, padding:8 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth:1, marginBottom:10, padding:8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, marginBottom:10, padding:8 }} />
      <Button title={loading ? 'Cargando...' : 'Registrar'} onPress={() => register(name, email, password)} />
      <Text style={{ marginTop:10 }} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta? Inicia sesión</Text>
    </View>
  );
}