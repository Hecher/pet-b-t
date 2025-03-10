import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapping } from 'src/entities/mapping.entities';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Mapping)
        private mappingRepository: Repository<Mapping>,
    ) {}
    async findWordByNumber(number: number): Promise<any> {
        const mapping = await this.mappingRepository.findOne({
            where: {number},
            cache: true
        });
        if (!mapping) {
            throw new NotFoundException(`Mapping for number ${number} not found`);
        }
        return mapping.word;
        
    }
}
