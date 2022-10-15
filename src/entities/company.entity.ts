import { Entity,Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Company {

    //company identification number

    @PrimaryColumn()
    public cin:string

    @Column()
    public name:string
}