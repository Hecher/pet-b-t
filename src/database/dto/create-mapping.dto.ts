import { IsInt, IsString } from 'class-validator';

export class CreateMappingDto {
    @IsInt()
    number: number;

    @IsString()
    word: string;
}
