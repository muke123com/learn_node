import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('m_steam')
export class Steam {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    discount: string;

    @Column()
    image: string;

    @Column()
    href: string;

    @Column({name: 'game_id'})
    gameId: string;

    @Column()
    price: string;

    @Column({name: 'new_price'})
    newPrice: string;

    @Column()
    age: number;

}
