import {PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable,OneToMany,PrimaryColumn} from 'typeorm'
import { Features } from './features.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class Group{


    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public NameGroup:string;


    @OneToMany(() => Features,  feature => feature.group)
    features: Features[];



}


















// @Entity()
// export class Group{

//     @Column("int", {generated: 'increment', unique: true})
//     public Id: number;

//     @PrimaryColumn({
//         // nullable: true,
//         // unique: true
    
//     })
//     public NameGroup:string


//     @OneToMany(() => Features,  feature => feature.group)
//     features: Features[];

// }

