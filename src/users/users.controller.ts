import { Body, Controller, Post } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Controller('user')
export class UsersController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Post('create')
    async create_user(@Body() req) {
        return await this.databaseService.createUser(req);
    }

    @Post('validate')
    async get_user(@Body() req){
        return await this.databaseService.validateUser(req);
    }
}
