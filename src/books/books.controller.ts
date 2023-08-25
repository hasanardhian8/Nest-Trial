import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
    this.booksService = booksService;
  }
  @Get()
  getAllBooks() {
    return this.booksService.getAllBook();
  }

  // @Get()
  // getBooks(
  //   @Query('title') title: string,
  //   @Query('author') author: string,
  //   @Query('category') category: string,
  // ) {
  //   return this.booksService.getBooks(title, author, category);
  // }

  @Get('/:id')
  getBooks(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Post()
  createBook(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('category') category: string,
  ) {
    return this.booksService.createBook(title, author, category);
  }

  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body('id') title: string,
    @Body('id') author: string,
    @Body('id') category: string,
  ) {
    return this.booksService.updateBook(id, title, author, category);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
