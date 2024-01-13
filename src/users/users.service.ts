import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { AuthService } from 'src/auth/auth.service';
import { dbUsers } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly authService: AuthService){}

  async create(createUserDto: CreateUserDto) {
    const doesUserExist = dbUsers.find(user => user.email === createUserDto.email);
    if(doesUserExist?.id){
      throw new BadRequestException('User already exists')
    }
    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = {...createUserDto, id: Date.now(), password: hashedPassword}
    dbUsers.push(_.pick(newUser, ['email', 'id', 'password', 'name']));
    const {password, ...userWithoutPassword} = newUser
    const token = await this.authService.generateAuthToken(newUser.id, newUser.name, newUser.email)
    console.log({token})
    return {access_token: token, ...userWithoutPassword}
  }

  findAll() {
    return dbUsers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
