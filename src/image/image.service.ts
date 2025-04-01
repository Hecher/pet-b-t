import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Multer } from 'multer';
import * as FormData from 'form-data';
import axios from 'axios';
import { Readable } from 'stream';
import { ExternalContextCreator } from '@nestjs/core';


@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async processImage(file: Express.Multer.File): Promise<string> {
    const formData = new FormData();
    formData.append('file', Readable.from(file.buffer), {
      filename: file.originalname,
      contentType: file.mimetype, 
    });
  
    // console.log("Отправляемые заголовки:", formData.getHeaders()); 
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/detect-anomaly', formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      if (response.status === 200) {
        const word = await this.databaseService.findWordByNumber(response.data.prediction);
        return word;
      }
      else {
        throw new InternalServerErrorException('блядь я опять насрал себе в шорты');
      }
    //   console.log("Ответ от микросервиса:", response.data); // 
      return response.data.prediction;
    } catch (error) {
      console.error("Ошибка при запросе:", error.response?.data || error.message);
      throw new Error('Ошибка при обработке изображения');
    }
  }
  

  

  // async processBase64Image(base64: string): Promise<string> {
  //   const buffer = Buffer.from(base64, 'base64');
  
  //   const formData = new FormData();
  //   formData.append('file', Readable.from(buffer), {
  //     filename: 'image.jpg',
  //     contentType: 'image/jpeg',
  //   });
  
  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/predict/', formData, {
  //       headers: {
  //         ...formData.getHeaders(),
  //       },
  //     });
  
  //     if (response.status === 200) {
  //       return response.data.prediction;
  //     } else {
  //       throw new InternalServerErrorException('Ошибка при обработке изображения');
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при обработке base64:", error.response?.data || error.message);
  //     throw new Error('Ошибка при обработке base64 изображения');
  //   }
  // }
  

    
  
}
