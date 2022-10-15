import { Entity,Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Company {

    //company identification number

    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type: "varchar",
        nullable:true
    })
    public cin:string

    @Column()
    public name:string
}