
import {PrimaryGeneratedColumn,PrimaryColumn, Column, Entity, OneToMany, ManyToMany, JoinTable} from 'typeorm'

@Entity()
export class ProductFeatures{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable:true})
    public productId: number;

    @Column()
    public featuresId: number;

}