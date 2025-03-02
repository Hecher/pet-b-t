import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { HttpModule } from '@nestjs/axios';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ImageController, FileController],
  providers: [AppService, ImageService, FileService],
})
export class AppModule {}
