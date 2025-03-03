import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const result = await this.imageService.processImage(file);
    console.log("Результат от микросервиса:", result);
    return { result };
    }

    // @Post('uploadb')
    // async uploadImageB(@Body() body: { image: string }) {
    // const result = await this.imageService.processBase64Image(body.image);
    // console.log("Результат от микросервиса:", result);
    // return { result };
    // }

    @Post('uploadf')
      @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
          }
        })
      }))
      uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            console.error('File is undefined');
            throw new Error('File is undefined');
          }
          console.log('Uploaded file:', file);
          return { message: 'File uploaded successfully', filename: file.filename };
      }

}
