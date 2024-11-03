import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, Image, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

interface Book {
  title: string;
  author: string;
  price?: number;
  primary_isbn10: string;
  book_image?: string;
}

interface BookListProps {
  addToCart: (book: Book) => void;
  cartItems?: Book[];
}

const BookList: React.FC<BookListProps> = ({ addToCart, cartItems = [] }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=Z5fQCdhfuBegCuI06tsLEyNavlMLJTjz')
      .then(response => {
        setBooks(response.data.results);
      })
      .catch(error => {
        console.log('API Error:', error);
      });
  }, []);

  // Safeguard against empty cartItems
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price || 0);
  }, 0).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.bookContainer}>
        {books.map((item) => (
          <View key={item.primary_isbn10} style={styles.card}>
            {item.book_image && (
              <Image source={{ uri: item.book_image }} style={styles.image} />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.price}>Fiyat: {item.price !== undefined ? item.price : 'Yok'}</Text>
            <Button title="+" onPress={() => addToCart(item)} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.cartContainer}>
        <Text style={styles.cartText}>Toplam Fiyat: {totalPrice} TL</Text>
        <View style={styles.cartCountContainer}>
          <Text style={styles.cartCount}>{cartItems.length}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};




export default BookList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  bookContainer: {
    padding: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    padding: 15,
    marginVertical: 10,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  cartContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartCountContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: 'white',
    fontWeight: 'bold',
  },
});
