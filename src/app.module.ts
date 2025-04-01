import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { HttpModule } from '@nestjs/axios';
// import { FileController } from './file/file.controller';
// import { FileService } from './file/file.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [AppController, ImageController, UsersController],
  providers: [AppService, ImageService, DatabaseService],
})
export class AppModule {}
