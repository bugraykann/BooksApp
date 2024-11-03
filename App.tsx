import React, { useState } from 'react';
import { View } from 'react-native';
import BookList from './BookList';

interface Book {
  title: string;
  author: string;
  price?: number;
  primary_isbn10: string;
}

const App = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCartItems((prevItems) => [...prevItems, book]);
  };

  return (
    <View style={{ flex: 1 }}>
      <BookList addToCart={addToCart} cartItems={cartItems} />
    </View>
  );
};

export default App;
