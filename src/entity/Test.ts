import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('test')
export class Test {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}
