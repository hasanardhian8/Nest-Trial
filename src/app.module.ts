import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BooksModule, UsersModule],
})
export class AppModule {}
