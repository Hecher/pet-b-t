import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Multer.file) {
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

}
