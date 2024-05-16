import { Injectable } from '@nestjs/common';
import { Book } from './book';

@Injectable()
export class BooksService {
  private bookMap: Map<string, Book> = new Map();
  private bookList: Book[] = [];

  findAll(): Book[]
  {
    return this.bookList;
  }

  findOne(id: string): Book | undefined
  {
    return this.bookMap.get(id);
  }

  addBook(book: Book): void {
    if (!this.bookMap.has(book.id))
    {
        this.bookMap.set(book.id, book);
        this.bookList.push(book);
    }
  }

  remove(id: string): void {
    let book = this.bookMap.get(id);
    if (book)
    {
        this.bookMap.delete(id);
        const index = this.bookList.indexOf(book);
        this.bookList.splice(index, 1);
    }
  }
}
