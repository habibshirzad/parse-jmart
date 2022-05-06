import { any } from '@hapi/joi';
import { group } from 'console';
import {PrimaryGeneratedColumn, Column, Entity, ManyToOne,PrimaryColumn, JoinColumn,ManyToMany} from 'typeorm'
import { Group } from './group.entity';
import { ProductEntity } from './product.entity';

@Entity()
export class Features{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    NameFeatures: string;

    @Column({ 
        // nullable:false
    })
    public groupId: number;
    @ManyToOne(() => Group,  group => group.features,{cascade:true})
    group: Group

    // @ManyToMany(() => ProductEntity, product => product.features)
    // public product: ProductEntity

    
}























// @Entity()
// export class Features{

//     @PrimaryGeneratedColumn()
//     public id: number;

//     @Column({
//         nullable: true,
//         // unique: true
        
//     })
//     NameFeatures: string;

//     @ManyToOne(() => Group)
//     @JoinColumn({name: 'group_id', referencedColumnName: 'Id'})
//     group: Group

//     @ManyToMany(() => ProductEntity, product => product.features)
//     product: ProductEntity
// }