import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookRepository } from './repository/book.repository';
import { Book } from './entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getBooks(filter);
  }

  async getBookById(id: string): Promise<void> {
    return await this.bookRepository.getBooksId(id);
  }

  async createBooks(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.createBook(createBookDto);
  }

  async updateBooks(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    return await this.bookRepository.updateBook(id, updateBookDto);
  }

  async deleteBooks(id: string): Promise<void> {
    const result = await this.bookRepository.deleteBook(id);
  }
}
