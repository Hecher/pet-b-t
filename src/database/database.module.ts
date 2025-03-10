import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Mapping} from '../entities/mapping.entities'
import { DatabaseService } from './database.service';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 7893,
            username: 'postgres',
            password: 'postgres',
            database: 'image_mapping',
            entities: [Mapping],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Mapping])
    ],
    exports: [TypeOrmModule],
    providers: [DatabaseService]
})
export class DatabaseModule {}
