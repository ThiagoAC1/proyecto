import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>¡Bienvenido a la tienda!</Text>
      <Button title="Ir al carrito" onPress={() => router.push('/cart')} />
    </View>
  );
}