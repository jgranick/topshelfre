// TypeScript (NestJS)
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from "./book";
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { UpdateBookDto } from './update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    if (!createBookDto.id) return;
    let id = String(createBookDto.id);
    if (this.booksService.findOne(id))
    {
      this.booksService.remove(id)
    }
    let book = new Book();
    book.author = createBookDto.author;
    book.id = id;
    book.price = createBookDto.price;
    book.published_date = createBookDto.published_date;
    book.title = createBookDto.title;
    this.booksService.addBook(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    let book = this.booksService.findOne(id);
    if (book)
    {
      if (updateBookDto.author) book.author = updateBookDto.author;
      if (updateBookDto.price) book.price = updateBookDto.price;
      if (updateBookDto.published_date) book.published_date = updateBookDto.published_date;
      if (updateBookDto.title) book.title = updateBookDto.title;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.booksService.remove(id);
  }
}
