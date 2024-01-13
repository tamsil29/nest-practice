import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { dbUsers } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService){}

  async create(createAuthDto: CreateAuthDto) {
    const user = dbUsers.find((user) => user.email === createAuthDto.email)
    if(!user){
      throw new BadRequestException('Email or Password is incorrect')
    }

    const validatePassword = await bcrypt.compare(createAuthDto.password, user.password)

    if(!validatePassword){
      throw new BadRequestException('Email or Password is incorrect')
    }

    const token = await this.generateAuthToken(user.id, user.name, user.email)

    return {access_token: token};
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async generateAuthToken(id: number, name: string, email: string){
    const payload = { id, name, email };
    return await this.jwtService.signAsync(payload, {privateKey: 'very important'})
  }

}
