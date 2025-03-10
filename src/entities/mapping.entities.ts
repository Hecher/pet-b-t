import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mapping {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    number: number
   
    @Column()
    word: string
}