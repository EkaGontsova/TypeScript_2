import Cart from '../service/Cart';
import Movie from "../domain/Movie";
import Book from "../domain/Book";
import MusicAlbum from "../domain/MusicAlbum";

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
      cart = new Cart();
  });

  test('should add items to the cart', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      cart.add(book);
      expect(cart.items).toEqual([book]);
  });

  test('should calculate total price without discount', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      const album = new MusicAlbum(2, 'Showbiz', 'Muse', 800);
      cart.add(book);
      cart.add(album);
      expect(cart.getTotalPrice()).toBe(1800);
  });

  test('should calculate total price with discount', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      const album = new MusicAlbum(2, 'Showbiz', 'Muse', 800);
      cart.add(book);
      cart.add(album);
      expect(cart.getTotalPriceWithDiscount(10)).toBe(1620); 
  });

  test('should remove item by id', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      const album = new MusicAlbum(2, 'Showbiz', 'Muse', 800);
      cart.add(book);
      cart.add(album);
      cart.removeItemById(1);
      expect(cart.items).toEqual([album]);
  });

  test('should not remove item if id does not exist', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      cart.add(book);
      cart.removeItemById(2); 
      expect(cart.items).toEqual([book]);
  });

  test('should return an empty array when no items are in the cart', () => {
      expect(cart.items).toEqual([]);
  });
  
  test('should handle multiple items correctly', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      const album = new MusicAlbum(2, 'Showbiz', 'Muse', 800);
      const movie = new Movie(3, 'Lee', 'Kuras', 500, 2023, 'London', 'BlaBla', ['Biografie', 'Drama'], '117');
      cart.add(book);
      cart.add(album);
      cart.add(movie);
      expect(cart.getTotalPrice()).toBe(2300);
      cart.removeItemById(2);
      expect(cart.getTotalPrice()).toBe(1500); 
  });

  test('should create a Book instance correctly', () => {
      const book = new Book(1, 'It', 'King', 1000, 500);
      expect(book.id).toBe(1);
      expect(book.name).toBe('It');
      expect(book.author).toBe('King');
      expect(book.price).toBe(1000);
      expect(book.pages).toBe(500);
  });

  test('should create a MusicAlbum instance correctly', () => {
      const album = new MusicAlbum(2, 'Showbiz', 'Muse', 800);
      expect(album.id).toBe(2);
      expect(album.name).toBe('Showbiz');
      expect(album.author).toBe('Muse');
      expect(album.price).toBe(800);
  });

  test('should create a Movie instance correctly', () => {
      const movie = new Movie(3, 'Lee', 'Kuras', 500, 2023, 'London', 'BlaBla', ['Biografie', 'Drama'], '117');
      expect(movie.id).toBe(3);
      expect(movie.name).toBe('Lee');
      expect(movie.author).toBe('Kuras');
      expect(movie.price).toBe(500);
      expect(movie.year).toBe(2023);
      expect(movie.city).toBe('London');
      expect(movie.tagline).toBe('BlaBla');
      expect(movie.genre).toEqual(['Biografie', 'Drama']);
      expect(movie.time).toBe('117 мин. /1:57');
  });
});