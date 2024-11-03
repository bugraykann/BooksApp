import React from 'react';
import { View, Text } from 'react-native';

interface Book {
  title: string;
  author: string;
  price?: number;
  primary_isbn10: string;
}

interface CartProps {
  cartItems: Book[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  const totalCount = cartItems.length;

  return (
    <View style={{ padding: 10, borderTopWidth: 1 }}>
      <Text>Toplam Kitap: {totalCount}</Text>
      <Text>Toplam Fiyat: {totalPrice} TL</Text>
    </View>
  );
};

export default Cart;
