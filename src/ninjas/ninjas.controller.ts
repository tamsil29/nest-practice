import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {

  constructor(private ninjaService: NinjasService){

  }

  @Get()
  getNinjas(@Query('weapon') weapon?: 'stars'| 'rod') {
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id') id: number) {
    try {
      return this.ninjaService.getNinja(id);
    } catch (error) {
      throw new NotFoundException()
    }
  }

  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto)
  }

  @Put(':id')
  updatedNinja(@Param('id') id: number, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(id, updateNinjaDto)
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: number) {
    return this.ninjaService.deleteNinja(id)
  }
}
