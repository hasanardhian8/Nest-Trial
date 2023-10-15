import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from '../dto/create-book.dto';
import { FilterBookDto } from '../dto/filter-book.dto';
import { Book } from '../entity/book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;

    const query = Book.createQueryBuilder('book');

    if (title) {
      query.andWhere('lower(book.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (author) {
      query.andWhere('lower(book.author) LIKE :author', {
        author: `%${author.toLowerCase()}`,
      });
    }

    if (category) {
      query.andWhere('lower(book.category) LIKE :category', {
        category: `%${category.toLowerCase()}`,
      });
    }

    if (min_year) {
      query.andWhere('book.year >= :min_year', { min_year });
    }

    if (max_year) {
      query.andWhere('book.year <= :max_year', { max_year });
    }

    return await query.getMany();
  }

  async getBooksId(id: string): Promise<any> {
    const result = await Book.findOneBy({ id: id });
    if (!result) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
    return result;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, category, year } = createBookDto;

    const book = new Book();
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;

    try {
      await book.save();
      return book;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updateBook(id: string, createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, category, year } = createBookDto;

    const book = await Book.findOneById(id);
    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;

    try {
      await book.save();
      return book;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteBook(id: string) {
    const result = await Book.delete(id);
    if (result.affected == 0) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }
  }
}
