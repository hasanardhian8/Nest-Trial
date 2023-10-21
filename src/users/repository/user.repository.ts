import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository()
export class UserRepository extends Repository<Users> {
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserDto;

    const users = new Users();
    users.name = name;
    users.email = email;
    users.salt = await bcrypt.genSalt();
    users.password = await bcrypt.hash(password, users.salt);

    try {
      await users.save();
      return users;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
