import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {

  constructor(private ninjaService: NinjasService){

  }

  @Get()
  getNinjas(@Query('weapon') weapon?: 'stars'| 'rod') {
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (error) {
      throw new NotFoundException()
    }
  }

  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto)
  }

  @Put(':id')
  updatedNinja(@Param('id', ParseIntPipe) id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(id, updateNinjaDto)
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.deleteNinja(id)
  }
}
