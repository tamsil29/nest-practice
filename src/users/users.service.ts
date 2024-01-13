import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService){}

  dbUsers = [
    {id: 1, email: 'user1@example.com', name: 'user1', password: '$2b$12$52mVUzI5W73qmLnIA5/B2OWE600w7VcIcGmVpe83HsEtUaeuuHM72'},
    {id: 2, email: 'user2@example.com', name: 'user2', password: '$2b$12$yavbJVeL6g8jPDuOyuFYdeqahyWqmjT/iJeEAd.potHLu1yz7yNrG'},
    {id: 3, email: 'user3@example.com', name: 'user3', password: '$2b$12$NNchqq2bghI1ykQakXrX7uq5yL955VBPWTY0KKbhfUi4zB7ktAH/.'},
    {id: 4, email: 'user4@example.com', name: 'user4', password: '$2b$12$xlQR2hNvGtL.s6b7r0VL.eWd4a5iwGgsXfskvnQRHAeNzguMQylV6'},
  ]

  async create(createUserDto: CreateUserDto) {
    const doesUserExist = this.dbUsers.find(user => user.email === createUserDto.email);
    if(doesUserExist?.id){
      throw new BadRequestException('User already exists')
    }
    const salt = await bcrypt.genSalt(12); 
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = {...createUserDto, id: Date.now(), password: hashedPassword}
    this.dbUsers.push(_.pick(newUser, ['email', 'id', 'password', 'name']));
    const {password, ...userWithoutPassword} = newUser
    const token = await this.generateAuthToken(newUser.id, newUser.name, newUser.email)
    console.log({token})
    return {access_token: token, ...userWithoutPassword}
  }

  findAll() {
    return this.dbUsers;
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
  
  async generateAuthToken(id: number, name: string, email: string){
    const payload = { id, name, email };
    return await this.jwtService.signAsync(payload, {privateKey: 'very important'})
  }
}
