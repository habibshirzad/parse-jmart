import {PrimaryGeneratedColumn,PrimaryColumn, Column, Entity, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import { Features } from './features.entity';
import { Group } from './group.entity';

@Entity()
export class ProductEntity{

    @PrimaryGeneratedColumn()
    public id: number;
    
    @Column({unique:true})
    public Name: string;

    // @ManyToMany(() => Features, feature => feature.product, {cascade:true})
    // @JoinTable({name: "product_Features"})
    // public features: Features[];
   
}


