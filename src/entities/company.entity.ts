import { Entity,Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Company {

    //company identification number
    @PrimaryColumn()
    public cin:number

    @Column()
    public name:string
}