import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Ninja Hathodi', weapon: 'stars' },
    { id: 1, name: 'Ninja Amara', weapon: 'rod' },
  ];

  getNinjas(weapon?: 'stars' | 'rod') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) throw new Error(`ninja ${id} not found`);

    return ninja;
  }

  createNinja(ninja: CreateNinjaDto) {
    const newNinja = { ...ninja, id: Date.now() };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updatedNinja: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updatedNinja };
      }

      return ninja;
    });

    return this.getNinja(id);
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
