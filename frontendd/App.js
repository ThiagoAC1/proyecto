import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola Web!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 30 },
});