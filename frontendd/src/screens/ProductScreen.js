import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';
import API from '../services/api';
import { CartContext } from '../context/CartContext';
import { Card, Button, Text } from 'react-native-paper';

export default function ProductScreen() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <Card style={{ marginBottom: 10 }}>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Content>
            <Text variant="titleMedium">{item.name}</Text>
            <Text variant="bodyMedium">${item.price}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => addToCart(item)}>
              Agregar al carrito
            </Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}