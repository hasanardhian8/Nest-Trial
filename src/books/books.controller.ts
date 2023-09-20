import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
    this.booksService = booksService;
  }
  @Get()
  getAllBooks() {
    return this.booksService.getAllBook();
  }

  @Get()
  getBooks(@Query() filter: FilterBookDto) {
    return this.booksService.getBooks(filter);
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
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  createBook(@Body() payload: CreateBookDto) {
    return this.booksService.createBook(payload);
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body('id') payload: UpdateBookDto) {
    return this.booksService.updateBook(id, payload);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
