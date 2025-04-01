import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Mapping} from '../entities/mapping.entities'
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { User } from 'src/entities/user.entities';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 7893,
            username: 'postgres',
            password: 'postgres',
            database: 'image_mapping',
            entities: [Mapping, User],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Mapping, User])
    ],
    exports: [TypeOrmModule],
    providers: [DatabaseService],
    controllers: [DatabaseController]
})
export class DatabaseModule {}
