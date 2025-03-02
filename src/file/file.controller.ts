import { Controller, Post, UseInterceptors, UploadedFile, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';


@Controller('file')
export class FileController {}
