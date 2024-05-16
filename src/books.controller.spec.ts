import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    booksController = app.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should start empty"', () => {
      expect(booksController.findAll().length).toBe(0);
    });

    // TODO: Write more tests and cover more edge cases (missing fields, duplicate IDs, etc)
    
    let title = 'Book 1';
    let author = 'Author 1';
    let published_date = '2022-01-01';
    let price = 9.99;

    it('should allow creation of a new book', () => {
      booksController.create({id: 1, title: title, author: author, published_date: published_date, price: price});
      let book = booksController.findAll()[0];
      expect(book.title).toBe(title);
      expect(book.author).toBe(author);
      expect(book.published_date).toBe(published_date);
      expect(book.price).toBe(price);
    });

    it('should allow retrieval of a book', () => {
      booksController.create({id: 1, title: title, author: author, published_date: published_date, price: price});
      
      let book = booksController.findOne("1");
      expect(book).not.toBeUndefined();
      if (book) {
        expect(book.id).toEqual("1");
      }
    });

    it('should allow book data to be updated', () => {
      booksController.create({id: 1, title: title, author: author, published_date: published_date, price: price});
      
      let updatedTitle = 'Updated Book 1';
      let updatedAuthor = 'Updated Author 1';
      let updatedPublishDate = '2022-01-02';
      let updatedPrice = 19.99;

      // Refactor if we add an update() API to BooksService
      let book = booksController.findOne("1");
      expect(book).not.toBeUndefined();
      if (book) {
        book.title = updatedTitle;
        book.author = updatedAuthor;
        book.published_date = updatedPublishDate;
        book.price = updatedPrice;
        expect(book.title).toBe(updatedTitle);
        expect(book.author).toBe(updatedAuthor);
        expect(book.published_date).toBe(updatedPublishDate);
        expect(book.price).toBe(updatedPrice);
      }
    });
    
    it('should allow books to be deleted', () => {
      booksController.create({id: 1, title: title, author: author, published_date: published_date, price: price});
      
      expect(booksController.findAll().length).toBe(1);
      booksController.remove("1");
      expect(booksController.findAll().length).toBe(0);
    });
  });

});