import { Controller, Post, Body, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CreateMappingDto } from './dto/create-mapping.dto';
import { Mapping } from '../entities/mapping.entities';

@Controller('mapping')
export class DatabaseController {
    constructor(private readonly mappingService: DatabaseService) {}

    @Post()
    async create(@Body() createMappingDto: CreateMappingDto): Promise<Mapping> {
        return this.mappingService.create(createMappingDto);
    }

    

    
}
