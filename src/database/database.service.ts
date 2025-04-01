import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapping } from 'src/entities/mapping.entities';
import { CreateMappingDto } from './dto/create-mapping.dto';
import { User } from 'src/entities/user.entities';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(Mapping)
        private mappingRepository: Repository<Mapping>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
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
    async create(createMappingDto: CreateMappingDto): Promise<Mapping> {
        const mapping = this.mappingRepository.create(createMappingDto);
        return await this.mappingRepository.save(mapping);
    }
    async createUser(req) {
        const user = this.userRepository.create({email:req.email, password:req.password})
        return await this.userRepository.save(user);
    }
    async validateUser(req) {
        const user = await this.userRepository.findOne({
            where: {email:req.email},
            cache: true
        });

        if(req.password === user?.password) {
            return user;
        } else {
            return HttpStatus.UNAUTHORIZED;
        }
    }
}
