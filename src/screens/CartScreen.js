import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { CartContext } from '../context/CartContext';
import { List, Button, Text, Card } from 'react-native-paper';
import API from '../services/api';

export default function CartScreen() {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

  const handleCheckout = async () => {
    try {
      await API.post('/orders', { items: cart });
      alert('Compra realizada con éxito');
      clearCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <List.Item
              title={`${item.name} x ${item.quantity}`}
              description={`$${item.price * item.quantity}`}
              right={() => (
                <Button mode="text" onPress={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              )}
            />
          </Card>
        )}
      />
      <Text variant="titleMedium" style={{ marginVertical: 10 }}>
        Total: ${total}
      </Text>
      <Button mode="contained" onPress={handleCheckout}>
        Comprar
      </Button>
    </View>
  );
}